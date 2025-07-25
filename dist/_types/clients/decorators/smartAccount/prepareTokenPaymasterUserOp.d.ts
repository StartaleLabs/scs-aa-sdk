import { type Address, type Chain, type Client, type SignedAuthorization, type Transport } from "viem";
import type { SmartAccount, UserOperation } from "viem/account-abstraction";
export type Transaction = {
    to: Address;
    data: `0x${string}`;
    value: bigint;
};
/**
 * Parameters for preparing a token paymaster user operation
 */
export type PrepareTokenPaymasterUserOpParameters = {
    /** Array of transactions to be executed */
    calls: Transaction[];
    /** Token used for paying for the gas */
    feeTokenAddress: Address;
    /** Optional custom approval amount for the token paymaster. If not provided, max uint256 will be used */
    customApprovalAmount?: bigint;
    authorization?: SignedAuthorization<number> | undefined;
};
/**
 * Prepares a user operation with token paymaster configuration, including ERC20 token approval
 *
 * This function handles:
 * 1. Checking current token allowance of Smart Account
 * 2. Creating an approval transaction for the token paymaster if needed
 * 3. Preparing the user operation with the approval and user transactions
 *
 * @param client - The StartaleAccountClient instance
 * @param args.txs - Array of transactions to be executed
 * @param args.feeTokenAddress - Token used for paying for the gas
 * @param args.customApprovalAmount - Optional custom approval amount
 *
 * @returns A prepared user operation without signature (will be signed by the Smart Account when sent)
 *
 * @example
 * ```typescript
 * const userOp = await prepareTokenPaymasterUserOp(startaleClient, {
 *    txs: [
 *      {
 *        to: recipientAddress,
 *        value: 1n,
 *        data: "0x"
        }
      ],
      customApprovalAmount: usdcFeeAmount
    })
 * ```
 *
 * @throws Will throw an error if client account or paymaster context is not properly configured
 */
export declare function prepareTokenPaymasterUserOp<account extends SmartAccount | undefined, chain extends Chain | undefined>(client: Client<Transport, chain, account>, args: PrepareTokenPaymasterUserOpParameters): Promise<Omit<UserOperation<"0.7">, "signature">>;
//# sourceMappingURL=prepareTokenPaymasterUserOp.d.ts.map