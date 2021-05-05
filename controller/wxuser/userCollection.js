'use strict'

// 用户收藏列表及查看内容
class userCollection{

    async list (c) {      
        let openid = c.box.user.openid         
        let data = await c.service.model.db_wx_Collect.getPassageList(openid)
        c.send(data,200)
    }

    async get (c) {       
        let data = await c.service.model.db_wx_Collect.getPassageDetail(c.param.id)
        c.send(data,200)
    }

}

module.exports = userCollection