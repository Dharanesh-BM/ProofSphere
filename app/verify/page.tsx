"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function VerifyProof() {
  const [proofId, setProofId] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!proofId.trim()) {
      toast.error("Please enter a proof ID");
      return;
    }

    setVerificationStatus("loading");
    try {
      // TODO: Implement verification logic
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setVerificationStatus("success");
      toast.success("Proof verified successfully!");
    } catch (error) {
      setVerificationStatus("error");
      toast.error("Failed to verify proof");
      console.error(error);
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      <Card className="p-6">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Verify Proof</h1>
            <p className="text-muted-foreground">
              Enter the proof ID to verify its status
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="proofId">Proof ID</Label>
              <Input
                id="proofId"
                placeholder="Enter proof ID"
                value={proofId}
                onChange={(e) => setProofId(e.target.value)}
                disabled={verificationStatus === "loading"}
              />
            </div>

            <Button
              type="submit"
              disabled={verificationStatus === "loading"}
            >
              <Search className="mr-2 h-4 w-4" />
              {verificationStatus === "loading" ? "Verifying..." : "Verify Proof"}
            </Button>
          </form>

          {verificationStatus !== "idle" && (
            <Card className="p-4 mt-6">
              <div className="flex items-center space-x-4">
                {verificationStatus === "loading" && (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                )}
                {verificationStatus === "success" && (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                )}
                {verificationStatus === "error" && (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <h3 className="font-semibold">
                    {verificationStatus === "loading" && "Verifying proof..."}
                    {verificationStatus === "success" && "Proof Verified"}
                    {verificationStatus === "error" && "Verification Failed"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {verificationStatus === "success" &&
                      "The proof has been successfully verified on the Arbitrum network."}
                    {verificationStatus === "error" &&
                      "There was an error verifying the proof. Please try again."}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
}