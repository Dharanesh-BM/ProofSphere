"use client";

import { Button } from "@/components/ui/button";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { CircuitBoard } from "lucide-react";

export function Navbar() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CircuitBoard className="h-6 w-6" />
            <span className="font-bold">ProfitSphere</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/submit" className="transition-colors hover:text-foreground/80">
              Submit Proof
            </Link>
            <Link href="/verify" className="transition-colors hover:text-foreground/80">
              Verify
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => open()}
          >
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  );
}