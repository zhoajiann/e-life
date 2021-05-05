'use strict'

//此接口用于接收的数据有 {name:'微信支付1','appname':'wechat','ename':'wecaht_fun11'}
//功能：在appfeatures表里添加 insert into appfeatures(name,appname,ename) values ('微信支付1','wechat','wechat_fun11')
//创建表：wechat_fun11  create table wechat_fun11(id smallint, image varchar(20), text varchar(50), dote1 smallint, dote2 smallint, dote3 smallint, dote4 smallint)

let fs = require('fs')

class uploadappFunc {

  constructor () {
    this.param = '/'
  }

  async post (c) {
   
    let data = JSON.parse(c.body)

    console.log(data)

    let dirpath = `${c.service.publicPath}/image/${data.appname}/${data.ename}`

    fs.mkdirSync(dirpath);    
    
    await c.service.model.db_uploadElife.insertAppFunc(data);
    await c.service.model.db_uploadElife.createFuncTable(data);

  }

}
module.exports = uploadappFunc