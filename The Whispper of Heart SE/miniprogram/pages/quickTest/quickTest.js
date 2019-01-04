// miniprogram/pages/quickTest/quickTest.js
const app = getApp()
Page({
  data: {
    selectTest: true,
    selectArea: false,
    testId: 0,
    testType: ['请选择一个测试方面', '躯体健康测试', '强迫症测试', '人际关系敏感程度测试', '抑郁程度测试', '焦虑程度测试',
      '敌对程度测试', '恐惧程度测试', '偏执程度测试', '精神病性程度测试'],
  },
  //点击选择类型
  clickTest: function () {
    var selectTest = this.data.selectTest;
    if (selectTest == true) {
      this.setData({
        selectArea: true,
        selectTest: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectTest: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    this.setData({
      testId: parseInt(e.target.dataset.id),
      selectTest: true,
      selectArea: false,
    })
    app.globalData.testIndex = this.data.testId
    console.log(app.globalData.testIndex)
  },

  begin: function () {
    if (this.data.testId != 0) {
      wx.redirectTo({
        url: '../quickTest/quick',
      })
    }
    else {
  wx.showToast({
    icon: 'none',
    title: '请选择一个测试方面'
  })
}
},

onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数
},
onReady: function () {
  // 页面渲染完成
},
onShow: function () {
  // 页面显示
},
onHide: function () {
  // 页面隐藏
},
onUnload: function () {
  // 页面关闭
}
})