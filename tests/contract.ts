import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Contract } from "../target/types/contract";
import { PythSolanaReceiver } from "@pythnetwork/pyth-solana-receiver";

describe("contract", () => {
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.contract as Program<Contract>;
  const pythSolanaReciever = new PythSolanaReceiver({
    connection,
    wallet,
  });
  const SOLANA_PRICE_FEED_ID =
    "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";

  const solanaPriceFeedAccount = pythSolanaReciever
    .getPriceFeedAccountAddress(0, SOLANA_PRICE_FEED_ID)
    .toBase58();
  const [collateralAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("collateral"), wallet.publicKey.toBuffer()],
    program.programId
  );

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initializeConfig()
      .accounts({})
      .rpc({ skipPreflight: true, commitment: "confirmed" });
    console.log("Your transaction signature", tx);
  });
  it("Deposit collateral and mint token", async () => {
    const amountCollateral = 1_000_000_000;
    const amountToMint = 1_000_000;
    const tx = await program.methods
      .depositCollateralAndMintTokens(
        new anchor.BN(amountCollateral),
        new anchor.BN(amountToMint)
      )
      .accounts({
        priceUpdate: solanaPriceFeedAccount,
      })
      .rpc({
        skipPreflight: true,
        commitment: "confirmed",
      });
    console.log("Your transaction signature", tx);
  });
  it("Withdraw collateral and burn token", async () => {
    const amountCollateral = 500_000_000;
    const amountToBurn = 500_000;
    const tx = await program.methods
      .redeemCollateralAndBurnTokens(
        new anchor.BN(amountCollateral),
        new anchor.BN(amountToBurn)
      )
      .accounts({
        priceUpdate: solanaPriceFeedAccount,
      })
      .rpc({
        skipPreflight: true,
        commitment: "confirmed",
      });
    console.log("Your transaction signature", tx);
  });
  it("Update config", async () => {
    const tx = await program.methods.updateConfig(new anchor.BN(100)).rpc({
      skipPreflight: true,
      commitment: "confirmed",
    });
    console.log("Your transaction signature", tx);
  });
});
