'use strict'

class usepassage {


    async list (c) {        
        
        let data = await c.service.model.db_useElife.getPassageList()
        c.send(data,200)
    }

    async get (c) {
        
        let data = await c.service.model.db_useElife.getPassageDetail(c.param.id)
        c.send(data,200)
    }

    
}

module.exports = usepassage