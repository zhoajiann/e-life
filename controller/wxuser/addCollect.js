'user strict'

class addLike{
    constructor () {
        this.param = '/'
      }
    
      async get (c){
        
        c.send('true',200)
    
      }
    
      async options (c) {
        c.send('option ture',200)
      }

      async post (c) {

        let data = {
          openid:c.box.user.openid,
          id:c.body.toString('utf8')
        }
    
        let data1 = await c.service.model.db_wx_Collect.insertCollect(data);
        c.send(data1,200)
  
      }

}

module.exports = addLike