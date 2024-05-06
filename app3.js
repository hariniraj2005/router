const http=require('http');

const route=require('./router')
const server=http.createServer(route)     
server.listen(5000);