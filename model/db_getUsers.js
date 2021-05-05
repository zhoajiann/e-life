'use strict'

class db_getUsers{

    constructor(mdb){
        this.db = mdb
    }

    async get(){
        let sql = `select * from users`
        let r = await this.db.query(sql)
        let data = r.rows
        return data
    } 
}

module.exports = db_getUsers