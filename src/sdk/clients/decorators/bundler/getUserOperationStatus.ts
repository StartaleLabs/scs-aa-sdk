import type { Account, Chain, Client, Hex, Transport } from "viem"
import type {
  SmartAccount,
  UserOperationReceipt
} from "viem/account-abstraction"
import type { MiscRpcSchema } from "."

export type GetUserOperationStatusParameters = {
  /** The hash of the User Operation. */
  hash: Hex
}

export type GetUserOperationStatusReturnType = {
  state: "CONFIRMED" | "PENDING" | "REJECTED"
  message: string
  transactionHash: string
  userOperationReceipt: UserOperationReceipt
}

// Review: If we could integrate our specific API
export async function getUserOperationStatus<
  TAccount extends SmartAccount | undefined
>(
  client: Client<
    Transport,
    Chain | undefined,
    Account | undefined,
    MiscRpcSchema
  >,
  parameters: GetUserOperationStatusParameters & { account?: TAccount }
): Promise<GetUserOperationStatusReturnType> {
  return await client.request({
    method: "biconomy_getUserOperationStatus",
    params: [parameters.hash]
  })
}
