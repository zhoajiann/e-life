'use strict'

const fs = require('fs')
console.log('调用这个接口')
class uploadapp {

  constructor () {
    this.param = '/'
  }

  async post (c) {
   
    let f = c.getFile('image'),
        cname = c.body.cname;
 
    console.log('file:',f)

    let appname = f.filename.slice(0,f.filename.length-4);

    let dirpath = `${c.service.publicPath}/image/${appname}`

    fs.mkdirSync(dirpath);

    //移动文件到目标路径
    await c.moveFile(f, `public/image/ico/${f.filename}`)

    console.log('okok!')

    //添加到数据库
    try {

      let len = f.filename.length
      let datas = {
        appname:f.filename.slice(0,len-4),
        image:f.filename,
        cname:cname
      }

      let data = await c.service.model.db_uploadElife.insertApp(datas);
      c.send(data,200)

    } catch (err) {

      console.error(err)
      c.send('insert failed', 400)

    }
  }

}
module.exports = uploadapp