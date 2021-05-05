'use strict'
let fs = require('fs'),
    join = require('path').join;

function deleteDir(folder){

  let files = fs.readdirSync(folder);

  for(let i = 0;i<files.length;i++){

    let file = join(folder,files[i]);

    if(fs.statSync(file).isFile()){
      fs.unlinkSync(file);
      continue;
    }
    if(fs.statSync(file).isDirectory()) deleteDir(file);

  }
  fs.rmdirSync(folder);
}

class deleteAppFunc {

  constructor () {
    this.param = '/'
  }

  async delete (c) {
   
    //{appname:'weixin'}
    //删除表appFeature表里的appname为wechat的行 可获得删除了几行，即有fun几
    //删除表app表里的appname为wechat的行
    //删除表wechat_fun几
    //删除文件夹public/image/wechat

    let appname = c.body;

    let dirpath = `${c.service.publicPath}/image/${appname}`

    deleteDir(dirpath);

    console.log('okok!');

    //添加到数据库
    try {
      //删除表wechat_fun几
      await c.service.model.db_deleteElife.deleteAppFuncN(appname);
      //删除表app表里的appname为wechat的行
      await c.service.model.db_deleteElife.deleteAppTable(appname);
      //删除表appfeatures表里的appname为wechat的行
      await c.service.model.db_deleteElife.deleteAppFeatures(appname);

      c.send('ok',200)

    } catch (err) {

      console.error(err)
      c.send('insert failed', 400)

    }
  }

}
module.exports = deleteAppFunc