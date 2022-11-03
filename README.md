# Ethereum's tokens rate monitor

Util for monitoring changes in token rates using ethereum oracles.

## Run
To use, you need to install [Node.js](https://nodejs.org)
and get API key for [Alchemy](https://www.alchemy.com)

1. Put your Alchemy API key in [config/config.json](config/config.json)
2. `npm install`
3. `npm run start`

## Cryptocurrency Pairs
You can add oracle for any pair in [config/config.json](config/config.json).
By default, **ETH/USD**, **USDC/ETH**, **LINK/ETH** and **USDT/ETH** are listed there.

## Output example
```
ETH/USD         Nov 3, 2022, 9:55 PM    latest: 1545.54182432
USDT/ETH        Nov 3, 2022, 5:22 PM    latest: 0.000647261759128008
USDC/ETH        Nov 3, 2022, 4:48 AM    latest: 0.000648742000461584
LINK/ETH        Nov 3, 2022, 7:14 PM    latest: 0.0051036283
LINK/ETH        Nov 3, 2022, 10:42 PM   update: 0.0050523107
ETH/USD         Nov 3, 2022, 10:55 PM   update: 1542.02
```