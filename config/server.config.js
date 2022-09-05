/*let serverPort = 4500;

//require('dotenv').config()
if(process.env.NODE_ENV !== 'development'){
    require('dotenv').config()
    serverPort = process.env.PORT
}

module.exports = {
    serverPort: serverPort
} */

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

module.exports = {
    serverPort: process.env.PORT
}