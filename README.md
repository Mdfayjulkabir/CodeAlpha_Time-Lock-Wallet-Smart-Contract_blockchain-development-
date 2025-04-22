# TimeLockWallet Smart Contract

A wallet contract that locks ETH for a specific period and prevents withdrawal before the unlock time.

## Features

- Locks deposited ETH for a set time (in minutes)
- Prevents early withdrawal
- Uses Solidity's `block.timestamp` for time-based logic

## Setup

```bash
npm install
```

## Test

```bash
npx hardhat test
```

## Deploy (Local)

```bash
npx hardhat run scripts/deploy.js --network localhost
```
