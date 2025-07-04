# Stablecoin Solana Program

A Solana-based stablecoin smart contract built with [Anchor](https://book.anchor-lang.com/) and TypeScript test suite.

## Program Instructions

This Solana program exposes the following instructions:

### 1. `initialize_config`

**Purpose:**  
Initializes the protocol configuration and mints the stablecoin.

**Accounts:**

- `authority` (signer): The admin authority.
- `config_account` (PDA): Stores protocol config.
- `mint_account` (PDA): The stablecoin mint.
- `token_program`: SPL Token-2022 program.
- `system_program`: System program.

**Args:**  
_None_

---

### 2. `update_config`

**Purpose:**  
Updates protocol configuration parameters (e.g., minimum health factor).

**Accounts:**

- `config_account` (PDA, mutable): Protocol config.

**Args:**

- `min_health_factor` (`u64`): New minimum health factor.

---

### 3. `deposit_collateral_and_mint_tokens`

**Purpose:**  
Deposit SOL as collateral and mint stablecoins.

**Accounts:**

- `depositor` (signer): User depositing collateral.
- `config_account` (PDA): Protocol config.
- `mint_account` (PDA): Stablecoin mint.
- `collateral_account` (PDA, mutable): User's collateral record.
- `sol_account` (PDA, mutable): User's SOL vault.
- `token_account` (mutable): User's token account to receive stablecoins.
- `token_program`: SPL Token-2022 program.
- `associated_token_program`: Associated Token program.
- `system_program`: System program.
- `price_update`: Pyth price feed.

**Args:**

- `amount_collateral` (`u64`): Amount of SOL to deposit.
- `amount_to_mint` (`u64`): Amount of stablecoin to mint.

---

### 4. `redeem_collateral_and_burn_tokens`

**Purpose:**  
Burn stablecoins and redeem underlying SOL collateral.

**Accounts:**

- `depositor` (signer): User redeeming collateral.
- `price_update`: Pyth price feed.
- `config_account` (PDA, mutable): Protocol config.
- `collateral_account` (PDA, mutable): User's collateral record.
- `sol_account` (mutable): User's SOL vault.
- `mint_account` (mutable): Stablecoin mint.
- `token_account` (mutable): User's token account (burn source).
- `token_program`: SPL Token-2022 program.
- `system_program`: System program.

**Args:**

- `amount_collateral` (`u64`): Amount of SOL to redeem.
- `amount_burn` (`u64`): Amount of stablecoin to burn.

---

### 5. `liquidate`

**Purpose:**  
Liquidate undercollateralized positions.

**Accounts:**

- `liquidator` (signer): The liquidator.
- `price_update`: Pyth price feed.
- `config_account` (PDA, mutable): Protocol config.
- `collateral_account` (PDA, mutable): User's collateral record.
- `sol_account` (mutable): User's SOL vault.
- `mint_account` (mutable): Stablecoin mint.
- `token_account` (mutable): Liquidator's token account.
- `token_program`: SPL Token-2022 program.
- `system_program`: System program.

**Args:**

- `amount_to_liquidate` (`u64`): Amount of collateral to seize.
- `amount_to_burn` (`u64`): Amount of stablecoin to burn.

---

For more details on account layouts and instruction arguments, see the [IDL file](target/idl/contract.json)

## Project Structure

```
contract/
├── Anchor.toml
├── Cargo.toml
├── package.json
├── README.md
├── programs/
│   └── contract/           # Rust smart contract source code
├── migrations/
│   └── deploy.ts           # Anchor deployment script
├── tests/
│   └── contract.ts         # TypeScript tests
├── target/                 # Build output (IDL, binaries, etc.)
└── .anchor/                # Anchor local validator/test artifacts
```

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Anchor CLI](https://book.anchor-lang.com/getting_started/installation.html)

## Setup

1. **Install dependencies**

   ```
   cd contract
   yarn install
   # or
   npm install
   ```

2. **Build the smart contract**

   ```
   anchor build
   ```

3. **Run local validator (for testing)**

   ```
   anchor test --skip-build
   ```

4. **Run tests**

   ```
   anchor test
   ```

## Scripts

- `yarn lint` / `npm run lint` — Check code formatting with Prettier.
- `yarn lint:fix` / `npm run lint:fix` — Auto-fix formatting issues.

## Key Dependencies

- [@coral-xyz/anchor](https://www.npmjs.com/package/@coral-xyz/anchor) — Solana smart contract framework
- [@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js) — Solana JavaScript API
- [@pythnetwork/pyth-solana-receiver](https://www.npmjs.com/package/@pythnetwork/pyth-solana-receiver) — Pyth price feeds (oracle)
- [Mocha](https://mochajs.org/) & [Chai](https://www.chaijs.com/) — Testing framework

## Program Overview

- **Rust smart contract**: Located in `programs/contract/`, implements stablecoin logic (minting, burning, collateral management, etc).
- **TypeScript tests**: In `tests/contract.ts`, using Anchor's Mocha test runner.
- **Deployment**: Managed via Anchor CLI and `migrations/deploy.ts`.

## Development

- Edit Rust code in `programs/contract/`.
- Edit tests in `tests/contract.ts`.
- Use `anchor build` and `anchor test` to build and test locally.
- The Anchor.toml configures cluster, wallet, and deployment settings.

## License

ISC

---

**Note:** This project is under active development. See [Anchor documentation](https://book.anchor-lang.com/) for more details on Solana program
