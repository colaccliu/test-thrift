// 创建一个thrift server
const thrift = require('thrift')

// 引入生成的struct和service
const TAccountService = require('./gen-nodejs/TAccountService')
const TAccountTypes = require('./gen-nodejs/account_types')

// 存储的数组
const accounts = {}

// 开启rpc server
const server = thrift.createServer(TAccountService, {
    // 创建一个账户
    createAccount(account, result) {
        console.log('server createAccount: ', account.uid.toString())
        // 存储数据
        accounts[account.uid] = account
        result(null)
    },
    // 获取账号信息
    getAccount(uid, result) {
        console.log(`server getAccount: uid = ${uid.toString()}, name = ${accounts[uid].name}`)
        result(null, accounts[uid])
    }
})

// 监听8083端口
server.listen(8083)
console.log('server is listening on 8083....')