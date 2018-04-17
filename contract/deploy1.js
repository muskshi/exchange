
const ganache = require('ganache-cli');
const Web3    = require('web3');
const fs = require('fs');
const path = require('path');

// web3 小写是实例, Web3 是类
// web3 的构造函数需要传入一个rpc 地址 => provider(http, websocket)
// 内存虚拟节点
const web3 = new Web3(ganache.provider());
// 直接通过 http://127.0.0.1:8545链接到自己的节点
// const web3 = new Web3('http://127.0.0.1:8545');

// web3.eth.getAccounts()
// .then(result => {
//     console.log(result);
//     web3.eth.getBalance(result[0])
//     .then(r => {
//         r = web3.utils.fromWei(r,'ether')
//         console.log(r + ' ether');
//     })
// })



// 获取编译后的合约代码
const contractpath = path.resolve(__dirname,'build/FixedSupplyToken.json')
// 解析成为json对象
const contract = JSON.parse(fs.readFileSync(contractpath,'utf8'));

// 构建一个智能合约对象

let myContract = new web3.eth.Contract(JSON.parse(contract.interface));

web3.eth.getAccounts()
.then(accounts => {
    myContract.deploy({
        data: contract.bytecode,// bytecode
        arguments: ["MT", 'My TOKEN'] // 合约构造函数参数s
    })
    .send({
        from:accounts[0],
        gas: 1500000, // gas 消耗最大值
        gasPrice: web3.utils.toWei("0.0000002", "ether")
    })
    .then(d => { // 部署合约的返回结果是实例对象
        d.methods.name().call().then(r => {
            console.log(r);
        });
        // 合约方法调用 
        // 合约实例.methods.方法名(方法参数).call()
        d.methods.totalSupply().call().then(r => {
            console.log(r);
        })
        // console.log(d)
    })
})



