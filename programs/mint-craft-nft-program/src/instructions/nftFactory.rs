use anchor_lang::prelude::*;
use anchor_spl::{metadata::{mpl_token_metadata::accounts::{MasterEdition, }, MasterEditionAccount, Metadata, MetadataAccount}, token::{Mint, Token, TokenAccount}};

use crate::{InitializeConfigAccount, UserAccount};
#[derive(Accounts)]
pub struct NftFactory<'info>{
    #[account(mut)]
    pub user:Signer<'info>,
    #[account(
        init,
        payer=user,
        mint::token_program=token_program,
        mint::decimals=0,
        mint::authority=config,
        mint::freeze_authority=config
    )]
    pub mint:Account<'info,Mint>,
    #[account(
        init,
        payer=user,
        associated_token::mint=mint,
        associated_token::authority=user,
    )]
    pub user_mint_ata:Account<'info,TokenAccount>,
    pub metadata:Account<'info,MetadataAccount>,
    pub config:Account<'info,InitializeConfigAccount>,
    #[account(
        seeds=[b"user_config",config.key().as_ref(),user.key().as_ref()],
        bump
    )]
    pub user_config:Account<'info,UserAccount>,
    pub master_edition:Account<'info,MasterEditionAccount>,
    pub token_program:Program<'info,Token>,
    pub system_program:Program<'info,System>,
    pub metadata_program:Program<'info,Metadata>
}