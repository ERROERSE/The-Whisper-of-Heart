// miniprogram/pages/doTest/doTest.js

const app = getApp()
var testNum = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryTest: [], //测试题目
    queryName: '', //测试题名
    queryResult: 0, //测试得分
    userInfo: [], //用户信息
    openid: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid != undefined) { //通过全局变量的方式获取openid，即登陆用户的识别id
      this.setData({
        openid: app.globalData.openid
      })
      console.log(app.globalData.openid)
    } else {                                  //失败时调用云函数获取用户openid
      console.log('调用全局函数失败')
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    }
    this.setTest()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 设置数据函数
   */
  setTest: function () {
    const db = wx.cloud.database()        //获取数据库变量
    db.collection('liangbiao1').get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res.data);
        const { data } = res;
        if(testNum < data.length && data[testNum] != undefined){
        var test = [];
        test.push({ choice: 'A', stem: data[testNum].选项A, point: 0, checked: false})
        test.push({ choice: 'B', stem: data[testNum].选项B, point: 1, checked: false})
        test.push({ choice: 'C', stem: data[testNum].选项C, point: 2, checked: false})
        this.setData({                  //获取题目，按照题号顺序排序
          queryName: data[testNum].题号 + '. ' + data[testNum].题目,
          queryTest: test
        })
        testNum++
        }else{}
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      },
    })
  },
  
  /**
 * 选择题目函数
 */
radioChange : function (e) {
  console.log(testNum)
  this.setTest()
  console.log(this.data.queryTest)
  var test = this.data.queryTest
  for(var i=0;i<test.length;i++)
  {
    if(test[i].checked) 
      test[i].checked = false
}
this.setData({
  queryTest: test
})
}
})

