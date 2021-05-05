'use strict'
// 获得积分列表，并展示前10
function sortPoints(a,b){
    return b.integral-a.integral
}

function findIdx(arr,id){
  for(let i=0;i<arr.length;i++){
    if(arr[i].id === id){
      return i+1
    }
  }
}

class pointList {

  constructor () {
    this.param = '/'
  }

  
  async get(c) {
    let data=await c.service.model.db_getUsers.get()
    let data1 = data.sort(sortPoints)
    let index = findIdx(data1,c.box.user.openid)
    let data2 = data1.splice(0,10)
    let data3 = {
      index:index,
      list:data2
    }
    c.send(data3,200)
  }

}

module.exports = pointList