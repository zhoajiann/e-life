'use strict'

class userPoint {
    constructor () {
        this.param = '/'
      }

    async get (c) {        
        let openid = c.box.user.openid
        let data = await c.service.model.db_userPoint.get(openid)
        c.send(data,200)
    }

    
}

module.exports = userPoint