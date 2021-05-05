'use strict'

/**
 * 全局开启的中间件，其格式是一个数组，每个元素是一个对象，表示要开启的中间件配置项。
 * 
 * 其中name属性是必需的，name表示中间件文件的名称，但是不带有 .js
 * 
 * 在这个文件所在的级别是和所有模块同一级别的，所以这个文件配置的是全局中间件。
 * 
 * 所有中间件文件都在middleware目录。
 * 
 * 中间件执行的顺序就是数组的顺序。
 * 
 */

/**
 * 
 * name 属性就是中间件文件的名称，但是不带有.js。注意命名不要有空格等容易引起冲突的字符。
 * 
 * 在全局中间件来说，支持配置项如下：
 *      name    中间件文件名称，不带有 .js，如果 @ 开头则表示文件中是一个类需要初始化，并提供middleware方法。
 *      group   针对哪些分组模块起作用，必须是 / 开头。
 *      args    针对中间件是类的情况，会进行初始化，如果在初始化时要传递参数，则通过args设置。
 *      pre     是否在data事件之前运行，这会在接收body数据之前运行。
 *      method  针对哪些请求类型执行。
 */

module.exports = [


  //解决跨域问题
  {
    name:'control'
  },
  {
    //测试输出日志
    name : 'test-logger',
    //此项表示，只针对controller/node目录开启中间件。
    group : ['/node']
  },

  {
    name : 'set-body-size',

    //表示在接收body数据之前运行
    pre: true,

    //表示只对POST和PUT方法执行。
    method : ['POST', 'PUT']
  },

  {
    //@ 开头说明timing.js中是一个类，需要初始化。
    name : '@timing',

    //初始化类时要传递的参数。
    args : {
      test : true
    }
  }

]
