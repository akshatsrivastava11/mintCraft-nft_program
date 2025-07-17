pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("BrrVsyYH1Ght4cZwZYuWNY7659skft5wYHYrxPndgKQv");

#[program]
pub mod mint_craft_nft_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        initializeConfig::handler(ctx)
    }
}
