'use strict'

class cancelLike{

    constructor(){
        this.param = '/'
    }

    async delete (c){
  
        try{
            let data = {
                openid:c.box.user.openid,
                content:`${c.body.toString('utf8')}.txt`
            }
            let data2 = await c.service.model.db_wx_Like.delLike(data);
            c.send(data2,200)
        }catch (err) {
            console.error(err)
            c.send('error', 400)     
        }  
      }
}

module.exports = cancelLike