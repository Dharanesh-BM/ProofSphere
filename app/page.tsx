import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Secure Proof Verification on Arbitrum
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Leverage zero-knowledge proofs for secure and private verification using zkVerify integration
            </p>
            <div className="space-x-4">
              <Link href="/submit">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="p-6">
              <Shield className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Secure Verification</h3>
              <p className="text-muted-foreground">
                Zero-knowledge proof verification ensures complete privacy while maintaining security
              </p>
            </Card>
            <Card className="p-6">
              <Lock className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data remains private with zkVerify integration and secure proof submission
              </p>
            </Card>
            <Card className="p-6">
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built on Arbitrum for fast, cost-effective proof verification
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}