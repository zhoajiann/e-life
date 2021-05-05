'use strict'
class db_banner{

    constructor (mdb) {
        this.db = mdb
    }
    
    async getBannerPath(){

        let sql = `select path from banner`
        let r = await this.db.query(sql)
        let data = r.rows
        return data;

    }


    //增加banner图片
    async insertBanner(data){

        let sql = `insert into banner(path) values ($1)`
        let ret = await this.db.query(sql, [
            data.path
        ])
        if (ret.rowCount <= 0) {
            return false
        }

    }

}

module.exports = db_banner;