import { Alchemy, Network } from 'alchemy-sdk';
import { readFileSync } from 'fs'
import Web3 from 'web3'

import { formatDate } from './utils.js';
import Oracle from './oracle.js'


await main();


async function main() {
    const config = JSON.parse(readFileSync('config/config.json', 'utf-8'));
    const abi = JSON.parse(readFileSync('resources/abi.json', 'utf-8'));

    const alchemyApiKey = config['alchemyApiKey'];
    const oracles = config['oracles'];

    if (!alchemyApiKey) {
        console.log('Alchemy api key not found in config');
        return;
    }
    if (!oracles) {
        console.log('Oracles not found in config');
        return;
    }

    const alchemy = new Alchemy({
        apiKey: alchemyApiKey,
        network: Network.ETH_MAINNET,
    });

    const provider = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
    const web3 = new Web3(provider);

    for (const [pair, address] of Object.entries(oracles)) {
        const oracle = new Oracle(web3, alchemy, address, abi);
        await oracle.init();

        const [latestAnswer, latestTimestamp] = await oracle.latestAnswer();
        console.log(`${pair} \t${formatDate(latestTimestamp)} \tlatest: ${latestAnswer}`);

        oracle.subscribe((answer, date) => console.log(`${pair} \t${formatDate(date)} \tupdate: ${answer}`));
    }
}