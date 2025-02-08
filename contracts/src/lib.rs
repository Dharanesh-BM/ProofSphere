use stylus_sdk::{
    alloy_primitives::Address,
    prelude::*,
    stylus_proc::entrypoint,
};

#[entrypoint]
pub struct ProofVerifier {
    owner: StorageAddress,
    proofs: StorageMap<U256, bool>,
}

#[external]
impl ProofVerifier {
    pub fn constructor(owner: Address) -> Self {
        Self {
            owner: StorageAddress::new(owner),
            proofs: StorageMap::new(),
        }
    }

    pub fn verify_proof(&mut self, proof_id: U256, is_valid: bool) -> Result<bool, Vec<u8>> {
        if msg::sender() != self.owner.get() {
            return Err("Not authorized".as_bytes().to_vec());
        }
        self.proofs.insert(proof_id, is_valid);
        Ok(is_valid)
    }

    pub fn get_proof_status(&self, proof_id: U256) -> Result<bool, Vec<u8>> {
        match self.proofs.get(&proof_id) {
            Some(status) => Ok(*status),
            None => Err("Proof not found".as_bytes().to_vec()),
        }
    }
}