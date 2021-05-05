'use strict'

class db_userPoint{

    constructor(mdb){
        this.db = mdb
    }

    async get(id){
        let sql = `SELECT integral FROM users WHERE id='${id}'`
        let r = await this.db.query(sql)
        let point = r.rows[0].integral
        return point
    } 
}

module.exports = db_userPoint