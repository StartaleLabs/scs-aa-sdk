import * as chains from "viem/chains";
const CUSTOM_CHAINS = [
    {
        id: 81_457,
        name: "Blast",
        nativeCurrency: {
            decimals: 18,
            name: "Ethereum",
            symbol: "ETH"
        },
        rpcUrls: {
            public: { http: ["https://rpc.blast.io"] },
            default: { http: ["https://rpc.blast.io"] }
        },
        blockExplorers: {
            etherscan: { name: "Blastscan", url: "https://blastscan.io/" },
            default: { name: "Blastscan", url: "https://blastscan.io/" }
        },
        contracts: {
            multicall3: {
                address: "0xca11bde05977b3631167028862be2a173976ca11",
                blockCreated: 88_189
            }
        }
    }
];
/**
 * Utility method for converting a chainId to a {@link Chain} object
 *
 * @param chainId
 * @returns a {@link Chain} object for the given chainId
 * @throws if the chainId is not found
 */
export const getChain = (chainId) => {
    const allChains = [...Object.values(chains), ...CUSTOM_CHAINS];
    for (const chain of allChains) {
        if (Number(chain.id) === Number(chainId)) {
            return chain;
        }
    }
    throw new Error(`Chain ${chainId} not found. Please add a customChain into your config using the getCustomChain(...) helper`);
};
export const stringOrStringsToArray = (str) => Array.isArray(str) ? str : [str];
/**
 *
 * getCustomChain
 *
 * Utility method for creating a custom chain object
 *
 * @param name The name of the chain
 * @param id The chainId (number)
 * @param rpcUrl The RPC URL for the chain - may also be an array of URLs
 * @param blockExplorer The block explorer URL for the chain - may also be an array of URLs
 * @param nativeCurrency The native currency for the chain, ETH by default
 * @param testnet Whether the chain is a testnet or not, true by default
 *
 * @example
 *
 * import { getCustomChain, createSmartAccountClient } from "@startale-scs/aa-sdk"
 *
 * const customChain = getCustomChain(
 *   "My Custom Chain",
 *   123456, // id
 *   "https://rpc.my-custom-chain.io", // Can also pass an array of URLs
 *   "https://explorer.my-custom-chain.io" // Can also pass an array of URLs
 * )
 *
 * const account = privateKeyToAccount(`0x${privateKey}`)
 * const walletClientWithCustomChain = createWalletClient({
 *   account,
 *   chain: customChain,
 *   transport: http()
 * })
 *
 * const smartAccountCustomChain = createSmartAccountClient({
 *   account: await toStartaleSmartAccount({
 *     chain: customChain,
 *     signer: walletClientWithCustomChain,
 *     transport: http(),
 *     mock: true
 *   }),
 *   transport: http(bundlerUrl),
 * })
 *
 * const { wait } = await smartAccountCustomChain.sendUserOperation({
 *   to: recipient,
 *   value: BigInt(1)
 * })
 *
 * const { success, receipt } = await wait();
 * console.log(success);
 *
 */
export const getCustomChain = (name, id, rpcUrl, blockExplorer, nativeCurrency, contracts, testnet = true) => {
    const chain = {
        testnet,
        id,
        name,
        nativeCurrency: nativeCurrency ?? {
            decimals: 18,
            name: "Ethereum",
            symbol: "ETH"
        },
        rpcUrls: {
            default: { http: stringOrStringsToArray(rpcUrl) }
        },
        blockExplorers: {
            default: {
                name: "Explorer",
                url: blockExplorer ? stringOrStringsToArray(blockExplorer)[0] : ""
            }
        },
        ...((contracts && { contracts }) || {})
    };
    return chain;
};
//# sourceMappingURL=getChain.js.map