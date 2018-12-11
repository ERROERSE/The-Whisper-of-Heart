// miniprogram/pages/testpage.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'step': 0,
    'ques': '',
    'ans': [],
    'show': '下一题'
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
        },
        success: res => {
          wx.showToast({
            title: '提交成功',
          })
        },

        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '调用失败',
          })
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
    
    }
  }

})