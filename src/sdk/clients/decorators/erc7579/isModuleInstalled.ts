import {
  type Chain,
  type Client,
  ContractFunctionExecutionError,
  type Hex,
  type ReadContractParameters,
  type Transport,
  decodeFunctionResult,
  encodeFunctionData,
  getAddress
} from "viem"
import type { SmartAccount } from "viem/account-abstraction"
import { call, readContract } from "viem/actions"
import { getAction, parseAccount } from "viem/utils"
import { AccountNotFoundError } from "../../../account/utils/AccountNotFound"
import type {
  ModularSmartAccount,
  ModuleMeta
} from "../../../modules/utils/Types"
import { parseModuleTypeId } from "./supportsModule"

export type IsModuleInstalledParameters<
  TSmartAccount extends SmartAccount | undefined
> = { account?: TSmartAccount } & {
  module: ModuleMeta
}

const abi = [
  {
    name: "isModuleInstalled",
    type: "function",
    stateMutability: "view",
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
        name: "additionalContext"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ]
  }
] as const

/**
 * Checks if a specific module is installed on a given smart account.
 *
 * @param client - The client instance.
 * @param parameters - Parameters including the smart account and the module to check.
 * @returns A boolean indicating whether the module is installed.
 * @throws {AccountNotFoundError} If the account is not found.
 * @throws {Error} If the accountId result is empty.
 *
 * @example
 * import { isModuleInstalled } from '@startale-scs/aa-sdk'
 *
 * const isInstalled = await isModuleInstalled(startaleClient, {
 *   module: {
 *     type: 'executor',
 *     address: '0x...',
 *     context: '0x'
 *   }
 * })
 * console.log(isInstalled) // true or false
 */
export async function isModuleInstalled<
  TSmartAccount extends SmartAccount | undefined
>(
  client: Client<Transport, Chain | undefined, TSmartAccount>,
  parameters: IsModuleInstalledParameters<TSmartAccount>
): Promise<boolean> {
  const {
    account: account_ = client.account,
    module: { address, initData, type }
  } = parameters

  if (!account_) {
    throw new AccountNotFoundError({
      docsPath: "/startale-client/methods#sendtransaction"
    })
  }

  const account = parseAccount(account_) as ModularSmartAccount

  const publicClient = account.client

  const [isModuleEnabledRead] = await toIsModuleInstalledReads(account, {
    address,
    initData,
    type
  })

  try {
    return (await getAction(
      publicClient,
      readContract,
      "readContract"
    )(isModuleEnabledRead)) as unknown as Promise<boolean>
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      const { factory, factoryData } = await account.getFactoryArgs()

      const result = await getAction(
        publicClient,
        call,
        "call"
      )({
        factory: factory,
        factoryData: factoryData,
        to: account.address,
        data: encodeFunctionData({
          abi,
          functionName: "isModuleInstalled",
          args: [parseModuleTypeId(type), getAddress(address), initData ?? "0x"]
        })
      })

      if (!result || !result.data) {
        throw new Error("accountId result is empty")
      }

      return decodeFunctionResult({
        abi,
        functionName: "isModuleInstalled",
        data: result.data
      }) as unknown as Promise<boolean>
    }

    throw error
  }
}

export const toIsModuleInstalledReads = async (
  account: ModularSmartAccount,
  { address, initData, type }: ModuleMeta
): Promise<
  ReadContractParameters<
    typeof abi,
    "isModuleInstalled",
    [bigint, `0x${string}`, Hex]
  >[]
> => [
  {
    abi,
    functionName: "isModuleInstalled",
    args: [parseModuleTypeId(type), getAddress(address), initData ?? "0x"],
    address: account.address
  }
]
export const erc7579Reads = {
  toIsModuleInstalledReads
}
