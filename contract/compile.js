
// compile.js 负责编译智能合约

// require('库名/路径')
const solc = require('solc');
// fs: file system => 文件系统
const fs   = require('fs');
// 路径库
const path = require('path')

// 1. 读取智能合约
// readFileSync 同步读取文件
// __dirname => 返回当前路径
// console.log(__dirname);
// resolve 路径拼接的方法 (基础路径,目标路径)
const filepath = path.resolve(__dirname,'contracts','TToken.sol')
// console.log(filepath);
// 读取文件内容
const contractFile = fs.readFileSync(filepath,'utf8');

// 通过solc库 来 编译智能合约
var output = solc.compile(contractFile, 1)
console.log(output);
// output = {contracts:'',errors: '',sourceLisr:''}
const contracts = output.contracts;
// for in 操作 : contract = 对象中的属性名
for(let contract in contracts){
    console.log(contract)
    // 写文件 fs
    let newfilepath = path.resolve(__dirname,'build',contract.replace(':','') + '.json');
    //writeFileSync(目标路径,写入内容)
    // 对象.tostring() 返回的是一个 '[object object] 字符串'
    // JSON.stringify => 将对象转化为字符串 最后一个参数 tab的空格数
    fs.writeFileSync(newfilepath,JSON.stringify(contracts[contract],null,4));
}
// console.log(contracts);


