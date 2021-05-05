'use strict'

module.exports = async(c, next) => {
    //解决跨域问题
    c.setHeader("Access-Control-Allow-Origin", "*");
    c.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    c.setHeader("Access-Control-Allow-Methods", "*");
    c.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    c.setHeader('Access-Control-Allow-Headers',"*")
    //c.setHeader("X-Powered-By", ' 3.2.1')
    // c.setHeader("Content-Type", "application/json;charset=utf-8");
    await next()
  }