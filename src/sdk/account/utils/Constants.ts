import { type Hex, concat, keccak256, pad, toHex } from "viem"
export const ADDRESS_ZERO: Hex = "0x0000000000000000000000000000000000000000"

// Note: This is only applicable when prod env is used.
export const STARTALE_TOKEN_PAYMASTER: Hex =
  "0x0000006C18daC1Ff8F50Df743F7587a8b7d8a8a7"

export const EIP1559_UNSUPPORTED_NETWORKS: Array<number> = [97, 56, 1442, 1101]

export const PROXY_CREATION_CODE =
  "0x603d3d8160223d3973600966Ae45ad5BE4be08a70AD99e9cF41e6d6884B06F5155f3363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3"

// REview: Deploy in future if we need one
export const ADDRESS_RESOLVER_ADDRESS =
  "0x00000E81673606e07fC79CE5F1b3B26957844468"

export const DefaultGasLimit = {
  callGasLimit: 800000n,
  verificationGasLimit: 1000000n,
  preVerificationGas: 100000n
}

export const LargeGasLimit = {
  callGasLimit: 10000000n,
  verificationGasLimit: 15000000n,
  preVerificationGas: 1500000n
}

export const ERROR_MESSAGES = {
  KEY_GEN_DATA_NOT_FOUND: "Key generation data is not available",
  SIGNATURE_NOT_FOUND: "Signature not found from Dan",
  FAILED_COMPUTE_ACCOUNT_ADDRESS:
    "Failed to compute account address. Possible reasons:\n" +
    "- The factory contract does not have the function 'computeAccountAddress'\n" +
    "- The parameters passed to the factory contract function may be invalid\n" +
    "- The provided factory address is not a contract",
  SIGNER_REQUIRED_FOR_CREATE_SESSION: "Signer is required",
  ACCOUNT_REQUIRED: "Account is required",
  MODULE_NOT_ACTIVATED: "Module not activated",
  SMART_SESSION_DATA_REQUIRED:
    "Data is required for using smart session module",
  MISSING_ACCOUNT_CONTRACT:
    'The contract function "computeAccountAddress" returned no data ("0x")',
  INVALID_HEX:
    "Invalid hex, if you are targeting a number, consider using pad() and toHex() from viem: pad(toHex(BigInt(2000))",
  CONTRACT_NOT_DEPLOYED:
    "Address is not a contract. Make sure that the contract you are trying to use is deployed.",
  ACCOUNT_NOT_DEPLOYED: "Account has not yet been deployed",
  ACCOUNT_ALREADY_DEPLOYED: "Account already deployed",
  NO_NATIVE_TOKEN_BALANCE_DURING_DEPLOY:
    "Smart Account does not have sufficient funds to execute the User Operation.",
  SPENDER_REQUIRED: "spender is required for ERC20 mode",
  NO_FEE_QUOTE:
    "FeeQuote was not provided, please call smartAccount.getTokenFees() to get feeQuote",
  FAILED_FEE_QUOTE_FETCH: "Failed to fetch fee quote",
  CHAIN_NOT_FOUND: "Chain not found",
  NO_RECIPIENT: "Recipient is required",
  NATIVE_TOKEN_WITHDRAWAL_WITHOUT_AMOUNT:
    "'Amount' is required for withdrawal of native token without using a paymaster",
  MISSING_RPC_URL:
    "rpcUrl is required for this signer type, please provide it in the config",
  INVALID_SESSION_INDEXES:
    "Session indexes and transactions must be of the same length and correspond to each other",
  SIGNER_REQUIRED: "Signer is required for creating a smart account",
  UNKNOW_SESSION_ARGUMENTS:
    "You have not provided the necessary information to find and use a session"
}

export const NATIVE_TOKEN_ALIAS: Hex =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
export const ERC20_ABI = [
  "function transfer(address to, uint256 value) external returns (bool)",
  "function transferFrom(address from, address to, uint256 value) external returns (bool)",
  "function approve(address spender, uint256 value) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
]

