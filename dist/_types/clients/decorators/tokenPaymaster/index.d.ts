import type { PaymasterClient } from "viem/account-abstraction";
import type { StartaleAccountClient } from "../../createSCSBundlerClient";
import { type FeeQuote, type GetTokenPaymasterQuotesParameters, type TokenPaymasterQuotesResponse } from "./getTokenPaymasterQuotes";
export type TokenPaymasterActions = {
    /**
     * Fetches paymaster quotes for ERC20 token payment options for a given UserOperation.
     *
     * @param userOp - The UserOperation to get paymaster quotes for
     * @param client - Viem Client configured with TokenPaymaster RPC methods
     * @param tokenList - Array of ERC20 token addresses to get quotes for
     *
     * @returns A promise of {@link TokenPaymasterQuotesResponse}
     *
     * @example
     * ```typescript
     * // Configure client with paymaster RPC
     * const paymasterClient = createSCSPaymasterClient({
     *     paymasterUrl
     * })
     *
     * // Token addresses to get quotes for
     * const tokenList = [
     *   "0x...", // USDT
     *   "0x..."  // USDC
     * ];
     *
     * // Get paymaster quotes
     * const quotes = await paymasterClient.getTokenPaymasterQuotes(userOp, tokenList);
     *
     * // Example response:
     * // {
     * //   mode: "ERC20",
     * //   paymasterAddress: "0x...",
     * //   feeQuotes: [{
     * //     symbol: "USDT",
     * //     decimal: 6,
     * //     tokenAddress: "0x...",
     * //     maxGasFee: 5000000,
     * //     maxGasFeeUSD: 5,
     * //     exchangeRate: 1,
     * //     logoUrl: "https://...",
     * //     premiumPercentage: "0.1",
     * //     validUntil: 1234567890
     * //   }],
     * //   unsupportedTokens: []
     * // }
     * ```
     */
    getTokenPaymasterQuotes: (parameters: GetTokenPaymasterQuotesParameters) => Promise<TokenPaymasterQuotesResponse>;
    /**
     * Retrieves the supported tokens for the Token Paymaster..
     *
     * @param client - The Startale client instance
     * @returns A promise that resolves to an array of FeeQuote objects.
     *
     * @example
     * ```typescript
     * const supportedTokens = await paymaster.getSupportedTokens(startaleClient);
     * console.log(supportedTokens);
     * ```
     */
    getSupportedTokens: (client: StartaleAccountClient) => Promise<FeeQuote[]>;
};
export declare const scsTokenPaymasterActions: () => (client: PaymasterClient) => TokenPaymasterActions;
//# sourceMappingURL=index.d.ts.map