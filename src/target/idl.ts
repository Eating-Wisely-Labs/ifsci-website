/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/airdrop.json`.
 */
export type Airdrop = {
  address: 'DBhPrc1EMzmWZD2aR9WBFzx3Rusa5fgpFbdHRC5kVeJe'
  metadata: {
    name: 'airdrop'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'claim'
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'claimAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 101, 115]
              },
              {
                kind: 'account'
                path: 'recipient'
              }
            ]
          }
        },
        {
          name: 'recipient'
          writable: true
          signer: true
        },
        {
          name: 'vault'
          writable: true
        },
        {
          name: 'recipientToken'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'recipient'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                kind: 'account'
                path: 'mint'
              }
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          name: 'mint'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'rent'
          address: 'SysvarRent111111111111111111111111111111111'
        }
      ]
      args: []
    },
    {
      name: 'close'
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'claimAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 101, 115]
              },
              {
                kind: 'account'
                path: 'recipient'
              }
            ]
          }
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'recipient'
        }
      ]
      args: []
    },
    {
      name: 'initialize'
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'manager'
        },
        {
          name: 'mint'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'startTime'
          type: 'i64'
        },
        {
          name: 'endTime'
          type: 'i64'
        }
      ]
    },
    {
      name: 'snapshot'
      discriminator: [144, 236, 6, 133, 233, 160, 21, 94]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'claimAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 101, 115]
              },
              {
                kind: 'account'
                path: 'recipient'
              }
            ]
          }
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'recipient'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        }
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'claimState'
      discriminator: [71, 73, 19, 83, 53, 228, 242, 53]
    },
    {
      name: 'config'
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130]
    }
  ]
  errors: [
    {
      code: 6000
      name: 'alreadyClaimed'
      msg: 'Already claimed'
    },
    {
      code: 6001
      name: 'unauthorized'
      msg: 'unauthorized'
    },
    {
      code: 6002
      name: 'notStarted'
      msg: 'Not Started'
    }
  ]
  types: [
    {
      name: 'claimState'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'amount'
            type: 'u64'
          },
          {
            name: 'claimed'
            type: 'bool'
          },
          {
            name: 'bump'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'config'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'manager'
            type: 'pubkey'
          },
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'bump'
            type: 'u8'
          },
          {
            name: 'startTime'
            type: 'i64'
          },
          {
            name: 'endTime'
            type: 'i64'
          },
          {
            name: 'isCreated'
            type: 'bool'
          }
        ]
      }
    }
  ]
}

export const IDL = {
  address: 'DBhPrc1EMzmWZD2aR9WBFzx3Rusa5fgpFbdHRC5kVeJe',
  metadata: {
    name: 'airdrop',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor'
  },
  instructions: [
    {
      name: 'claim',
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'claim_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 101, 115]
              },
              {
                kind: 'account',
                path: 'recipient'
              }
            ]
          }
        },
        {
          name: 'recipient',
          writable: true,
          signer: true
        },
        {
          name: 'vault',
          writable: true
        },
        {
          name: 'recipient_token',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'recipient'
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169
                ]
              },
              {
                kind: 'account',
                path: 'mint'
              }
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89
              ]
            }
          }
        },
        {
          name: 'mint'
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111'
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111'
        }
      ],
      args: []
    },
    {
      name: 'close',
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'claim_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 101, 115]
              },
              {
                kind: 'account',
                path: 'recipient'
              }
            ]
          }
        },
        {
          name: 'payer',
          writable: true,
          signer: true
        },
        {
          name: 'recipient'
        }
      ],
      args: []
    },
    {
      name: 'initialize',
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'payer',
          writable: true,
          signer: true
        },
        {
          name: 'manager'
        },
        {
          name: 'mint'
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111'
        }
      ],
      args: [
        {
          name: 'start_time',
          type: 'i64'
        },
        {
          name: 'end_time',
          type: 'i64'
        }
      ]
    },
    {
      name: 'snapshot',
      discriminator: [144, 236, 6, 133, 233, 160, 21, 94],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103]
              }
            ]
          }
        },
        {
          name: 'claim_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 101, 115]
              },
              {
                kind: 'account',
                path: 'recipient'
              }
            ]
          }
        },
        {
          name: 'payer',
          writable: true,
          signer: true
        },
        {
          name: 'recipient'
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111'
        }
      ],
      args: [
        {
          name: 'amount',
          type: 'u64'
        }
      ]
    }
  ],
  accounts: [
    {
      name: 'ClaimState',
      discriminator: [71, 73, 19, 83, 53, 228, 242, 53]
    },
    {
      name: 'Config',
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130]
    }
  ],
  errors: [
    {
      code: 6000,
      name: 'AlreadyClaimed',
      msg: 'Already claimed'
    },
    {
      code: 6001,
      name: 'Unauthorized',
      msg: 'Unauthorized'
    },
    {
      code: 6002,
      name: 'NotStarted',
      msg: 'Not Started'
    }
  ],
  types: [
    {
      name: 'ClaimState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'amount',
            type: 'u64'
          },
          {
            name: 'claimed',
            type: 'bool'
          },
          {
            name: 'bump',
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'Config',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'manager',
            type: 'pubkey'
          },
          {
            name: 'mint',
            type: 'pubkey'
          },
          {
            name: 'bump',
            type: 'u8'
          },
          {
            name: 'start_time',
            type: 'i64'
          },
          {
            name: 'end_time',
            type: 'i64'
          },
          {
            name: 'is_created',
            type: 'bool'
          }
        ]
      }
    }
  ]
}
