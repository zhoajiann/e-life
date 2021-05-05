'use strict'
class db_uploadElife{

    constructor (mdb) {
        this.db = mdb
    }
    

    //创建步骤的编号，示例：taobao_fun1、taobao_fun2
    async makeEname(data){

        let sqlInsertFun = `select ename from appfeatures where appname='${data.appname}';`
        let r = await this.db.query(sqlInsertFun);
        let arr = r.rows;
        if(arr.length === 0){
            return `${data.appname}_fun1`
        }
        let numArr = arr.map((item)=>{
            return parseInt(item.ename.slice(item.ename.length-1))
        })
        let row = Math.max.apply(null,numArr)
        return `${data.appname}_fun${row+1}`
    }


    //向app表里添加数据，新增一个app
    async insertApp(data){

        let sql =  'INSERT INTO app(appname,image,cname) VALUES ($1, $2, $3)'
        let ret = await this.db.query(sql, [
            data.appname, data.image, data.cname
        ])
        if (ret.rowCount <= 0) {
            return false
          }
    }


    //向appfeatures表里添加数据，新增一个app的功能
    async insertAppFunc(data){
        
        let ename = await this.makeEname(data)
       
        let sql =  'INSERT INTO appfeatures(name,appname,ename) VALUES ($1, $2, $3)'
        let ret = await this.db.query(sql, [
            data.name,data.appname,ename
        ])
        if (ret.rowCount <= 0) {
            return false
          }
    }


    //增加功能时，建立一个新表，示例：taobao_fun4
    async createFuncTable(data){

        let ename = await this.makeEname(data)

        let ename1 = ename.slice(0,ename.length-1)
        let ename2 = parseInt(ename.slice(ename.length-1))-1
        ename = `${ename1}${ename2}`
        let sql =  `create table ${ename}(id serial primary key, image varchar(20), text varchar(50), dote1 smallint, dote2 smallint, dote3 smallint, dote4 smallint)`
        let ret = await this.db.query(sql)
    }


    //增加步骤，向taobao_fun4表里增加一行
    async insertAppStep(data){

        let sql = `insert into ${data.table}(image,text,dote1,dote2,dote3,dote4) values ($1, $2, $3,$4,$5, $6)`
        let ret = await this.db.query(sql, [
            data.image, data.text, data.dote1, data.dote2, data.dote3, data.dote4
        ])
        if (ret.rowCount <= 0) {
            return false
        }

    }


    //增加文章，向passage表里增加文章
    async addpassage(data){
        let date = new Date().toLocaleDateString()
        let sql = 'INSERT INTO passage(title,image,content,voice,date) VALUES ($1,$2,$3,$4,$5)'
        let ret = await this.db.query(sql,[
            data.title,data.image,data.content,data.voice,date
        ])
        if (ret.rowCount <= 0) {
            return false
        }
        return date
    }
}

module.exports = db_uploadElife