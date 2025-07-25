import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { MintCraftNftProgram } from "../target/types/mint_craft_nft_program";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import { amountToUiAmount } from "@solana/spl-token";

describe("mint-craft-nft-program", () => {
  // Configure the client to use the local cluster.
  const provider=anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.mintCraftNftProgram as Program<MintCraftNftProgram>;
  let  admin=Keypair.generate()
  let user=Keypair.generate()
  let userConfig:PublicKey
  let config:PublicKey;
  let platform_fees=5;
  const TOKEN_METADATA_PROGRAM="metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  const contentId=1;
  let contentAccount:PublicKey;
  let nftMetadata:PublicKey;
  let mint:PublicKey;
  let metadata:PublicKey;
  const nftName="chiiNft"
  const nftSymbol="cnft";
  const nftUrl="https://metadata.json"
  const id=1;
  const prompt="atmkbjf"
  const content_ipfs="randomcontentipfs"
  const metadata_ipfs="randomcontentipfs"
  let aiModel:PublicKey;
  let ai_model_royalty=5
  let content_type=1

  before(async()=>{
    //airdropping all the acccounts
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(admin.publicKey,2*LAMPORTS_PER_SOL)
    )
    
    await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(user.publicKey,2*LAMPORTS_PER_SOL)
    )

    
    //random aiModelAccount
    aiModel=Keypair.generate().publicKey

    config=PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId
    )[0]
    //seeds=[b"user_config",config.key().as_ref(),user.key().as_ref()],
    userConfig=PublicKey.findProgramAddressSync(
      [Buffer.from("user_config"),config.toBuffer(),user.publicKey.toBuffer()],
      program.programId
    )[0];
    
     contentAccount=PublicKey.findProgramAddressSync(
      [Buffer.from('content'),new anchor.BN(id).toArrayLike(Buffer,'le',8)],
      program.programId
     )[0]

  })
  it("initializeConfig",async()=>{
    await program.methods.initializeConfig(platform_fees).accounts({
      signer:admin.publicKey,
      config:config,
      systemProgram:SYSTEM_PROGRAM_ID
    }).signers([admin]).rpc()
  })
  it("initializeUser",async()=>{
    await program.methods.initializeUser().accounts({
      user:user.publicKey,
      userConfig:userConfig,
      config:config,
      systemProgram:SYSTEM_PROGRAM_ID
    }).signers([user]).rpc()
  })
  it("SubmitContent",async()=>{
    await program.methods.submitContent(new anchor.BN(id),prompt,content_ipfs,metadata_ipfs,aiModel,ai_model_royalty,new anchor.BN(content_type)).accounts({
      creator:user.publicKey,
      aiModelUsed:aiModel,
      contentAccount:contentAccount,
      systemProgram:SYSTEM_PROGRAM_ID
    }).signers([user]).rpc()
  })
  it("MintContentAsNft",async()=>{
    await program.methods.mintContentAsNft().accounts({

    })
  })
});



  //  #[account(
  //       mut,
  //       has_one = creator,
  //       seeds = [b"content", content_id.to_le_bytes().as_ref()],
  //       bump
  //   )]
  //   pub content_account: Account<'info, ContentAccount>,
  //   #[account(
  //       init,
  //       payer = creator,
  //       space = 8 + NftMetadata::INIT_SPACE,
  //       seeds = [b"nft_metadata", content_id.to_le_bytes().as_ref()],
  //       bump
  //   )]
  //   pub nft_metadata: Account<'info, NftMetadata>,
  //   #[account(
  //       init,
  //       payer = creator,
  //       seeds = [b"mint", content_id.to_le_bytes().as_ref()],
  //       bump,
  //       mint::authority = user_config,
  //       mint::decimals = 0,
  //       mint::freeze_authority = config
  //   )]
  //   // FIX 1: Use `Mint` directly, not `anchor_spl::token::Mint`.
  //   pub mint: Account<'info, Mint>,
  //   #[account(
  //       seeds = [b"user_config", config.key().as_ref(), creator.key().as_ref()],
  //       bump
  //   )]
  //   pub user_config: Account<'info, UserAccount>,
  //   #[account(
  //       seeds = [b"config".as_ref()],
  //       bump
  //   )]
  //   pub config: Account<'info, InitializeConfigAccount>,
  //   #[account(
  //       init,
  //       payer = creator,
  //       associated_token::mint = mint,
  //       associated_token::authority = creator
  //   )]
  //   // FIX 2: Use `TokenAccount` directly, not `anchor_spl::token::TokenAccount`.
  //   pub token_account: Account<'info, TokenAccount>,
    
  //   // FIX 3: Use a documentation comment `///` for the safety check.
  //   /// CHECK: This account is created and validated by the token-metadata program in the CPI.
  //   #[account(mut)]
  //   pub metadata: UncheckedAccount<'info>,
    
  //   #[account(mut)]
  //   pub creator: Signer<'info>,
  //   pub system_program: Program<'info, System>,
  //   pub rent: Sysvar<'info, Rent>,
  //   pub token_program: Program<'info, Token>,
  //   pub associated_token_program: Program<'info, AssociatedToken>,
    
  //   /// CHECK: This is the official token metadata program address.
  //   pub token_metadata_program: UncheckedAccount<'info>,