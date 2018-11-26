// miniprogram/pages/testpage.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Q1: "你觉得这个问卷怎么样？",
    A1: "太棒了！",
    A2: "作者一定是个天才！",
    yourans: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.yourans)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  chooseAnswer: function (e) {
    this.data.yourans = e.currentTarget.dataset.id;
    console.log(e);
  },

  submit: function(){
    if (this.data.yourans!=-1) {
      // const cloud = require('wx-server-sdk')
      // exports.main = async (event, context) => {
        wx.cloud.callFunction({
        name: 'calculate',
        data: {
          score: this.data.yourans
        },
        success: res => {
          wx.showToast({
            title: '提交成功',
          })
          this.setData({
            result: JSON.stringify(res.result)
          })
          // wx.showToast({
          //   title: "你选择的是：" + String(res.result.sum),
          // })
          this.setData({
            testAns: res.result.sum
          })
          // document.write("<p>我的第一段 JavaScript</p>");
        },

        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '调用失败',
          })
          console.error('[云函数] [sum] 调用失败：', err)
        }

      })
      // }
      // console.log(this.data);
      // console.log(this.data.Q1);
      // console.log(this.data.result);

      // wx.showToast({
      //   icon: 'none',
      //   title: "你选择的是选项"+String(this.data.result.sum),
      // })
    }
    else {
      wx.showToast({
        icon: 'none',
        title: '请完成答题',
      })
    }
  }

})