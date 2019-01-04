// miniprogram/pages/quickTest/quick.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'step': 0,
    'length': 0,
    'ques': '',
    'ans': [],
    'show': '下一题',
    'turn': '',
    'result': [],
    'repo':'',
    'index': [[1, 4, 12, 27, 40, 42, 48, 49, 52, 53, 56, 58],[3, 9, 10, 28, 38, 45, 46, 51, 55, 65],
              [6, 21, 34, 36, 37, 41, 61, 69, 73],[5, 14, 15, 20, 22, 26, 29, 30, 31, 32, 54, 71, 79],
              [2, 17, 23, 33, 39, 57, 72, 78, 80, 86],[11, 24, 63, 67, 74, 81],
              [13, 25, 47, 50, 70, 75, 82],[8, 18, 43, 68, 76, 83],
              [7, 16, 35, 62, 77, 84, 85, 87, 88, 90],],
    'total': [48, 40, 36, 52, 40, 24, 28, 24, 40],
    'problem': ['躯体不适指数', '强迫症指数', '人际关系敏感程度', '抑郁指数', '焦虑指数', '敌对指数',
      '恐惧指数', '偏执指数', '精神病性指数']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      length: this.data.index[app.globalData.testIndex-1].length
    }) // 获取题目长度和该项的总分
    console.log(this.data.total)
    const db = wx.cloud.database()
    db.collection('SCL-90-test').where({
      num: this.data.index[app.globalData.testIndex-1][this.data.step] // 返回对应题号的题目
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
    this.data.ans[this.data.step] = parseInt(e.currentTarget.dataset.id);
    wx.showToast({
      title: '选择成功',
    })
    console.log(e);
  },

  /*  check: function (){
      console.log(this.data.ques)
    },
  */

  /* 选择下一题的函数，包含问卷填写完成后的最终提交函数 */
  next: function () {
    var length = this.data.length
    if (this.data.step == length-2) {
      console.log('gkd')
      this.setData({ show: '最终提交' })
    }
    if (this.data.step == length-1) {
      if (this.data.ans[this.data.step] != null) {
        var sum = 0
        for (var i=0; i<this.data.length; i++){
          sum = sum+parseInt(this.data.ans[i])-1
        }
        this.setData({
          repo: '经过快速测试你的' + JSON.stringify(this.data.problem[app.globalData.testIndex - 1]) + '为' + sum + '/' + this.data.total[app.globalData.testIndex - 1]
        })
      }
      else {
        wx.showToast({
          icon: 'none',
          title: '请完成最后一题的作答'
        })
      }
    }
    else {
      if (this.data.ans[this.data.step] != null) {
        this.setData({ step: this.data.step + 1 })
        const db = wx.cloud.database()
        db.collection('SCL-90-test').where({
          num: this.data.index[app.globalData.testIndex - 1][this.data.step]
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
  },

  /* 选择上一题的函数 */
  before: function () {
    if (this.data.step > 0) { //如果是第一题则无法再前往上一题
      if (this.data.step == this.data.length-1) {
        this.setData({ show: '下一题' })
      } //改变按钮的文本属性
      this.setData({ step: this.data.step - 1 })
      console.log(this.data.step)
      const db = wx.cloud.database()
      db.collection('SCL-90-test').where({
        num: this.data.index[app.globalData.testIndex - 1][this.data.step]
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
        title: '这已经是第一题了'
      })
    }

  }

})