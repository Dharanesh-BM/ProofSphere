import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const VERIFIER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_VERIFIER_CONTRACT_ADDRESS;
const ARBITRUM_RPC_URL = process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL;

export async function POST(req: Request) {
  try {
    const { proofData, publicSignals } = await req.json();

    // Initialize provider and contract
    const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC_URL);
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error('Private key not configured');
    
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // TODO: Add contract ABI
    const contract = new ethers.Contract(
      VERIFIER_CONTRACT_ADDRESS!,
      [],
      wallet
    );

    // Generate proof ID
    const proofId = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify({ proofData, publicSignals }))
    );

    // Verify proof using zkVerify
    // TODO: Implement zkVerify integration
    const isValid = true; // Placeholder

    // Submit to contract
    const tx = await contract.verifyProof(proofId, isValid);
    await tx.wait();

    return NextResponse.json({
      success: true,
      proofId: proofId,
      txHash: tx.hash,
    });
  } catch (error) {
    console.error('Error processing proof:', error);
    return NextResponse.json(
      { error: 'Failed to process proof' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const proofId = searchParams.get('proofId');

    if (!proofId) {
      return NextResponse.json(
        { error: 'Proof ID is required' },
        { status: 400 }
      );
    }

    const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC_URL);
    
    // TODO: Add contract ABI
    const contract = new ethers.Contract(
      VERIFIER_CONTRACT_ADDRESS!,
      [],
      provider
    );

    const status = await contract.getProofStatus(proofId);

    return NextResponse.json({
      success: true,
      status,
    });
  } catch (error) {
    console.error('Error fetching proof status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proof status' },
      { status: 500 }
    );
  }
}