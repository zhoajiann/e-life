'use strict'

let fs=require('fs')
class deleteAppStep{
  
  constructor () {
    this.param = '/'
  }

  
  async delete (c) {

    c.body=JSON.parse(c.body)

    let arr={
      appname:c.body.appname,
      imgname:c.body.imgname,
      tablename:c.body.tablename,
      ename:c.body.ename
  }

    let filepath = `${c.service.publicPath}/image/${arr.appname}/${arr.ename}/${arr.imgname}`

    fs.unlinkSync(filepath)

    

    let datas = await c.service.model.db_deleteElife.deleteAppStep(arr);

    c.send(datas,200)


  }
}

module.exports = deleteAppStep