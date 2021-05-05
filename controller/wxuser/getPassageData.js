'use strict'

// 文章点赞头像
class getPassageData{

    async get (c) {       
        let data = await c.service.model.db_wx_Like.getPassageLikePeople(c.param.id)
        c.send(data,200)
    }
}

module.exports = getPassageData