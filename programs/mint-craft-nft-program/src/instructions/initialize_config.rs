use anchor_lang::prelude::*;

use crate::{initialize_config, InitializeConfigAccount};

#[derive(Accounts)]
pub struct InitializeConfig<'info>{
    #[account(mut)]
    pub signer:Signer<'info>,
    #[account(
        init,
        payer=signer,
        space=8+InitializeConfigAccount::INIT_SPACE,
        seeds=[b"config".as_ref()],
        bump
    )]
    pub config:Account<'info,InitializeConfigAccount>,
    pub system_program:Program<'info,System>
}

impl<'info>InitializeConfig<'info>{
    pub fn initialize_config(&mut self,platform_fees:u8,bumps:InitializeConfigBumps)->Result<()>{
        self.config.set_inner(InitializeConfigAccount{
            platform_fees,
            bump:bumps.config
        });
        Ok(())
    }
}