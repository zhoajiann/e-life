'use strict'
// 完成应用学习后积分+20
class changepoints{
  
  constructor () {
    this.param = '/'
  }

  async get (c){
    
    c.send('true',200)

  }

  async options (c) {
    c.send('option ture',200)
  }

  async post (c) {
    let openid = c.box.user.openid
    let id = await c.service.model.db_changepoints.addpoints(openid);
    c.send(id,200)
  }
}

module.exports = changepoints