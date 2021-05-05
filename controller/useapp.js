'use strict'

class useapp {
        
    constructor(){
       //this.param = '/:id/:type'
    }

    async list (c) {
                
        let data = await c.service.model.db_useElife.getApp()
        c.send(data,200)
    }

    async get (c) {
        //c.service.imagePath


        if (c.query.type !== undefined) {
            let data = await c.service.model.db_useElife.getStep(c.param.id,c.query.type)
            c.send(data)
        } else {
            let data = await c.service.model.db_useElife.getFunc(c.param.id)

            c.send(data,200)
        }

    }

}

module.exports = useapp