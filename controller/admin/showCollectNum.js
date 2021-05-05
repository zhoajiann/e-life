'use strict'

class showCollectNum {
    constructor () {
        this.param = '/'
      }

    async post(c) {        

        let content=c.body
        let data = await c.service.model.db_show_pc_Data.showCollectNum(content)

        c.send(data,200)
    }

    
}

module.exports = showCollectNum