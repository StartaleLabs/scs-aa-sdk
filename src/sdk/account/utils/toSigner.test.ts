import { JsonRpcProvider, ethers } from "ethers"
import { http, type Address, type Hex, createWalletClient } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { toNetwork } from "../../../test/testSetup"
import { type NetworkConfig, killNetwork, pKey } from "../../../test/testUtils"
import type { AnyData } from "../../modules"
import { type EthersWallet, addressEquals } from "./Utils"
import { toSigner } from "./toSigner"

const TEST_TYPED_DATA = {
  primaryType: "Person",
  domain: {
    name: "Test Protocol",
    version: "1",
    chainId: 1,
    verifyingContract: "0x0000000000000000000000000000000000000001" as Address
  },
  types: {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" }
    ]
  },
  message: {
    name: "Bob",
    wallet: "0x0000000000000000000000000000000000000001"
  }
} as const

describe("utils.toSigner", () => {
  let network: NetworkConfig

  beforeAll(async () => {
    network = await toNetwork("TESTNET_FROM_ENV_VARS")
  })

  afterAll(async () => {
    await killNetwork([network?.rpcPort, network?.bundlerPort])
  })

  it.skip("should work with viem WalletClient", async () => {
    const account = privateKeyToAccount(pKey as Hex)
    const client = createWalletClient({
      account,
      chain: network.chain,
      transport: http(network.rpcUrl)
    })

    const signer = await toSigner({ signer: client })

    expect(addressEquals(signer.address, account.address)).toBe(true)

    // Test message signing
    const signature = await signer.signMessage({ message: "Hello World" })
    expect(signature).toBeTruthy()
    expect(typeof signature).toBe("string")

    // Test typed data signing
    const typedSignature = await signer.signTypedData(TEST_TYPED_DATA)
    expect(typedSignature).toBeTruthy()
    expect(typeof typedSignature).toBe("string")
  })

  it.skip("should work with viem Account", async () => {
    const account = privateKeyToAccount(pKey as Hex)
    const signer = await toSigner({ signer: account })

    expect(signer.address).toBe(account.address)

    const signature = await signer.signMessage({ message: "Hello World" })
    expect(signature).toBeTruthy()
  })

  it("should work with ethers Wallet", async () => {
    const wallet = new ethers.Wallet(pKey) as EthersWallet
    const signer = await toSigner({ signer: wallet })
    expect(signer.address).toBe(wallet.address)
  })

  // TODO: Review and fix
  it.skip("should work with ethers JsonRpcSigner", async () => {
    const provider = new JsonRpcProvider(network.rpcUrl)
    const signer = await provider.getSigner()
    const accountSigner = await toSigner({ signer: signer as AnyData })
    expect(accountSigner.address).toBe(await signer.getAddress())
    const signedMessage = await accountSigner.signMessage({
      message: "Hello World"
    })
    expect(signedMessage).toBeDefined()
    expect(typeof signedMessage).toBe("string")
  })
})
