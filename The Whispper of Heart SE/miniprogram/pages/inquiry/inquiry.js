// miniprogram/pages/inquiry/inquiry.js
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
   */
  onLoad: function () {
    const db = wx.cloud.database()
    db.collection('topic').orderBy('time','desc').get({
      success: res => {
        this.setData({
          'active.data': res.data
        })
        console.log('[数据库] [查询记录] 成功: ', this.data.active.data)
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

  getTopic: function () {
    console.log('dafdfdsfdsf');
    const db = wx.cloud.database()
    db.collection('topic').get({
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