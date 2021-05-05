'use strict'

//功能：在步骤表里添加 insert into taobao_fun1(image,text,dote1,dote2,dote3,dote4) values ('img.jpg','点击此处','100','100','100','100')

class uploadappStep {

  constructor () {
    this.param = '/'
  }

  async post (c) {

    let f = c.getFile('file')

    let datas = c.body
   
    let appname = c.body.table.split('_')[0],
        funname = c.body.table.split('_')[1]

    //移动文件到目标路径
    await c.moveFile(f, `public/image/${appname}/${funname}/${f.filename}`)

    let data = {       
        "table":datas.table,
        "image":f.filename,
        "text":datas.text,
        "dote1":datas.dote1,
        "dote2":datas.dote2,
        "dote3":datas.dote3,
        "dote4":datas.dote4
    }
    await c.service.model.db_uploadElife.insertAppStep(data);

  }

}
module.exports = uploadappStep