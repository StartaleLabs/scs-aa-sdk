import {
  http,
  type Address,
  type Chain,
  type LocalAccount,
  createWalletClient,
  parseEther
} from "viem"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { toNetwork } from "../../../../test/testSetup"
import {
  type MasterClient,
  type NetworkConfig,
  getTestAccount,
  killNetwork,
  toTestClient
} from "../../../../test/testUtils"
import {
  type StartaleSmartAccount,
  toStartaleSmartAccount
} from "../../../account"
import {
  type StartaleAccountClient,
  createSmartAccountClient
} from "../../../clients/createSCSBundlerClient"
import type { Validator } from "../toValidator"
import { toDefaultModule } from "./toDefaultModule"

describe("modules.toDefaultModule", () => {
  let chain: Chain
  let bundlerUrl: string
  let network: NetworkConfig
  let testClient: MasterClient

  let eoaAccount: LocalAccount
  let redeemerAccount: LocalAccount
  let startaleClient: StartaleAccountClient
  let startaleAccountAddress: Address
  let startaleAccount: StartaleSmartAccount
  let meeModule: Validator

  beforeAll(async () => {
    network = await toNetwork("TESTNET_FROM_ENV_VARS")

    chain = network.chain
    bundlerUrl = network.bundlerUrl
    eoaAccount = getTestAccount(0)
    redeemerAccount = getTestAccount(1)

    const walletClient = createWalletClient({
      account: eoaAccount,
      chain,
      transport: http()
    })

    testClient = toTestClient(chain, getTestAccount(5))

    meeModule = toDefaultModule({ signer: eoaAccount })

    startaleAccount = await toStartaleSmartAccount({
      signer: eoaAccount,
      chain,
      transport: http()
    })

    startaleClient = createSmartAccountClient({
      bundlerUrl,
      account: startaleAccount,
      mock: true,
      client: testClient
    })
    startaleAccountAddress = await startaleAccount.getAddress()
    await walletClient.sendTransaction({
      chain,
      account: eoaAccount,
      to: startaleAccountAddress,
      value: parseEther("0.01")
    })
  })
  afterAll(async () => {
    await killNetwork([network?.rpcPort, network?.bundlerPort])
  })

  test("should have a consistent snapshot", async () => {
    expect(meeModule).toMatchInlineSnapshot(`
      {
        "address": "0x0000000000000000000000000000000000000000",
        "data": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "deInitData": "0x",
        "getStubSignature": [Function],
        "initData": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "module": "0x0000000000000000000000000000000000000000",
        "signMessage": [Function],
        "signUserOpHash": [Function],
        "signer": {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "getHdKey": [Function],
          "nonceManager": undefined,
          "publicKey": "0x048318535b54105d4a7aae60c08fc45f9687181b4fdfc625bd1a753fa7397fed753547f11ca8696646f2f3acb08e31016afac23e630c5d11f59f61fef57b0d2aa5",
          "sign": [Function],
          "signAuthorization": [Function],
          "signMessage": [Function],
          "signTransaction": [Function],
          "signTypedData": [Function],
          "source": "hd",
          "type": "local",
        },
        "type": "validator",
      }
    `)
  })

  test("should generate a valid signature", async () => {
    const signature = await meeModule.signer.signMessage({ message: "test" })
    expect(signature).toMatchInlineSnapshot(
      `"0xf755d9a72d5b7386765e7f0e833af68795b739a267122dae933f41b781b5aed0626ce3263308ebd4c37bed84319b66da2794368771046825bd89b98ba68c4e871b"`
    )
  })
})
