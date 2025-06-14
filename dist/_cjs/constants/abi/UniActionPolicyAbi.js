"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniActionPolicyAbi = void 0;
exports.UniActionPolicyAbi = [
    {
        components: [
            {
                name: "valueLimitPerUse",
                type: "uint256"
            },
            {
                components: [
                    {
                        name: "length",
                        type: "uint256"
                    },
                    {
                        components: [
                            {
                                name: "condition",
                                type: "uint8"
                            },
                            {
                                name: "offset",
                                type: "uint64"
                            },
                            {
                                name: "isLimited",
                                type: "bool"
                            },
                            {
                                name: "ref",
                                type: "bytes32"
                            },
                            {
                                components: [
                                    {
                                        name: "limit",
                                        type: "uint256"
                                    },
                                    {
                                        name: "used",
                                        type: "uint256"
                                    }
                                ],
                                name: "usage",
                                type: "tuple"
                            }
                        ],
                        name: "rules",
                        type: "tuple[16]"
                    }
                ],
                name: "paramRules",
                type: "tuple"
            }
        ],
        name: "ActionConfig",
        type: "tuple"
    }
];
//# sourceMappingURL=UniActionPolicyAbi.js.map