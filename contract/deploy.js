const fs = require('fs');
const path = require('path')
const Web3 = require('web3');
// const ganache_cli = require('ganache-cli');
// const web3 = new Web3(ganache_cli.provider());
const web3 = new Web3('http://127.0.0.1:8545');

const filepath = path.resolve(__dirname,'build','TronToken.json')
let contractabi = JSON.parse(fs.readFileSync(filepath, 'utf8'));
let deply = () => {
    let contract = new web3.eth.Contract(JSON.parse(contractabi.interface));
    web3.eth.getAccounts()
    .then(accounts => {
         web3.eth.personal.unlockAccount('0xcf9786bd5cb7adb0f6f63974ff5c43f9fd269e75', '123456').then((result) => {
            contract.deploy({
                data: '0x' + contractabi.bytecode
            })
            .send({
                from:'0xcf9786bd5cb7adb0f6f63974ff5c43f9fd269e75',
                gas: 1500000,
                gasPrice: web3.utils.toWei("0.0000002", "ether")
            })
            .then(d => {
                if(d.options.address){
                    console.log("模拟部署智能合约成功,合约地址:" + d.options.address);
                }
            }).catch(console.log)
         })
    });
}

deply();
