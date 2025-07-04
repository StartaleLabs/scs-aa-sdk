import { http, type Address, type OneOf, type Transport } from "viem"
import {
  type PaymasterClient,
  type PaymasterClientConfig,
  type SmartAccount,
  createPaymasterClient,
} from "viem/account-abstraction"
import {
  type TokenPaymasterActions,
  scsTokenPaymasterActions
} from "./decorators/tokenPaymaster"
import { getTokenPaymasterQuotes, type GetTokenPaymasterQuotesParameters } from "./decorators/tokenPaymaster/getTokenPaymasterQuotes"
import { type StartaleSmartAccountImplementation } from "../account"
import type { AnyData } from "../modules/utils/Types"

export type SCSPaymasterClient = Omit<PaymasterClient, "getPaymasterStubData"> &
  TokenPaymasterActions

/**
 * Configuration options for creating a SCS Paymaster Client.
 * @typedef {Object} SCSPaymasterClientConfig
 * @property {Transport} [transport] - Optional custom transport.
 * @property {string} [paymasterUrl] - URL of the paymaster service.
 * @property {number} [chainId] - Chain ID for the network.
 * @property {string} [apiKey] - API key for authentication.
 */
type SCSPaymasterClientConfig = Omit<PaymasterClientConfig, "transport"> &
  OneOf<
    | {
        transport?: Transport
      }
    | {
        paymasterUrl: string
      }
    | {
        chainId: number
        apiKey: string
      }
  >

/**
 * Possible Context for the SCS Paymaster.
 */
export type SCSPaymasterContext = {
  paymasterId?: string
  token?: Address
  // expiryDuration?: number
  calculateGasLimits?: boolean
}

type ToSCSTokenPaymasterContextParams = {
  // feeTokenAddress: Address
  token: Address
  // expiryDuration?: number
  calculateGasLimits?: boolean
}

// These should not be any default hardcoded context
// export const scsSponsoredPaymasterContext: SCSPaymasterContext = {
//   calculateGasLimits: true,
//   // Review this has to be dynamic
//   // paymasterId: "pm_test"
// }

export const toSCSSponsoredPaymasterContext = (
  params?: Partial<SCSPaymasterContext>
): SCSPaymasterContext => {
  return {
    calculateGasLimits: true,
    ...params
  }
}

export const toSCSTokenPaymasterContext = (
  params: ToSCSTokenPaymasterContextParams
): SCSPaymasterContext => {
  const { calculateGasLimits } = params
  return {
    token: params.token,
    calculateGasLimits: calculateGasLimits ?? true
  }
}

/**
 * Creates a SCS Paymaster Client.
 *
 * This function sets up a client for interacting with SCS's paymaster service.
 * It can be configured with a custom transport, a specific paymaster URL, or with a chain ID and API key.
 *
 * @param {SCSPaymasterClientConfig} parameters - Configuration options for the client.
 * @returns {PaymasterClient} A configured Paymaster Client instance.
 *
 * @example
 * // Create a client with a custom transport
 * const client1 = createSCSPaymasterClient({ transport: customTransport })
 *
 * @example
 * // Create a client with a specific paymaster URL
 * const client2 = createSCSPaymasterClient({ paymasterUrl: 'https://example.com/paymaster' })
 *
 * @example
 * // Create a client with chain ID and API key
 * const client3 = createSCSPaymasterClient({ chainId: 1, apiKey: 'your-api-key' })
 *
 * @example
 * // Create a Token Paymaster Client
 * const tokenPaymasterClient = createSCSPaymasterClient({
 *      paymasterUrl: 'https://example.com/paymaster',
 *      paymasterContext: {
 *        mode: "ERC20",
 *        tokenInfo: {
 *          feeTokenAddress: "0x..."
 *        }
 *      },
 * })
 */
export const createSCSPaymasterClient = (
  parameters: SCSPaymasterClientConfig
): SCSPaymasterClient => {
  const defaultedTransport = parameters.transport
    ? parameters.transport
    : parameters.paymasterUrl
      ? http(parameters.paymasterUrl)
      : http(
          `https://paymaster.scs.startale.com/v1?apikey=${parameters.apiKey}`
        )

  // Todo: Update default to https://dev.paymaster.scs.startale.com/v1?apikey=scsadmin-paymaster (or prod)

  // Remove getPaymasterStubData from the client.
  const { getPaymasterStubData, ...paymasterClient } = createPaymasterClient({
    ...parameters,
    transport: defaultedTransport
  })
  .extend((client: AnyData) => ({
    getTokenPaymasterQuotes: async (args: GetTokenPaymasterQuotesParameters) => {
      let _args = args
      // Review
      if (args.userOp?.authorization) {
        const authorization =
          args.userOp.authorization ||
          (await (
            client.account as SmartAccount<StartaleSmartAccountImplementation>
          )?.eip7702Authorization?.())
        args.userOp.authorization = authorization
      }
      return await getTokenPaymasterQuotes(client, _args)
    }
  }))
  .extend(scsTokenPaymasterActions())

  return paymasterClient
}
