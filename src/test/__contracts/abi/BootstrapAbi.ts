export const BootstrapAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "defaultValidator",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "initData",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "CanNotRemoveLastValidator",
    type: "error"
  },
  {
    inputs: [],
    name: "DefaultValidatorAlreadyInstalled",
    type: "error"
  },
  {
    inputs: [],
    name: "EmergencyUninstallSigError",
    type: "error"
  },
  {
    inputs: [],
    name: "EnableModeSigError",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4"
      }
    ],
    name: "FallbackAlreadyInstalledForSelector",
    type: "error"
  },
  {
    inputs: [],
    name: "FallbackCallTypeInvalid",
    type: "error"
  },
  {
    inputs: [],
    name: "FallbackHandlerUninstallFailed",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4"
      }
    ],
    name: "FallbackNotInstalledForSelector",
    type: "error"
  },
  {
    inputs: [],
    name: "FallbackSelectorForbidden",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "currentHook",
        type: "address"
      }
    ],
    name: "HookAlreadyInstalled",
    type: "error"
  },
  {
    inputs: [],
    name: "HookPostCheckFailed",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "hookType",
        type: "uint256"
      }
    ],
    name: "InvalidHookType",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidInput",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "InvalidModule",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "moduleTypeId",
        type: "uint256"
      }
    ],
    name: "InvalidModuleTypeId",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "LinkedList_AlreadyInitialized",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entry",
        type: "address"
      }
    ],
    name: "LinkedList_EntryAlreadyInList",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "entry",
        type: "address"
      }
    ],
    name: "LinkedList_InvalidEntry",
    type: "error"
  },
  {
    inputs: [],
    name: "LinkedList_InvalidPage",
    type: "error"
  },
  {
    inputs: [],
    name: "MismatchModuleTypeId",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4"
      }
    ],
    name: "MissingFallbackHandler",
    type: "error"
  },
  {
    inputs: [],
    name: "ModuleAddressCanNotBeZero",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "moduleTypeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ModuleAlreadyInstalled",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "moduleTypeId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ModuleNotInstalled",
    type: "error"
  },
  {
    inputs: [],
    name: "NoValidatorInstalled",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "currentPreValidationHook",
        type: "address"
      }
    ],
    name: "PrevalidationHookAlreadyInstalled",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "UnauthorizedOperation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "CallType",
        name: "callType",
        type: "bytes1"
      }
    ],
    name: "UnsupportedCallType",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ValidatorNotInstalled",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "executor",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "ExecutorUninstallFailed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "hook",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "HookUninstallFailed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "moduleTypeId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ModuleInstalled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "moduleTypeId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "module",
        type: "address"
      }
    ],
    name: "ModuleUninstalled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "hook",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "PreValidationHookUninstallFailed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "validator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "ValidatorUninstallFailed",
    type: "event"
  },
  {
    stateMutability: "payable",
    type: "fallback"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getActiveHook",
    outputs: [
      {
        internalType: "address",
        name: "hook",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cursor",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256"
      }
    ],
    name: "getExecutorsPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "array",
        type: "address[]"
      },
      {
        internalType: "address",
        name: "next",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4"
      }
    ],
    name: "getFallbackHandlerBySelector",
    outputs: [
      {
        internalType: "CallType",
        name: "",
        type: "bytes1"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "cursor",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256"
      }
    ],
    name: "getValidatorsPaginated",
    outputs: [
      {
        internalType: "address[]",
        name: "array",
        type: "address[]"
      },
      {
        internalType: "address",
        name: "next",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "validators",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "executors",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig",
        name: "hook",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "fallbacks",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "hookType",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapPreValidationHookConfig[]",
        name: "preValidationHooks",
        type: "tuple[]"
      }
    ],
    name: "init",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "validators",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig",
        name: "hook",
        type: "tuple"
      }
    ],
    name: "initScoped",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "initWithDefaultValidator",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "defaultValidatorInitData",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "validators",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "executors",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig",
        name: "hook",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapConfig[]",
        name: "fallbacks",
        type: "tuple[]"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "hookType",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "module",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct BootstrapPreValidationHookConfig[]",
        name: "preValidationHooks",
        type: "tuple[]"
      }
    ],
    name: "initWithDefaultValidatorAndOtherModules",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "validator",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "initWithSingleValidator",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
] as const
