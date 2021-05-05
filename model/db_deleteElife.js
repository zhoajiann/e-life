'use strict'

class db_deleteElife{
    constructor(mdb){
        this.db = mdb
    }

    //删除app三个函数

    //删除表wechat_fun几
    async deleteAppFuncN(appname){
        let sql = `select count(*) from appfeatures where appname='${appname}'`
        let r = await this.db.query(sql)
        let row = parseInt(r.rows[0].count)
        for(let i=0;i<row;i++){
            try{
                let sql = `drop table ${appname}_fun${i+1}`
                await this.db.query(sql)
            }catch(e){
                console.error(e);
            }
        }
    }

    //删除表app表里的appname为wechat的行
    async deleteAppTable(appname){
        let sql = `delete from app where appname='${appname}'`
        let r = await this.db.query(sql);
    }

    //删除表appfeatures表里的appname为wechat的行
    async deleteAppFeatures(appname){
        let sql = `delete from appfeatures where appname='${appname}'`
        let r = await this.db.query(sql);
    }

    // 删除功能
    async deleteAppFeature(name){
        let sql = `delete from appfeatures where ename='${name}'`
        let ret = await this.db.query(sql)

        console.log(ret);
    }

    // 删除功能
    async deleteFuncTable(name){
        let sql = `drop table ${name}`;
        let ret = await this.db.query(sql)

        console.log(ret);
    }


    //删除步骤
    async deleteAppStep(arr){
        let sql = `delete from ${arr.tablename} where image='${arr.imgname}'`
        let r=await this.db.query(sql);
  
        return true
    }


    //删除文章
    async delPassage(content){
        let sql1 = `select * from passage where content='${content}'`
        let r1 = await this.db.query(sql1);
        let data1 = {
            content:r1.rows[0].content,
            image:r1.rows[0].image,
            voice:r1.rows[0].voice
        }
        // 删除点赞里的文章
        let sql2 = `delete from great where passageid=${r1.rows[0].id}`;
        await this.db.query(sql2);
        // 删除收藏里的文章
        let sql3 = `delete from collect where passageid=${r1.rows[0].id}`;
        await this.db.query(sql3);
        // 删除文章表里的文章
        let sql4 = `delete from passage where content='${content}'`
        await this.db.query(sql4)
        
        return data1
    }

}

module.exports = db_deleteElife