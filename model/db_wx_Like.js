'use strict'

class db_wx_Like{
    constructor(mdb){
        this.db = mdb
    }

    //为小程序加有关like的方法


    //点赞，添加到great表中
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


    //取消点赞
    async delLike(data){
        let sql1 = `select id from passage where content='${data.content}'`
        let r = await this.db.query(sql1)
        let sql2 = `delete from great where userid='${data.openid}' and passageid=${r.rows[0].id} `
        await this.db.query(sql2)
        return 'success'
    }


    //获取点赞文章列表
    async getPassageList(uid){
        let passages = []
        let sql1 =  `select passageid from great where userid='${uid}'`
        let r1 = await this.db.query(sql1);
        let passagesid = r1.rows;
        console.log(passagesid) //[ { passageid: 4 }, { passageid: 1 }, { passageid: 2 } ]
        let sql2 = `select * from passage`
        let r2 = await this.db.query(sql2)
        let initPassages = r2.rows;
        passagesid.map((item1)=>{
            initPassages.map((item2)=>{
                if(item1.passageid===item2.id){
                    let data = {
                        id:(item2.content).substring(0,(item2.content).length-4),
                        title:item2.title,
                        image:`https://211.159.166.29:1234/static/passage/image/${item2.image}`,
                        date:item2.date
                    }
                    passages.push(data)
                }
            })
        })
        return passages
    }
    

    //获取某个点赞文章
    async getPassageDetail(id) {
        let sql =  `select * from passage where content='${id}.txt'`
        let r = await this.db.query(sql);
        let data = r.rows;
        return data.map((item)=>{
            return {
                title:item.title,
                image:`https://211.159.166.29:1234/static/passage/image/${item.image}`,
                content:`https://211.159.166.29:1234/static/passage/content/${item.content}`,
                voice:`https://211.159.166.29:1234/static/passage/voice/${item.voice}`,
                date:item.date
            }
        })
    }
    //获取点赞该文章的用户的头像
    async getPassageLikePeople(id){
        let sql = `select avatarurl from users,passage,great where users.id = great.userid and great.passageid=passage.id and passage.id=${id};`
        let r = await this.db.query(sql);
        let data = r.rows;
        return data;
    }

}

module.exports = db_wx_Like