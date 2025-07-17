use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct ContentAccount{
    creator:Pubkey,
    #[max_len(500)]
    prompt:String,
    #[max_len(50)]
    content_ipfs:String,
    #[max_len(50)]
    metadata_ipfs:String,
    generation_timeStamp:i64,
    is_minted:bool,
    mint_address_ata:Pubkey,

}