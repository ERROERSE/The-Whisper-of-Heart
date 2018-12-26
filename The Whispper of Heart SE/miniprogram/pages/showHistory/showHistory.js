// miniprogram/pages/showHistory.js

const app = getApp()

const wxCharts = require('wxcharts.js'); //调用wxchart.js文档用于图表的绘制

Page({

  data: {
    'active.data':[],
    'number':0,
      },

  /**
   * 页面的初始数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.yourans)

    const db = wx.cloud.database()
    db.collection('SCL-90-test-result').get({
      success: res => { //柱状图只有在成功获取了数据库相关数据后才能进行绘制
        this.setData({
          'active.data': res.data,
          'number': res.data.length
        })
        console.log('[数据库] [查询记录] 成功: ', this.data.active.data, this.data.number)
        var xaxis = [];
        for (var i = 0; i < this.data.number; i++) {
          xaxis[i] = this.data.active.data[i].time.substr(0,10) //柱状图的横坐标为时间，截取到日
        }
        console.log(xaxis)

        var score = [[],[],[],[],[],[],[],[],[],[]]; //提取每一个指数的历史数据，储存于二维数组中
        for (var j=0; j<10; j++){
        for (var i = 0; i < this.data.number; i++) {
          score[j][i] = 0
          score[j][i] = this.data.active.data[i].score[j]
        }
        }
        console.log(score)
        var text = ['总分', '躯体不适指数', '强迫症指数', '人际关系敏感程度', '抑郁指数', '焦虑指数', 
        '敌对指数', '恐惧指数', '偏执指数','精神病性指数']

        for(var i=1; i<=10; i++){

        let windowWidth = 320;
        try {
          let res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
        } catch (e) {
          // do something when get system info failed
        } new wxCharts({ //进行柱状图的绘制
          canvasId: 'columnCanvas'+i,
          type: 'column',
          categories: xaxis,
          series: [{
            name: text[i-1],
            data: score[i-1]
          }],
          yAxis: {
            format: function (val) {
              return val;
            }
          },
          width: 320,
          height: 200
        })
        }



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

})