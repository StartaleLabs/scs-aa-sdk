import {
  type Chain,
  type Client,
  type Hex,
  type PublicClient,
  type Transport,
  encodeFunctionData,
  getAddress
} from "viem"
import {
  type SmartAccount,
  type UserOperation,
  sendUserOperation
} from "viem/account-abstraction"
import { getAction, parseAccount } from "viem/utils"
import { AccountNotFoundError } from "../../../account/utils/AccountNotFound"
import type { Call } from "../../../account/utils/Types"
import { addressEquals } from "../../../account/utils/Utils"
import {
  RHINESTONE_ATTESTER_ADDRESS,
  SMART_SESSIONS_ADDRESS,
  findTrustedAttesters,
  getTrustAttestersAction
} from "../../../constants"
import type {
  ModularSmartAccount,
  ModuleMeta
} from "../../../modules/utils/Types"
import { parseModuleTypeId } from "./supportsModule"

export type InstallModuleParameters<
  TSmartAccount extends SmartAccount | undefined
> = { account?: TSmartAccount } & {
  module: ModuleMeta
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  nonce?: bigint
} & Partial<Omit<UserOperation<"0.7", bigint>, "callData">>

/**
 * Installs a module on a given smart account.
 *
 * @param client - The client instance.
 * @param parameters - Parameters including the smart account, module to install, and optional gas settings.
 * @returns The hash of the user operation as a hexadecimal string.
 * @throws {AccountNotFoundError} If the account is not found.
 *
 * @example
 * import { installModule } from '@startale-scs/aa-sdk'
 *
 * const userOpHash = await installModule(startaleClient, {
 *   module: {
 *     type: 'executor',
 *     address: '0x...',
 *     context: '0x'
 *   }
 * })
 * console.log(userOpHash) // '0x...'
 */
export async function installModule<
  TSmartAccount extends SmartAccount | undefined
>(
  client: Client<Transport, Chain | undefined, TSmartAccount>,
  parameters: InstallModuleParameters<TSmartAccount>
): Promise<Hex> {
  const {
    account: account_ = client.account,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    module,
    module: { address, initData, type },
    ...rest
  } = parameters

  if (!account_) {
    throw new AccountNotFoundError({
      docsPath: "/startale-client/methods#sendtransaction"
    })
  }

  const account = parseAccount(account_) as unknown as ModularSmartAccount

  const calls = await toInstallWithSafeSenderCalls(account, {
    address,
    initData,
    type
  })

  const sendUserOperationParams = {
    calls,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    account,
    ...rest
  }

  return getAction(
    client,
    sendUserOperation,
    "sendUserOperation"
  )(sendUserOperationParams)
}

export const toInstallModuleCalls = async (
  account: ModularSmartAccount,
  { address, initData, type }: ModuleMeta
): Promise<Call[]> => {
  const calls = [
    {
      to: account.address,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: [
          {
            name: "installModule",
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
                name: "initData"
              }
            ],
            outputs: []
          }
        ],
        functionName: "installModule",
        args: [parseModuleTypeId(type), getAddress(address), initData ?? "0x"]
      })
    }
  ]

  // These changes are done to ensure trustAttesters is a batch action.

  if (addressEquals(address, SMART_SESSIONS_ADDRESS)) {
    const publicClient = account?.client as PublicClient

    const trustedAttesters = await findTrustedAttesters({
      client: publicClient as any,
      accountAddress: account.address
    })

    const needToAddTrustAttesters = trustedAttesters.length === 0

    if (needToAddTrustAttesters) {
      const trustAttestersAction = getTrustAttestersAction({
        attesters: [RHINESTONE_ATTESTER_ADDRESS],
        threshold: 1
      })

      calls.push({
        to: trustAttestersAction.target,
        value: trustAttestersAction.value.valueOf(),
        data: trustAttestersAction.callData
      })
    }
  }

  return calls
}

export const toInstallWithSafeSenderCalls = async (
  account: ModularSmartAccount,
  { address, initData, type }: ModuleMeta
): Promise<Call[]> => [
  ...(await toInstallModuleCalls(account, { address, initData, type }))
]
