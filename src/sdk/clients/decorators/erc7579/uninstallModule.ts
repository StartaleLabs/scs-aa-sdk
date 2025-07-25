import {
  type Chain,
  type Client,
  type Hex,
  type Transport,
  encodeAbiParameters,
  encodeFunctionData,
  getAddress
} from "viem"
import { type SmartAccount, sendUserOperation } from "viem/account-abstraction"
import { getAction } from "viem/utils"
import { parseAccount } from "viem/utils"
import { getInstalledValidators, getPreviousModule } from "."
import { AccountNotFoundError } from "../../../account/utils/AccountNotFound"
import type { Call } from "../../../account/utils/Types"
import type {
  ModularSmartAccount,
  ModuleMeta
} from "../../../modules/utils/Types"
import { parseModuleTypeId } from "./supportsModule"

export type UninstallModuleParameters<
  TSmartAccount extends SmartAccount | undefined
> = { account?: TSmartAccount } & {
  module: ModuleMeta
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  nonce?: bigint
}

/**
 * Uninstalls a module from a smart account.
 *
 * @param client - The client instance.
 * @param parameters - Parameters including the smart account, module to uninstall, and optional gas settings.
 * @returns The hash of the user operation as a hexadecimal string.
 * @throws {AccountNotFoundError} If the account is not found.
 *
 * @example
 * import { uninstallModule } from '@startale-scs/aa-sdk'
 *
 * const userOpHash = await uninstallModule(startaleClient, {
 *   module: {
 *     type: 'executor',
 *     address: '0x...',
 *     context: '0x'
 *   }
 * })
 * console.log(userOpHash) // '0x...'
 */
export async function uninstallModule<
  TSmartAccount extends SmartAccount | undefined
>(
  client: Client<Transport, Chain | undefined, TSmartAccount>,
  parameters: UninstallModuleParameters<TSmartAccount>
): Promise<Hex> {
  const {
    account: account_ = client.account,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    module: { address, initData, type }
  } = parameters

  if (!account_) {
    throw new AccountNotFoundError({
      docsPath: "/startale-client/methods#sendtransaction"
    })
  }

  const account = parseAccount(account_) as ModularSmartAccount
  const [installedValidators] = await getInstalledValidators(client)

  const prevModule = await getPreviousModule(client, {
    module: {
      address,
      type
    },
    installedValidators,
    account
  })

  const deInitData = encodeAbiParameters(
    [
      { name: "prev", type: "address" },
      { name: "disableModuleData", type: "bytes" }
    ],
    [prevModule, initData ?? "0x"]
  )

  const calls = await toUninstallModuleCalls(account, {
    address,
    deInitData,
    type
  })

  return getAction(
    client,
    sendUserOperation,
    "sendUserOperation"
  )({
    calls,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    account
  })
}

export const toUninstallModuleCalls = async (
  account: ModularSmartAccount,
  { address, deInitData = "0x", type }: ModuleMeta
): Promise<Call[]> => [
  {
    to: account.address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: [
        {
          name: "uninstallModule",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "moduleTypeId"
            },
            {
              type: "address",
              name: "module"
            },
            {
              type: "bytes",
              name: "deInitData"
            }
          ],
          outputs: []
        }
      ],
      functionName: "uninstallModule",
      args: [parseModuleTypeId(type), getAddress(address), deInitData]
    })
  }
]
