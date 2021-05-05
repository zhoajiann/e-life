'use strict'

class db_addLike{
    constructor(mdb){
        this.db = mdb
    }

    async insertLike(data){
        let sql = 'INSERT INTO great(userid,passageid) VALUES ($1,$2)'
        let ret = await this.db.query(sql,[
            data.openid,data.id
        ])
        if (ret.rowCount <= 0) {
            return false
        }
        return true
    }

}

module.exports = db_addLike