'use strict'

// const fs = require('fs')
console.log('调用这个接口')
class addBanner {

  constructor() {
    // this.param = '/'
  }

  async post(c) {

    let f = c.getFile('image');

    console.log('file:', f)

    //移动文件到目标路径
    await c.moveFile(f, `public/banner/${f.filename}`)

    console.log('okok!')

    let datas = {
      path:f.filename
    }

    let data = await c.service.model.db_banner.insertBanner(datas);
    
    c.send(data, 200)


  }

}
module.exports = addBanner;