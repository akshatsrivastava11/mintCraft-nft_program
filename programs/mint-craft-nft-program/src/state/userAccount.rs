use anchor_lang::prelude::*;

#[account]
pub struct UserAccount{
    user:Pubkey,
    nft_minted:u64,
    bump:u64
}