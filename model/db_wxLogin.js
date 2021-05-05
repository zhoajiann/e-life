'use strict'

class db_wxLogin{

    constructor (mdb) {
        this.db = mdb
    }


    async findUser(openid){
        let sql = `select * from users where id='${openid}'`
        let r = await this.db.query(sql);
        let data = r.rows[0]
        if(typeof(data) == 'undefined'){
            return false
        }
        return true
    }

    async addUser(openid){

        let sql =  `insert into users values('${openid}','name',0)`
        let r = await this.db.query(sql);
        let data = r.rows;
        console.log('加入了这个用户')
        return data;
    }

    async saveUser(name,avatar,id){
        let sql = `update users set (username,avatarurl)=('${name}','${avatar}') where id='${id}'`
        await this.db.query(sql);
    }


}

module.exports = db_wxLogin