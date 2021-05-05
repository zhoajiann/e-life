'use strict'
const fs = require('fs')
class db_useElife{

    constructor (mdb) {
        this.db = mdb
    }

    async getApp(){

        let sql =  'select * from app'
        let r = await this.db.query(sql);
        let data = r.rows;
        return data.map((item)=>{
            return{
                appname:item.appname,
                cname:item.cname,
                image:`https://www.licnzh.cn:1234/static/image/ico/${item.image}` 
            }
        })
    }

    async getFunc(id){
        let sql =  `select name,ename from appFeatures where appname='${id}'`
        let r = await this.db.query(sql);
        return r.rows;
    }

    async getStep(id,type){
        let sql =  `select * from ${id}_${type}`
        let r = await this.db.query(sql);
        let data = r.rows;
        let arr=  data.map((item)=>{
            return{    
                ...item,image:`https://www.licnzh.cn:1234/static/image/${id}/${type}/${item.image}`
            }
        })

        return arr.sort(function(a,b){return a.id-b.id});
    }

    async getPassageList(){
        let sql =  'select * from passage'
        let r = await this.db.query(sql);
        let data = r.rows;
        return data.map((item)=>{
            return{
                id:item.id,
                // id:(item.content).substring(0,(item.content).length-4),
                title:item.title,
                image:`https://www.licnzh.cn:1234/static/passage/image/${item.image}`,
                content:`https://www.licnzh.cn:1234/static/passage/content/${item.content}`,
                voice:`https://www.licnzh.cn:1234/static/passage/voice/${item.voice}`,
                date:item.date
            }
        })
    }
    
    async getPassageDetail (id) {
        let sql =  `select * from passage where id=${id}`
        let r = await this.db.query(sql);
        let data = r.rows;
        return data.map((item)=>{
            return {
                name:item.content,
                title:item.title,
                image:`https://www.licnzh.cn:1234/static/passage/image/${item.image}`,
                content:`https://www.licnzh.cn:1234/static/passage/content/${item.content}`,
                voice:`https://www.licnzh.cn:1234/static/passage/voice/${item.voice}`,
                date:item.date
            }
        })
    }
    
}

module.exports = db_useElife