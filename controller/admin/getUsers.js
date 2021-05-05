'use strict'

class getUsers {
    constructor () {
        this.param = '/'
      }

    async get (c) {        
        let data = await c.service.model.db_getUsers.get()
        let data1 = []
        data.map((item)=>{
            let i = {
                username:item.username,
                integral:item.integral
            }
            data1.push(i)
        })
        c.send(data1,200)
    }

    
}

module.exports = getUsers