'use strict'

class db_changepoints{
    constructor(mdb){
        this.db = mdb
    }

    async addpoints(id){
        let sql1 = `SELECT integral FROM users WHERE id='${id}'`
        let r = await this.db.query(sql1)
        let point1 = r.rows[0].integral
        let point2 = point1 + 20
        let sql = `UPDATE users SET integral = ${point2} where id='${id}'`
        let ret = await this.db.query(sql)
        if(ret.rowCount<=0){
            return false;
        }5
        return true
    } 

}

module.exports = db_changepoints