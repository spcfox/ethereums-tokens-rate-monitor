import { ethers } from 'ethers';

const ANSWER_UPDATE_SIGNATURE = 'AnswerUpdated(int256,uint256,uint256)';

export default class Oracle {
    constructor(web3, alchemy, contractAddress, abi) {
        this.web3 = web3;
        this.alchemy = alchemy;
        this.contractAddress = contractAddress;
        this.abi = abi;
    }

    async init() {
        this.contract = await new this.web3.eth.Contract(this.abi, this.contractAddress);
        this.decimal = await this.contract.methods.decimals().call();
        this.aggregator = await this.contract.methods.aggregator().call();
    }

    async latestAnswer() {
        const answer = this.formatAnswer(await this.contract.methods.latestAnswer().call());
        const date = await this.contract.methods.latestTimestamp().call();
        return [answer, date];
    }

    subscribe(callback) {
        this.alchemy.ws.on(
            {
                address: this.aggregator,
                topics: [ethers.utils.id(ANSWER_UPDATE_SIGNATURE)],
            },
            log => {
                const answer = this.formatAnswer(this.web3.utils.hexToNumber(log.topics[1]));
                const date = this.web3.utils.hexToNumber(log.data);
                callback(answer, date);
            });
    }

    formatAnswer(answer) {
        return answer / 10 ** this.decimal;
    }
}
