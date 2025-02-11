use stylus_sdk::prelude::*;
use serde::{Serialize, Deserialize};
use serde_json;
use reqwest::blocking::Client;  // Use async if preferred

#[derive(Serialize)]
struct ZkVerifyRequest {
    verifier: Address,
    proof: Vec<u8>,
    inputs: Vec<U256>,
}

#[derive(Deserialize)]
struct ZkVerifyResponse {
    verified: bool,
    error: Option<String>,
}

impl Contract {
    fn verify_groth16(&self, verifier: Address, proof: &[u8], inputs: &[U256]) -> Result<bool, Vec<u8>> {
        let client = Client::new();
        let request_body = ZkVerifyRequest {
            verifier,
            proof: proof.to_vec(),
            inputs: inputs.to_vec(),
        };

        let response = client.post("https://api.zkverify.io/verify/groth16")
            .json(&request_body)
            .send();

        match response {
            Ok(resp) => {
                let parsed: ZkVerifyResponse = resp.json().unwrap_or_else(|_| ZkVerifyResponse {
                    verified: false,
                    error: Some("Failed to parse response".to_string()),
                });

                if parsed.verified {
                    Ok(true)
                } else {
                    Err(parsed.error.unwrap_or_else(|| "Verification failed".to_string()).into_bytes())
                }
            }
            Err(_) => Err("Network request failed".as_bytes().to_vec()),
        }
    }
}
