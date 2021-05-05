'use strict'

class db_userSuggestion{
    constructor(mdb){
        this.db = mdb
    }

    async addSuggestion(data){
        let sql = 'INSERT INTO suggest(userid,view) VALUES ($1,$2)'
        let ret = await this.db.query(sql,[
            data.openid,data.view
        ])
        if (ret.rowCount <= 0) {
            return false
        }
        return true
    }

}

module.exports = db_userSuggestion