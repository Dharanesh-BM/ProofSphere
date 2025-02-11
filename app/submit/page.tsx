"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import { VERIFIER_ABI } from "@/lib/contracts";

const VERIFIER_ADDRESS = process.env.NEXT_PUBLIC_VERIFIER_CONTRACT_ADDRESS as `0x${string}`;

type VerifierType = "groth16" | "plonk" | "stark";

export default function SubmitProof() {
  const { isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [publicFile, setPublicFile] = useState<File | null>(null);
  const [verifierType, setVerifierType] = useState<VerifierType>("groth16");

  const { write: verifyProof, data: verifyData } = useContractWrite({
    address: VERIFIER_ADDRESS,
    abi: VERIFIER_ABI,
    functionName: 'verifyProof',
  });

  const { isLoading: isVerifying, isSuccess: isVerified } = useWaitForTransaction({
    hash: verifyData?.hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!proofFile || !publicFile) {
      toast.error("Please upload both proof and public signals files");
      return;
    }

    setIsSubmitting(true);
    try {
      const [proofData, publicSignals] = await Promise.all([
        proofFile.text(),
        publicFile.text(),
      ]);

      const proof = JSON.parse(proofData);
      const signals = JSON.parse(publicSignals);

      // Convert proof data for contract
      const verifierIndex = { groth16: 0, plonk: 1, stark: 2 }[verifierType];
      
      verifyProof({
        args: [
          proof,
          signals,
          verifierIndex,
        ],
      });

      toast.success("Proof submitted for verification!");
    } catch (error) {
      toast.error("Failed to submit proof");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Submit Zero-Knowledge Proof</h1>
            <p className="text-muted-foreground">
              Upload your proof and public signals files for verification on Arbitrum using zkVerify
            </p>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="verifier">Verifier Type</Label>
              <Select
                value={verifierType}
                onValueChange={(value) => setVerifierType(value as VerifierType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verifier type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="groth16">Groth16</SelectItem>
                  <SelectItem value="plonk">PLONK</SelectItem>
                  <SelectItem value="stark">STARK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof">Proof File (proof.json)</Label>
              <Input
                id="proof"
                type="file"
                accept=".json"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                disabled={isSubmitting || isVerifying}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="public">Public Signals File (public.json)</Label>
              <Input
                id="public"
                type="file"
                accept=".json"
                onChange={(e) => setPublicFile(e.target.files?.[0] || null)}
                disabled={isSubmitting || isVerifying}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              type="submit" 
              disabled={isSubmitting || isVerifying || !isConnected}
              className="flex-1"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Verifying on Chain...
                </>
              ) : isSubmitting ? (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Proof
                </>
              )}
            </Button>
          </div>

          {isVerified && (
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <FileCheck className="h-5 w-5 text-green-500" />
              <p className="text-sm text-green-700 dark:text-green-300">
                Proof verified successfully on Arbitrum! Transaction hash: {verifyData?.hash}
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Important Notes</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Proof verification is performed on-chain using zkVerify integration</li>
              <li>Supported formats: Groth16, PLONK, and STARK proofs</li>
              <li>Make sure your proof and public signals files are in valid JSON format</li>
              <li>The verification process may take a few minutes to complete</li>
            </ul>
          </div>
        </form>
      </Card>
    </div>
  );
}