// miniprogram/pages/testpage.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'info':'',
    open_id: '',
    result: [],
    Point: [[0.0, 40.0], [-25.71, 30.64], [-39.39, 6.95], [-34.64, -20.0], [-13.68, -37.59], [13.68, -37.59], [34.64, -20.0], [39.39, 6.95], [25.71, 30.64]],
    TotalPoints: [48, 40, 36, 52, 40, 24, 28, 24, 40],
  },

  /**
   * 生命周期函数--监听页面加载
   * 从数据库调用分数并赋值
   */
  onLoad: function () {
    this.setData({
      info: app.globalData.inform
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setData({
          'open_id': res.result.openid
        })
        console.log('已获取openid',this.data.open_id)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })// 调用云函数获得用户的openid
    const db = wx.cloud.database()
    db.collection('SCL-90-test-result').where({
      _openid: this.data.open_id
    }).get({
      success: res => {
        this.setData({
          result: res.data[res.data.length-1].score //长度减一即是最近一次测试的结果
        })
        console.log('[数据库] [查询记录] 成功', res.data[res.data.length-1].time)
        this.draw_SCL()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取分数失败'
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

  exit: function(){
    wx.redirectTo({
      url: '../selectTest/selectTest',
    })
  },

  /**
   * 绘制九边形
   */
  draw_SCL: function () {
    var propor = []
    var Point = this.data.Point
    var TotalPoints = this.data.TotalPoints
    var result = this.data.result //赋值页面数据给函数本地变量
    for (var i = 0; i < 9; i++) {
      propor[i] = result[i + 1] / TotalPoints[i]
    }
    const ctx = wx.createCanvasContext('SCL-90', this)
    ctx.translate(150, 80)
    ctx.setFontSize(25)
    ctx.setFont
    ctx.setTextAlign('center')
    ctx.fillText('SCL-90测试结果', 0, 0)

    ctx.setStrokeStyle('green')
    ctx.setLineWidth(2)
    ctx.translate(0, 130)
    ctx.scale(2, 2)
    ctx.beginPath() //开始绘制九边形
    ctx.moveTo(Point[0][0], Point[0][1])
    for (var i = 1; i < 9; i++) {
      ctx.lineTo(Point[i][0], Point[i][1])
    }
    ctx.closePath()
    ctx.stroke() //绘制九边形结束

    ctx.setFontSize(6)
    ctx.setTextAlign('center')
    ctx.fillText('躯体不适指数', Point[0][0], Point[0][1] + 10)
    ctx.fillText('强迫症指数', Point[1][0] - 10, Point[1][1] + 8)
    ctx.fillText('人际关系', Point[2][0] - 15, Point[2][1])
    ctx.fillText('敏感程度', Point[2][0] - 15, Point[2][1] + 6)
    ctx.fillText('抑郁指数', Point[3][0] - 15, Point[3][1])
    ctx.fillText('焦虑指数', Point[4][0] - 4, Point[4][1] - 5)
    ctx.fillText('敌对指数', Point[5][0] + 4, Point[5][1] - 5)
    ctx.fillText('恐惧指数', Point[6][0] + 15, Point[6][1])
    ctx.fillText('偏执指数', Point[7][0] + 15, Point[7][1])
    ctx.fillText('精神病性指数', Point[8][0] + 15, Point[8][1] + 8)

    ctx.setFillStyle('red')
    ctx.setStrokeStyle('orange')
    ctx.setLineWidth(0.5)
    ctx.beginPath() //开始绘制得分九边形
    ctx.moveTo((Point[0][0] * propor[0]), (Point[0][1] * propor[0]))
    for (var i = 1; i < 9; i++) {
      ctx.lineTo((Point[i][0] * propor[i]), (Point[i][1] * propor[i]))
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke() //绘制得分九边形结束

    ctx.setFillStyle('black')
    ctx.setFontSize(8)
    ctx.setTextAlign('left')
    ctx.fillText('说明：红色面积代表心理问题程度，面', -60, 70)
    ctx.fillText('积越大，说明心理健康状态越差', -70, 85)

    ctx.draw();
  }
})



