// miniprogram/pages/testpage.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    'step': 0,
    'ques': '',
    'ans': [],
    'show': '下一题'
=======
    Q1: "你觉得这个问卷怎么样？",
    A1: "太棒了！",
    A2: "作者一定是个天才！",
    yourans: -1
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
  },

  /**
   * 生命周期函数--监听页面加载
   */
<<<<<<< HEAD
  onLoad: function () {
    const db = wx.cloud.database()
    db.collection('SCL-90-test').where({
      num: this.data.step+1 // 返回对应题号的题目
    }).get({
      success: res => {
        this.setData({
          ques: res.data[0].text
        })
        console.log('[数据库] [查询记录] 成功', res.data[0].text)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取题目失败'
        })
        console.error('[数据库] [查询记录] 失败', err)
      }
    })
=======
  onLoad: function (options) {
    // console.log(this.data.yourans)

>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
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
<<<<<<< HEAD
    this.data.ans[this.data.step] = e.currentTarget.dataset.id;
    wx.showToast({
      title:'选择成功',
    })
    console.log(e);
  },

/*  check: function (){
    console.log(this.data.ques)
  },
*/
  next: function(){
    if (this.data.step == 6){
      this.setData({show: '最终提交'})
    }
    if (this.data.step == 7) {
      if (this.data.ans[this.data.step]!=null){
        wx.cloud.callFunction({
        name: 'SCL-90',
        data: {
          ans: this.data.ans
=======
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
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
        },
        success: res => {
          wx.showToast({
            title: '提交成功',
          })
<<<<<<< HEAD
=======
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
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
        },

        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '调用失败',
          })
<<<<<<< HEAD
        }

      })
      }
      else {
        wx.showToast({
          icon:'none',
          title: '请完成最后一题的作答'
        })
      }
    }
      else {
        if (this.data.ans[this.data.step]!=null){
        this.setData({step: this.data.step+1})
        const db = wx.cloud.database()
        db.collection('SCL-90-test').where({
          num: this.data.step+1
        }).get({
          success: res => {
            this.setData({
              ques: res.data[0].text
            })
            console.log('[数据库] [查询记录] 成功', res.data[0].text)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '获取题目失败'
            })
            console.error('[数据库] [查询记录] 失败', err)
          }
        })
        } 
        else {
        wx.showToast({
        icon: 'none',
        title: '请完成答题',
        })
      }
    
=======
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
>>>>>>> b724e3c8262e574cf121bb8701330187dc10783c
    }
  }

})