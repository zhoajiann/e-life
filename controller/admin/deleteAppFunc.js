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
   
    //{appname:'weixin',ename:'fun2'}
    //删除表appFeature表里的ename为wechat_fun2的行
    //删除表wechat_fun2
    //删除文件夹public/image/wechat/fun2

    let data = JSON.parse(c.body);
    //console.log(data);

    let name = data.appname + '_' + data.ename; 

    let dirpath = `${c.service.publicPath}/image/${data.appname}/${data.ename}`

    deleteDir(dirpath)

    console.log('okok!')

    //添加到数据库
    try {

      await c.service.model.db_deleteElife.deleteAppFeature(name);
      await c.service.model.db_deleteElife.deleteFuncTable(name);
      c.send('ok',200)

    } catch (err) {

      console.error(err)
      c.send('insert failed', 400)

    }
  }

}
module.exports = deleteAppFunc