'use strict'

// 用户点赞列表及查看内容
class userLike{

    async list (c) {  
        let openid = c.box.user.openid             
        let data = await c.service.model.db_wx_Like.getPassageList(openid)
        c.send(data,200)
    }

    async get (c) {       
        let data = await c.service.model.db_wx_Like.getPassageDetail(c.param.id)
        c.send(data,200)
    }
}

module.exports = userLike