// define mode and exec type enums
export const CALLTYPE_SINGLE: Hex = "0x00" // 1 byte
export const CALLTYPE_BATCH: Hex = "0x01" // 1 byte
export const EXECTYPE_DEFAULT: Hex = "0x00" // 1 byte
export const EXECTYPE_TRY: Hex = "0x01" // 1 byte
export const EXECTYPE_DELEGATE: Hex = "0xFF" // 1 byte
export const MODE_DEFAULT: Hex = "0x00000000" // 4 bytes
export const UNUSED: Hex = "0x00000000" // 4 bytes
export const MODE_PAYLOAD: Hex =
  "0x00000000000000000000000000000000000000000000" // 22 bytes

export const GENERIC_FALLBACK_SELECTOR: Hex = "0xcb5baf0f"

export const SENTINEL_ADDRESS: Hex =
  "0x0000000000000000000000000000000000000001"

export const MODE_VALIDATION: Hex = "0x00"
export const MODE_MODULE_ENABLE: Hex = "0x01"

export const MODULE_ENABLE_MODE_TYPE_HASH = keccak256(
  toHex("ModuleEnableMode(address module, bytes32 initDataHash)")
)
export const MOCK_MULTI_MODULE_ADDRESS =
  "0x9C992f91E7Cd4697B81E137007f446E826b8378b"
export const MODULE_TYPE_MULTI = 0

// Todo: Update when final prod contracts are deployed
export const ACCOUNT_DOMAIN_NAME = "Startale"
export const ACCOUNT_DOMAIN_VERSION = "0.0.1"
export const ACCOUNT_DOMAIN_TYPEHASH =
  "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"

export const PARENT_TYPEHASH =
  "TypedDataSign(Contents contents,string name,string version,uint256 chainId,address verifyingContract,bytes32 salt)Contents(bytes32 stuff)"
export const eip1271MagicValue: Hex = "0x1626ba7e"

export const EXECUTE_SINGLE = concat([
  CALLTYPE_SINGLE,
  EXECTYPE_DEFAULT,
  MODE_DEFAULT,
  UNUSED,
  MODE_PAYLOAD
])

export const EXECUTE_BATCH = concat([
  CALLTYPE_BATCH,
  EXECTYPE_DEFAULT,
  MODE_DEFAULT,
  UNUSED,
  MODE_PAYLOAD
])

export const ACCOUNT_MODES = {
  DEFAULT_SINGLE: concat([
    pad(EXECTYPE_DEFAULT, { size: 1 }),
    pad(CALLTYPE_SINGLE, { size: 1 }),
    pad(UNUSED, { size: 4 }),
    pad(MODE_DEFAULT, { size: 4 }),
    pad(MODE_PAYLOAD, { size: 22 })
  ]),
  DEFAULT_BATCH: concat([
    pad(EXECTYPE_DEFAULT, { size: 1 }),
    pad(CALLTYPE_BATCH, { size: 1 }),
    pad(UNUSED, { size: 4 }),
    pad(MODE_DEFAULT, { size: 4 }),
    pad(MODE_PAYLOAD, { size: 22 })
  ]),
  TRY_BATCH: concat([
    pad(EXECTYPE_TRY, { size: 1 }),
    pad(CALLTYPE_BATCH, { size: 1 }),
    pad(UNUSED, { size: 4 }),
    pad(MODE_DEFAULT, { size: 4 }),
    pad(MODE_PAYLOAD, { size: 22 })
  ]),
  TRY_SINGLE: concat([
    pad(EXECTYPE_TRY, { size: 1 }),
    pad(CALLTYPE_SINGLE, { size: 1 }),
    pad(UNUSED, { size: 4 }),
    pad(MODE_DEFAULT, { size: 4 }),
    pad(MODE_PAYLOAD, { size: 22 })
  ]),
  DELEGATE_SINGLE: concat([
    pad(EXECTYPE_DELEGATE, { size: 1 }),
    pad(CALLTYPE_SINGLE, { size: 1 }),
    pad(UNUSED, { size: 4 }),
    pad(MODE_DEFAULT, { size: 4 }),
    pad(MODE_PAYLOAD, { size: 22 })
  ])
}
