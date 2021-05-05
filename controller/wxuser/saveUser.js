'use strict'

class saveUser {

  constructor () {
    this.param = '/'
  }
  
  async post (c) {
    let {nickName,avatarUrl} = c.body;
    await c.service.model.db_wxLogin.saveUser(nickName,avatarUrl,c.box.user.openid);
    c.send('success',200)
  }
}
module.exports = saveUser