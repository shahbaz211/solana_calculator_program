import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { BN } from "bn.js";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.Calculator as Program<Calculator>;
  const calculatorPair = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const text = "Hello";
    // Add your test here.
    const tx = await program.methods
      .create(text)
      .accounts({
        calculate: calculatorPair.publicKey,
        user: provider.wallet.publicKey,
        system: anchor.web3.SystemProgram.programId,
      })
      .signers([calculatorPair])
      .rpc();
    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    console.log(account.greeting);
    console.log(account.result);

    const num1 = new anchor.BN(20);
    const num2 = new anchor.BN(35);

    await program.methods
      .add(num1, num2)
      .accounts({
        calculate: calculatorPair.publicKey,
      })
      .rpc();

    const account2 = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    console.log(account2.result.toNumber());

    const num3 = new anchor.BN(50);
    const num4 = new anchor.BN(35);

    await program.methods
      .subtract(num3, num4)
      .accounts({
        calculate: calculatorPair.publicKey,
      })
      .rpc();

    const account3 = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    console.log(account3.result.toNumber());

    const num5 = new anchor.BN(5);
    const num6 = new anchor.BN(35);

    await program.methods
      .multiply(num5, num6)
      .accounts({
        calculate: calculatorPair.publicKey,
      })
      .rpc();

    const account4 = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    console.log(account4.result.toNumber());

    const num7 = new anchor.BN(50);
    const num8 = new anchor.BN(10);

    await program.methods
      .divide(num7, num8)
      .accounts({
        calculate: calculatorPair.publicKey,
      })
      .rpc();

    const account5 = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    console.log(account5.result.toNumber());
  });
});
