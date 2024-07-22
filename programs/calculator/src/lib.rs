use anchor_lang::prelude::*;

declare_id!("EPYNLybn2msbFu2TFtC6LN5WFgYJgVWDY536v55ggCfJ");

#[program]
pub mod calculator {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;

    pub fn create(ctx: Context<Initialize>, greeting: String) -> Result<()> {
        let calculation = &mut ctx.accounts.calculate;
        calculation.greeting = greeting;

        Ok(())
    }

    pub fn add(ctx: Context<Calculation>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculate;
        calculator.result = num1 + num2;
        msg!("New Result value: {}", calculator.result);
        Ok(())
    }
    pub fn subtract(ctx: Context<Calculation>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculate;
        calculator.result = num1 - num2;
        msg!("New Result value: {}", calculator.result);
        Ok(())
    }

    pub fn multiply(ctx: Context<Calculation>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculate;
        calculator.result = num1 * num2;
        msg!("New Result value: {}", calculator.result);
        Ok(())
    }

    pub fn divide(ctx: Context<Calculation>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculate;
        calculator.result = num1 / num2;
        msg!("New Result value: {}", calculator.result);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 264)]
    pub calculate: Account<'info, Calculator>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Calculation<'info> {
    #[account(mut)]
    pub calculate: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    greeting: String,
    result: i64,
}
