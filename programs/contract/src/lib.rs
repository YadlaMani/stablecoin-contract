use anchor_lang::prelude::*;
use state::*;
mod state;
use constants::*;

mod constants;
use instructions::*;
mod instructions;
use errors::*;
mod errors;

declare_id!("8FdSiHdm2Tk5VRoYmk2THpb7STv25rBW5LGTM894P8Cd");

#[program]
pub mod contract {
    use super::*;

   pub fn initialize_config(ctx:Context<InitializeConfig>) -> Result<()> {
       process_initialize_config(ctx)
    }
    pub fn update_config(ctx:Context<UpdateConfig>, min_health_factor:u64) -> Result<()> {
        process_update_config(ctx, min_health_factor)
    }
    pub fn deposit_collateral_and_mint_tokens(
        ctx:Context<DepositCollateralAndMintTokens>,
        amount_collateral:u64,
        amount_to_mint:u64
    ) -> Result<()> {
        process_deposit_collateral_and_mint_tokens(ctx, amount_collateral, amount_to_mint)
    }
    pub fn redeem_collateral_and_burn_tokens(
        ctx:Context<RedeemCollateralAndBurnTokens>,
        amount_collateral:u64,
        amount_burn:u64
    ) -> Result<()> {
        process_redeem_collateral_and_burn_tokens(ctx, amount_collateral, amount_burn)
    }
    pub fn liquidate(
        ctx:Context<Liquidate>,
        amount_to_liquidate:u64,
        amount_to_burn:u64
    ) -> Result<()> {
        process_liquidate(ctx, amount_to_liquidate, amount_to_burn)
    }
    
}




