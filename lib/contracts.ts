export const VERIFIER_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "zk_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "proof_id",
        "type": "bytes32"
      }
    ],
    "name": "getProofStatus",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "is_valid",
            "type": "bool"
          },
          {
            "internalType": "uint64",
            "name": "timestamp",
            "type": "uint64"
          },
          {
            "internalType": "uint8",
            "name": "verifier_type",
            "type": "uint8"
          },
          {
            "internalType": "uint256[]",
            "name": "public_inputs",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct ProofData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "proof_id",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "proof_data",
        "type": "bytes"
      },
      {
        "internalType": "uint256[]",
        "name": "public_inputs",
        "type": "uint256[]"
      },
      {
        "internalType": "uint8",
        "name": "verifier_type",
        "type": "uint8"
      }
    ],
    "name": "verifyProof",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];