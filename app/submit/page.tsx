"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useAccount } from "wagmi";

export default function SubmitProof() {
  const { isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [publicFile, setPublicFile] = useState<File | null>(null);

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
      // TODO: Implement proof submission logic
      toast.success("Proof submitted successfully!");
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
            <h1 className="text-3xl font-bold">Submit Proof</h1>
            <p className="text-muted-foreground">
              Upload your proof and public signals files for verification
            </p>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="proof">Proof File (proof.json)</Label>
              <Input
                id="proof"
                type="file"
                accept=".json"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="public">Public Signals File (public.json)</Label>
              <Input
                id="public"
                type="file"
                accept=".json"
                onChange={(e) => setPublicFile(e.target.files?.[0] || null)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !isConnected}>
            <Upload className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Proof"}
          </Button>
        </form>
      </Card>
    </div>
  );
}