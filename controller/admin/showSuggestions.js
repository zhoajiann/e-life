'use strict'

class showSuggestions {
    constructor () {
        this.param = '/'
      }

    async get (c) {        
        let data = await c.service.model.db_show_pc_Data.getSuggestions()
        c.send(data,200)
    }

    
}

module.exports = showSuggestions