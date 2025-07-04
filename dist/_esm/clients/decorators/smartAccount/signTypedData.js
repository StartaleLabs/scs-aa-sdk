import { getTypesForEIP712Domain, validateTypedData } from "viem";
import { parseAccount } from "viem/utils";
import { AccountNotFoundError } from "../../../account/utils/AccountNotFound.js";
/**
 * Signs typed data using the smart account.
 *
 * This function calculates an Ethereum-specific signature in [EIP-712 format](https://eips.ethereum.org/EIPS/eip-712):
 * `sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))`
 *
 * @param client - The client instance.
 * @param parameters - Parameters for signing the typed data.
 * @returns The signature as a hexadecimal string.
 * @throws {AccountNotFoundError} If the account is not found.
 *
 * @example
 * import { signTypedData } from '@startale-scs/aa-sdk'
 * import { keccak256, encodeAbiParameters, parseAbiParameters } from 'viem'
 *
 * const domain = {
 *   name: 'Ether Mail',
 *   version: '1',
 *   chainId: 1,
 *   verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
 * }
 *
 * const types = {
 *   Person: [
 *     { name: 'name', type: 'string' },
 *     { name: 'wallet', type: 'address' }
 *   ],
 *   Mail: [
 *     { name: 'from', type: 'Person' },
 *     { name: 'to', type: 'Person' },
 *     { name: 'contents', type: 'string' }
 *   ]
 * }
 *
 * const message = {
 *   from: {
 *     name: 'Cow',
 *     wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
 *   },
 *   to: {
 *     name: 'Bob',
 *     wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
 *   },
 *   contents: 'Hello, Bob!'
 * }
 *
 * const signature = await signTypedData(startaleClient, {
 *   domain,
 *   types,
 *   primaryType: 'Mail',
 *   message
 * })
 * console.log(signature) // '0x...'
 */
export async function signTypedData(client, { account: account_ = client.account, domain, message, primaryType, types: types_ }) {
    if (!account_) {
        throw new AccountNotFoundError({
            docsPath: "/docs/actions/wallet/signMessage"
        });
    }
    const account = parseAccount(account_);
    const types = {
        EIP712Domain: getTypesForEIP712Domain({ domain }),
        ...types_
    };
    validateTypedData({
        domain,
        message,
        primaryType,
        types
    });
    return account.signTypedData({
        domain,
        primaryType,
        types,
        message
    });
}
//# sourceMappingURL=signTypedData.js.map