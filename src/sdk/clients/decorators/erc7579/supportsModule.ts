import {
  type Chain,
  type Client,
  ContractFunctionExecutionError,
  type ReadContractParameters,
  type Transport,
  decodeFunctionResult,
  encodeFunctionData
} from "viem"
import type { SmartAccount } from "viem/account-abstraction"
import { call, readContract } from "viem/actions"
import { getAction } from "viem/utils"
import { parseAccount } from "viem/utils"
import { AccountNotFoundError } from "../../../account/utils/AccountNotFound"
import type {
  ModularSmartAccount,
  ModuleType
} from "../../../modules/utils/Types"

export type SupportsModuleParameters<
  TSmartAccount extends SmartAccount | undefined
> = { account?: TSmartAccount } & {
  type: ModuleType
}

const abi = [
  {
    name: "supportsModule",
    type: "function",
    stateMutability: "view",
    inputs: [
      {
        type: "uint256",
        name: "moduleTypeId"
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
 * Parses a module type to its corresponding ID.
 *
 * @param type - The module type to parse.
 * @returns The corresponding bigint ID for the module type.
 * @throws {Error} If an invalid module type is provided.
 */
export function parseModuleTypeId(type: ModuleType): bigint {
  switch (type) {
    case "validator":
      return BigInt(1)
    case "executor":
      return BigInt(2)
    case "fallback":
      return BigInt(3)
    case "hook":
      return BigInt(4)
    default:
      throw new Error(`Invalid module type: ${type}`)
  }
}

/**
 * Checks if a smart account supports a specific module type.
 *
 * @param client - The client instance.
 * @param args - Parameters including the smart account and module type to check.
 * @returns A boolean indicating whether the module type is supported.
 * @throws {AccountNotFoundError} If the account is not found.
 *
 * @example
 * import { supportsModule } from '@startale-scs/aa-sdk'
 *
 * const isSupported = await supportsModule(startaleClient, {
 *   type: 'executor'
 * })
 * console.log(isSupported) // true or false
 */
export async function supportsModule<
  TSmartAccount extends SmartAccount | undefined
>(
  client: Client<Transport, Chain | undefined, TSmartAccount>,
  args: SupportsModuleParameters<TSmartAccount>
): Promise<boolean> {
  const { account: account_ = client.account } = args

  // Review: all docs paths.
  if (!account_) {
    throw new AccountNotFoundError({
      docsPath: "/startale-client/methods#sendtransaction"
    })
  }

  const account = parseAccount(account_) as unknown as ModularSmartAccount

  const publicClient = account.client

  const [supportsModuleRead] = await toSupportsModuleReads(account, args)

  try {
    return await getAction(
      publicClient,
      readContract,
      "readContract"
    )(supportsModuleRead)
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
          functionName: "supportsModule",
          args: [parseModuleTypeId(args.type)]
        })
      })

      if (!result || !result.data) {
        throw new Error("accountId result is empty")
      }

      return decodeFunctionResult({
        abi,
        functionName: "supportsModule",
        data: result.data
      })
    }

    throw error
  }
}

export const toSupportsModuleReads = async <
  TSmartAccount extends SmartAccount | undefined
>(
  account: ModularSmartAccount,
  { type }: SupportsModuleParameters<TSmartAccount>
): Promise<
  ReadContractParameters<typeof abi, "supportsModule", [bigint]>[]
> => [
  {
    abi,
    functionName: "supportsModule",
    args: [parseModuleTypeId(type)],
    address: account.address
  }
]
