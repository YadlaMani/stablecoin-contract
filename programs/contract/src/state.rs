use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace,Debug)]
pub struct Collateral{
    pub depositor:Pubkey,
    pub sol_account:Pubkey,
    pub token_account:Pubkey,
    pub lamport_balance:u64,
    pub amount_minted:u64,
    pub bump:u8,
    pub bump_sol_account:u8,
    pub is_initialized:bool,
}
#[account]
#[derive(InitSpace,Debug)]
pub struct Config{
    pub authority:Pubkey,
    pub mint_account:Pubkey,
    pub liquidation_threshold:u64,
    pub liquidation_bonus:u64,
    pub min_health_factor:u64,
    pub bump:u8,
    pub bump_mint_account:u8
}