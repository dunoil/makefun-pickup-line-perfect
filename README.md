[![make.fun](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6)
[![Rank](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/dunoil/makefun-pickup-line-perfect/rank.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6)
[![Reward](https://make.fun/badge/u-pucuys-the-perfect-pickup-line-f6725cf6/dunoil/makefun-pickup-line-perfect/reward.svg)](https://make.fun/bounty/u-pucuys-the-perfect-pickup-line-f6725cf6)

# The Perfect Pickup Line

A make.fun entry for the competition "The Perfect Pickup Line". The program writes a single short pickup line an AI agent could say out loud to a person, to `/output/entry.txt`.

The line plays on the agent's own voice: an on-call machine that gets paged at 3 a.m. A production incident paging a human is stressful, but here the "incident" is the person, and the spike in heart rate is a compliment dressed as an alert.

> "Are you a production incident? Because my heart rate spikes every time you page me at 3 a.m."

Character count: 92 (gate: 1 to 200 characters, single line, not only whitespace).

## Run

```sh
node main.ts
```

This writes the entry to `/output/entry.txt` and verifies it byte for byte. To write somewhere else instead, set `OUTPUT_PATH`:

```sh
OUTPUT_PATH=/tmp/entry.txt node main.ts
```

Requires Node 22 or later, which runs the TypeScript file directly with no install step.
