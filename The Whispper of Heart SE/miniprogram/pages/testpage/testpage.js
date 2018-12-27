// miniprogram/pages/testpage.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'step': 87,
    'ques': '',
    'ans': [3, 5, 5, 1, 2, 2, 1, 2, 5, 4,
     5, 5, 5, 4, 4, 5, 4, 1, 2, 2,
     1, 4, 4, 1, 3, 1, 2, 4, 5, 2,
     3, 1, 4, 5, 3, 1, 2, 4, 4, 4, 
     1, 5, 5, 5, 3, 5, 1, 4, 1, 1, 
     2, 4, 5, 5, 2, 1, 5, 3, 3, 1, 
     4, 3, 4, 2, 5, 1, 1, 2, 4, 5, 
     4, 1, 2, 1, 3, 5, 2, 3, 1, 5, 
     3, 4, 4, 5, 2, 1, 3, 1, 4, 1
    ],
    'show': '下一题',
    'turn':'',
    'result':[]
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
    this.data.ans[this.data.step] = parseInt(e.currentTarget.dataset.id);
    wx.showToast({
      title:'选择成功',
    })
    console.log(e);
  },

/*  check: function (){
    console.log(this.data.ques)
  },
*/

/* 选择下一题的函数，包含问卷填写完成后的最终提交函数 */
  next: function(){
    if (this.data.step == 88){
      this.setData({show: '最终提交'})
    }
    if (this.data.step == 89) {
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
          var app=getApp()
          app.globalData.inform=res.result.repo
          console.log('全局变量获取成功',app.globalData.inform)
          this.setData({
            'result': res.result
          })
          const db = wx.cloud.database()
          var mytime = new Date()
          db.collection('SCL-90-test-result').add({
            data: {
              score: this.data.result.result,
              time: mytime.toLocaleString()},
            success: res=>{
              console.log('[数据库] [新增记录] 成功')
            },
            fail: err=>{
              console.error('[数据库] [新增记录] 失败')
            }
          })
          console.log(res)
          wx.redirectTo({
            url: 'showresult'
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
  },

/* 选择上一题的函数 */
  before: function(){
    if (this.data.step>0){ //如果是第一题则无法再前往上一题
      if (this.data.step == 89){
        this.setData({show: '下一题'})} //改变按钮的文本属性
      this.setData({step:this.data.step-1}) 
      console.log(this.data.step)
      const db=wx.cloud.database()
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
    else{
      wx.showToast({
        icon:'none',
        title:'这已经是第一题了'
      })
    }

  }

})