'use strict'

class db_show_pc_Data{

    constructor(mdb){
        this.db = mdb
    }


    //pc端获取数据


    //获取某个文章点赞的人数
    async showGreatNum(content){
        let sql =`select count(distinct userid) from great,passage where great.passageid=passage.id and passage.content='${content}'`

        let r = await this.db.query(sql);
        
        let data = r.rows;

        return data[0].count
    } 


    //获取某个文章收藏的人数
    async showCollectNum(content){
        let sql =`select count(distinct userid) from collect,passage where collect.passageid=passage.id and passage.content='${content}'`
       
        let r = await this.db.query(sql)                                        
        let data = r.rows;
        
        return data[0].count 
    } 


    //获取用户意见反馈
    async getSuggestions(){
        let sql = 'select * from suggest'
        let r = await this.db.query(sql)
        let data = r.rows;
        return data.map((item)=>{
            return item.view
        })
    }

    
}

module.exports = db_show_pc_Data