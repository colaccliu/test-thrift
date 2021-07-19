// 创建一个thrift client
const thrift = require('thrift')

// 引入相关文件
const TAccountService = require('./gen-nodejs/TAccountService')
const TAccountTypes = require('./gen-nodejs/account_types')

// 建立连接
const connection = thrift.createConnection('localhost', 8083, {
    transport: thrift.TBufferedTransport,
    protocol: thrift.TBinaryProtocol
})
// 初始化client:createClient
const client = thrift.createClient(TAccountService, connection)

// 定义一个accountDTO对象，用于测试
const account = new TAccountTypes.TAccountRpcDTO({
    uid: 1,
    name: 'hello world'
})

// 调用server端的createAccount方法
client.createAccount(account, err => {
    if (err) {
        console.error(err)
        return
    }

    console.log('client createAccount:', account.uid)

    // 然后获取我们创建的账号信息
    client.getAccount(account.uid, (err, resp) => {
        if (err) {
            console.error('err')
            return
        }
        console.log(`client getAccount: uid = ${resp.uid}, name = ${resp.name}`)
        connection.end() // 关闭连接
    })
})
