import type { Chain, Client, Hex, PublicClient, Transport } from "viem"
import { parseAccount } from "viem/utils"
import { AccountNotFoundError } from "../../../../account/utils/AccountNotFound"
import type { Call } from "../../../../account/utils/Types"
import {
  getAccount,
  getAddOwnableValidatorOwnerAction
} from "../../../../constants"
import type { AnyData, ModularSmartAccount } from "../../../utils/Types"

/**
 * Parameters for getting the transaction to add an owner to a smart account.
 *
 * @template TModularSmartAccount - The type of the smart account, which can be a ModularSmartAccount or undefined.
 */
export type GetAddOwnerTxParameters<
  TModularSmartAccount extends ModularSmartAccount | undefined
> = {
  /** The smart account to add the owner to. If not provided, the client's account will be used. */
  account?: TModularSmartAccount
  /** The address of the new owner to be added. */
  owner: Hex
}

/**
 * Generates the transaction data for adding a new owner to a smart account.
 *
 * This function prepares the necessary transaction data to add a new owner to the specified smart account.
 * It doesn't send the transaction, but returns the data needed to do so.
 *
 * @template TModularSmartAccount - The type of the smart account, which can be a ModularSmartAccount or undefined.
 * @param client - The client used to interact with the blockchain.
 * @param parameters - The parameters for adding the new owner.
 * @returns A promise that resolves to a Call object containing the transaction data.
 * @throws {AccountNotFoundError} If no account is provided and the client doesn't have an associated account.
 * @throws {Error} If there's an error getting the add owner action or if the public client is not found.
 */
export async function getAddOwnerTx<
  TModularSmartAccount extends ModularSmartAccount | undefined
>(
  client: Client<Transport, Chain | undefined, TModularSmartAccount>,
  parameters: GetAddOwnerTxParameters<TModularSmartAccount>
): Promise<Call> {
  const { account: account_ = client.account, owner } = parameters

  if (!account_) {
    throw new AccountNotFoundError({
      docsPath: "/startale-client/methods#sendtransaction"
    })
  }

  const account = parseAccount(account_) as ModularSmartAccount
  const publicClient = account.client as PublicClient

  if (!publicClient) {
    throw new Error("Public client not found")
  }

  const startaleAccount = getAccount({
    address: account.address,
    type: "erc7579-implementation"
  })

  const action = await getAddOwnableValidatorOwnerAction({
    account: startaleAccount,
    client: publicClient as any,
    owner
  })

  if (!("callData" in action)) {
    throw new Error("Error getting set threshold actions")
  }

  return {
    to: action.target,
    value: BigInt(action.value.toString()),
    data: action.callData
  }
}

export const toAddOwnerCalls = async (
  account: ModularSmartAccount,
  parameters: GetAddOwnerTxParameters<ModularSmartAccount | undefined>
): Promise<Call[]> => {
  return [await getAddOwnerTx({} as AnyData, { ...parameters, account })]
}
