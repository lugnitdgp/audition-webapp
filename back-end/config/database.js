const server = 'testcluster-xrkro.mongodb.net'
const database = 'test?retryWrites=true&w=majority'
const user = 'calRohan'
const password = '1234'

module.exports = {
    'db' : `mongodb+srv://${user}:${password}@${server}/${database}`,
    'secret' : 'rohan'
}