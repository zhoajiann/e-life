'use strict'

const wxkey = require('../../wxkey.js')
const gohttp = require('gohttp')

class oauthlogin {
    constructor () {
        // this.param = ''
    }

    async get (c) {
        //使用gohttp发起请求调用小程序服务器api

        
        console.log(15,c.param.id)

        let login_url = `https://api.weixin.qq.com/sns/jscode2session`
        +   `?appid=${wxkey.appid}`
        +   `&secret=${wxkey.secret}`
        +   `&js_code=${c.param.id}`
        +   `&grant_type=authorization_code`

        //获取的结果是一个对象，包括headers、status、ok、data等属性
        let result = await gohttp.get(login_url)

        // //转换成文本
        // c.res.body = result.text()

        //转换成json
        let r = result.json()

        //如果获取失败则返回500错误码
        if(r.openid === undefined){
            c.statues = 500
            return
        }

        let info = {
            openid:r.openid,
            expires:7200000,
            timestamp : Date.now(),
            random:Math.random()
        }

        //if this user not exists
        let myuser = await c.service.model.db_wxLogin.findUser(r.openid)
        if(myuser == false)
        {
            console.log('没有这个用户')
            await c.service.model.db_wxLogin.addUser(r.openid);
            
        }

        let token = c.service.token.make(info,c.service.tokenKey)  
        // let token = c.helper.aesEncrypt(JSON.stringify(info),c.service.tokenKey)

        c.res.body=token
    }
}

module.exports = oauthlogin
