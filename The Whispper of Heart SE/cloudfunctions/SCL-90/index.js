// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数 量表计算公式仍需要完善
exports.main = async (event, context) => {
  var result=[];
  var repo='';

// 各指数对应的题号
  var index1 = [1,4,12,27,40,42,48,49,52,53,56,58];
  var index2=[3,9,10,28,38,45,46,51,55,65];
  var index3=[6,21,34,36,37,41,61,69,73];
  var index4=[5,14,15,20,22,26,29,30,31,32,54,71,79];
  var index5=[2,17,23,33,39,57,72,78,80,86];
  var index6=[11,24,63,67,74,81];
  var index7=[13,25,47,50,70,75,82];
  var index8=[8,18,43,68,76,83];
  var index9=[7,16,35,62,77,84,85,87,88,90];

  result[0]=0
  for (var i=0; i<90; i++){
    result[0]= result[0] + event.ans[i]-1
  }

  result[1]=0
  for (var i=0; i<index1.length; i++){
    result[1] = result[1] + event.ans[index1[i] - 1]-1
  }
  result[2]=0
  for (var i=0; i<index2.length; i++) {
    result[2] = result[2] + event.ans[index2[i] - 1]-1
  }
  result[3]=0
  for (var i=0; i<index3.length; i++) {
    result[3] = result[3] + event.ans[index3[i] - 1]-1
  }
  result[4]=0
  for (var i=0; i<index4.length; i++) {
    result[4] = result[4] + event.ans[index4[i] - 1]-1
  }
  result[5]=0
  for (var i=0; i<index5.length; i++) {
    result[5] = result[5] + event.ans[index5[i] - 1]-1
  }
  result[6]=0
  for (var i=0; i<index6.length; i++) {
    result[6] = result[6] + event.ans[index6[i] - 1]-1
  }
  result[7]=0
  for (var i=0; i<index7.length; i++) {
    result[7] = result[7] + event.ans[index7[i] - 1]-1
  }
  result[8]=0
  for (var i=0; i<index8.length; i++) {
    result[8] = result[8] + event.ans[index8[i] - 1]-1
  }
  result[9]=0
  for (var i=0; i<index9.length; i++) {
    result[9] = result[9] + event.ans[index9[i] - 1]-1
  }
  result[10]=0
  for (var i=0; i<90; i++) {
    if (event.ans[i]>2)
      result[10] = result[10] + 1
  }
  result[11]=0
  result[11] = 90 - result[10]

  repo = '你的心理健康测试结果为：\n 总分:' + result[0] + '\n 阳性项目总数：' + result[10] + '\n 阴性项目总数：' + result[11] + '\n 躯体不适指数：' + result[1] + '/48 \n' + '强迫症指数：' + result[2] + '/40 \n' + '人际关系敏感程度：' + result[3] + '/36 \n' + '抑郁指数：' + result[4] + '/52 \n' + '焦虑指数：' + result[5] + '/40 \n' + '敌对指数：' + result[6] + '/24 \n' + '恐惧指数：' + result[7] + '/28 \n' + '偏执指数：' + result[8] + '/24 \n' + '精神病性指数：' + result[9]+'/40'

  console.log(event)
  console.log(context)

  return {
    result,
    repo
  }
}