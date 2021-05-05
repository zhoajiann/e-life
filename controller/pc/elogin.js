'use strict'

class login {

  constructor () {
    this.param = '/'
  }


  async post (c) {
    try {
      
      let {username, passwd} = JSON.parse(c.body)
      let u=await c.service.model.db_elogin.getAdmin(username);
      u=u[0]

      if (u=== undefined) {
        c.send('login failed.', 401)
        return
      }

      // let u = c.service.model.db_elogin.getAdmin

      //使用hash加解密
      // if (c.service.funcs.hashPasswd(passwd, u.pwdsalt) !== u.pwdhash) {
      //   c.send('login failed', 402)
      //   return
      // }

      if (passwd !== u.pwdhash) {
        c.send('login failed', 402)
        return
      }
      
      //3小时token有效
      let expires = 10800000
      let login_time = Date.now()

      //生成token，之后在userpass中间件中通过解密token即可获得用户信息。
      let token = c.service.token.make({
        id : u.id,
        ip : c.ip,
        time : login_time,
        expires : expires,
      }, c.service.tokenKey)

      c.send({
        token : token
      })

    } catch (err) {

      console.error(err)
      
      //自21.8.1版本开始，send支持第二个参数作为状态码。
      //状态码是数字，你不需要考虑http和http2模块的差异，因为其内部调用status函数已经屏蔽了差异。
      // ！http2要求的返回消息头部状态码必须是字符串，而接收的状态码Node.js会自动转换为数字。

      c.send('login failed', 403)

    }
  }

}

module.exports = login
