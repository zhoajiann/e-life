'use strict'

class banner {
        
    constructor(){
       //this.param = '/:id/:type'
    }

    async list (c) {
        let res = await c.service.model.db_banner.getBannerPath();
        let arr = res.map((item)=>{
            return (
                {
                    path:`https://www.licnzh.cn:1234/static/banner/${item.path}`
                }
            )
        })
        c.send(arr,200);
    }

    // async get (c) {
        

    // }

}

module.exports = banner