use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct InitializeConfig{
    platform_fees:u8,
    bump:u8
}