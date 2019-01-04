// miniprogram/pages/inquiry/inquiry.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    'loading': true,
    'active.data': [],
    'active.showMore': true,
    'active.remind': '上滑加载更多',
    'page': 0
  },

  /**
   * 生命周期函数--监听页面加载
   * 首先检查是否是医生 更新全局变量app.isDoc的值
   * 根据是否是医生进行数据库的查询，返回查询结果
   */
  onLoad: function () {
    const db = wx.cloud.database()

    // const _ = db.command
  
    db.collection('docInfo').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        app.isDoc = true
        console.log('[数据库docInfo] [查询记录] 成功: ', this.data.active.data)
      },
      fail: err => {
        app.isDoc = false
        console.error('[数据库docInfo] [查询记录] 失败：', err)
      },
      complete: () => {
        // 完成是否是医生的辨识
        // 以下根据分两种情况
        if (app.isDoc) {
          db.collection('topic').where({
            father: ''
          }).orderBy('time', 'desc').get({
            success: res => {
              this.setData({
                'active.data': res.data
              })
              console.log('[数据库topic] [查询记录] 成功: ', this.data.active.data)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
              console.error('[数据库topic] [查询记录] 失败：', err)
            }
          })
        } else {
          db.collection('topic').where({
            _openid: app.globalData.openid,
            father: ''
          }).orderBy('time', 'desc').get({
            success: res => {
              this.setData({
                'active.data': res.data
              })
              console.log('[数据库topic] [查询记录] 成功: ', this.data.active.data)
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
              console.error('[数据库topic] [查询记录] 失败：', err)
            }
          })
        }
        console.log('_id:', app.globalData.openid, 'isDoc?:', app.isDoc);
      }
    })
    
  },

// 这个函数目前没有用
  getTopic: function () {
    console.log('app.globalData.openid');
    const db = wx.cloud.database()
    db.collection('topic').where({
      _id: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          'active.data': JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', active.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
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

  getTopic: function() {

  }
})