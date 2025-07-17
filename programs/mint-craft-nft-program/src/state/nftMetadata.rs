use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct NftMetadata{
    content_id:Pubkey,
    mint:Pubkey,
    #[max_len(50)]
    name:String,
    #[max_len(10)]
    symbol:String,
    #[max_len(100)]
    metadata_uri:String,
    creator_royalty:u16,
    is_mutable:bool,
    verified:bool
}