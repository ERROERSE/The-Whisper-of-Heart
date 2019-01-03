//index.js
const app = getApp()

Page({
  data: {
    'step': 0,
    toView: 'yellow',
    scrollLeft: 0,
    yep:'test' ,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    index: [[1, 4, 12], [3, 9, 10],
    [6, 8, 13], [5, 14, 15],
    [2, 16, 17], [7, 11, 17],
    ],
    scrolls: [
      [{
        title: 'test',
        tips:'',
        tag: 'yellow',
      }],
      [{
        title: '',
        tips: '',
        tag: 'green',
      }],
      [{
        title: '',
        tips: '',
        tag: 'red',
      }],
    ],

    
  },
  


  onLoad: function() {
    var random = Math.floor(Math.random() * 6);
    const db = wx.cloud.database();
    var temp_scrolls = this.data.scrolls
    // for (var i = 0; i < 4; i++)
    db.collection('Tips').get({
      success: res => {
        temp_scrolls[0].title=res.data[0].title
        temp_scrolls[0].tips=res.data[0].text
        this.setData({
          // yep: res.data[0].num,
          scrolls: temp_scrolls,
        })
        console.log('[数据库] [查询记录] 成功', res.data[0].title)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取题目失败'
        })
        console.error('[数据库] [查询记录] 失败', err)
      }
    })

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  upper: function (e) {
    console.log('滚动到顶部')
  },
  lower: function (e) {
    console.log('滚动到底部')
  },
  scroll: function (e) {
    console.log(e)
  },

})
