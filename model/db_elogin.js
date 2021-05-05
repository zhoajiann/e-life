'use strict'
class db_elogin{

    constructor (mdb) {
        this.db = mdb
    }

    async getAdmin(name){
        let sql=`select * from admin where username='${name}'`
        let r=await this.db.query(sql);
        let data=r.rows;
        return data;

    } 
}

module.exports = db_elogin