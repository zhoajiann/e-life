'use strict'

/**
 * 此文件所在目录即表示了它导出的中间件作用的分组。
 * 
 * 此时，启用了userpass进行用户验证，则表示只有访问/user分组的所有路由都要登录后才具备权限。
 * 
 */

module.exports = [

  {
    //开启用户验证
    name : 'userpass'
  }

]
