import { type Address, type Hex, encodePacked } from "viem"
import {
  SMART_SESSIONS_ADDRESS,
  SmartSessionMode,
  encodeSmartSessionSignature,
  getOwnableValidatorMockSignature,
  getSmartSessionsValidator
} from "../../../constants"
import type { ModuleMeta } from "../../utils/Types"
import type { ModularSmartAccount } from "../../utils/Types"
import type { Module, ModuleParameters } from "../../utils/Types"
import { toModule } from "../../utils/toModule"
import type { UsePermissionModuleData } from "./Types"

export const DUMMY_ECDSA_SIG =
  "0xe8b94748580ca0b4993c9a1b86b5be851bfc076ff5ce3a1ff65bf16392acfcb800f9b4f1aef1555c7fce5599fffb17e7c635502154a0333ba21f3ae491839af51c"

export type SmartSessionModule = Module & {
  moduleData?: UsePermissionModuleData
}

/**
 * Arguments for getting the initialization data for a Use Session module.
 */
export type UsePermissionModuleGetInitDataArgs = {
  signerAddress: Address
}

/**
 * Parameters for creating a Use Session module.
 */
export type UsePermissionModuleParameters = Omit<
  ModuleParameters,
  "accountAddress" | "address"
> & {
  account: ModularSmartAccount
  moduleData?: UsePermissionModuleData
}

/**
 * Gets the initialization data for a Use Session module.
 *
 * @param _ - Optional arguments (currently unused).
 * @returns The module metadata including address, type, and initialization data.
 */
export const getUsePermissionModuleInitData = (
  _?: UsePermissionModuleGetInitDataArgs
): ModuleMeta => ({
  address: SMART_SESSIONS_ADDRESS,
  type: "validator",
  initData: "0x"
})

/**
 * Gets the initialization data for a Use Session.
 *
 * @param signerAddress - The address of the signer for the session.
 * @returns The encoded initialization data as a hexadecimal string.
 */
export const getUsePermissionInitData = ({
  signerAddress
}: UsePermissionModuleGetInitDataArgs): Hex =>
  encodePacked(["address"], [signerAddress])

/**
 * Creates a Smart Sessions module for a modular smart account.
 *
 * This function sets up a Smart Sessions module with the specified parameters,
 * including session mode, permission ID, and session data.
 *
 * @param parameters - The parameters for creating the Smart Sessions module.
 * @returns A Module object representing the created Smart Sessions module.
 *
 * @example
 * ```typescript
 * const smartSessionsModule = toSmartSessionsValidator({
 *   account: mySmartAccount,
 *   signer: mySigner,
 *   moduleData: {
 *     permissionId: '0x1234...',
 *     mode: SmartSessionMode.USE,
 *     enableSessionData: '0x5678...'
 *   }
 * });
 * ```
 *
 * @remarks
 * - The function generates stub signatures and can sign user operation hashes.
 * - It uses the SmartSession address from the predefined addresses.
 * - The default session mode is USE if not specified.
 */
export const toSmartSessionsValidator = (
  parameters: UsePermissionModuleParameters
): SmartSessionModule => {
  const {
    account,
    signer,
    moduleInitData: moduleInitData_,
    deInitData = "0x",
    initData: initData_,
    initArgs: initArgs_ = { signerAddress: signer.address },
    moduleData: {
      permissionIdIndex = 0,
      permissionIds = [],
      mode = SmartSessionMode.USE,
      enableSessionData
    } = {}
  } = parameters

  const initData = initData_ ?? getUsePermissionInitData(initArgs_)
  const moduleInitData =
    moduleInitData_ ?? getSmartSessionsValidator({ useRegistry: false })

  return toModule({
    ...parameters,
    signer,
    accountAddress: account.address,
    address: SMART_SESSIONS_ADDRESS,
    initData,
    moduleInitData,
    deInitData,
    getStubSignature: async () =>
      encodeSmartSessionSignature({
        mode,
        permissionId: permissionIds[permissionIdIndex],
        enableSessionData,
        signature: getOwnableValidatorMockSignature({
          threshold: 1
        })
      }),
    signUserOpHash: async (userOpHash: Hex) => {
      return encodeSmartSessionSignature({
        mode,
        permissionId: permissionIds[permissionIdIndex],
        enableSessionData,
        signature: await signer.signMessage({
          message: { raw: userOpHash as Hex }
        })
      })
    }
  }) as SmartSessionModule
}
