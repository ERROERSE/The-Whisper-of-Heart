// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数 量表计算公式仍需要完善
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  return {
    sum: event.ans
  }
}