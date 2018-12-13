// miniprogram/pages/doTest/doTest.js
<<<<<<< HEAD
=======

const app = getApp()
var testNum = 0
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
=======
    queryTest: [], //测试题目
    queryName: '', //测试题名
    queryResult: 0, //测试得分
    userInfo: [], //用户信息
    openid: '',
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: function (options) {

=======
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
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
<<<<<<< HEAD
  onReady: function () {
=======
  onReady: function() {
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 生命周期函数--监听页面显示
   */
<<<<<<< HEAD
  onShow: function () {
=======
  onShow: function() {
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
<<<<<<< HEAD
  onHide: function () {
=======
  onHide: function() {
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 生命周期函数--监听页面卸载
   */
<<<<<<< HEAD
  onUnload: function () {
=======
  onUnload: function() {
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
<<<<<<< HEAD
  onPullDownRefresh: function () {
=======
  onPullDownRefresh: function() {
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 页面上拉触底事件的处理函数
   */
<<<<<<< HEAD
  onReachBottom: function () {
=======
  onReachBottom: function() {
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c

  },

  /**
   * 用户点击右上角分享
   */
<<<<<<< HEAD
  onShareAppMessage: function () {

  }
})
=======
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
        test.push(data[testNum].选项A)
        test.push(data[testNum].选项B)
        test.push(data[testNum].选项C)
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
radioChange : function () {
  console.log(testNum)
  this.setTest()
  console.log(this.data.queryTest)
}
})

>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
