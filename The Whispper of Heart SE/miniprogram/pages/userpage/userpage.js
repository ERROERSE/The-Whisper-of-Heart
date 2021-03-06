//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: '../index/user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    isDoc: app.isDoc
  },

  onLoad: function () {
    console.log(app.isDoc)

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //         },
    //         fail(){
    //           wx.navigateTo({
    //             url: '../index/index',
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

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

          wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
              console.log('[云函数] [login] user openid: ', res.result.openid)
              app.globalData.openid = res.result.openid
              // wx.navigateTo({
              //   url: '../userConsole/userConsole',
              // })
            },
            fail: err => {
              console.error('[云函数] [login] 调用失败', err)
              // wx.navigateTo({
              //   url: '../deployFunctions/deployFunctions',
              // })
            }
          })

          const db = wx.cloud.database()
          // 查询当前用户是否是医师
          db.collection('counters').where({
            _openid: app.globalData.openid
          }).get({
            success: res => {
              this.setData({
                isDoc: true,
              }),
              app.isDoc = true,
              wx.startPullDownRefresh()
              console.log('[数据库] [查询记录] 成功: ', res)              
            },
            fail: err => {
              wthis.setData({
                isDoc: false,
              })
              app.isDoc = false
              wx.startPullDownRefresh()
              console.error('[数据库] [查询记录] 失败：', err)
            }
          })

        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
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

  registerDoc: function() {
    // 注册医师

    // wx.getUserInfo({
    //   withCredentials: true,
    //   lang: '',
    //   success: function(res) {},
    //   fail: function(res) {wx.navigateTo({
    //     url: '../index/index',
    //   })},
    //   complete: function(res) {},
    // })

    const db = wx.cloud.database()
    db.collection('docInfo').add({
      data: {
      },
      success: res => {
        this.setData({
          isDoc: true,
        }),
        app.isDoc = true,
        console.log(app.isDoc),
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        wx.startPullDownRefresh()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }

  // // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]

  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath

  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
