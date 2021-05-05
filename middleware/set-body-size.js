'use strict'

module.exports = async (c, next) => {
  //设置最大允许提交body数据为15M，按照1K = 1000B计算
  c.maxBody = 15000000

  await next()

}
