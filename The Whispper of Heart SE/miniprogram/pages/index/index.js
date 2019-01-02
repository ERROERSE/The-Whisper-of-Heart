//index.js
const app = getApp()

Page({
  data: {
    toView: 'yellow',
    scrollLeft: 0,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    scrolls: [
      {
        title: '外表的吸引力',
        tips:'人人都是外貌协会的。俊俏的外表在各行各业都有天然的优势。外表不仅仅是长相，还包括言谈举止。就比如房产销售、保险销售员，都把自己的外表收拾地整整齐齐。',
        tag: 'yellow',
      },
      {
        title: '我们喜欢那些与我们相似的人',
        tips: '一个人在观点上、个性上、背景上、生活方式上与我们相似，就会使我们对他们产生好感。 生活中很多人挖空心思找共同点，以促进沟通和交流。比如，和领导有一样的爱好，销售人员提我们是老乡来套近乎。',
        tag: 'green',
      },
      {
        title: '我们喜欢那些说好听话的人',
        tips: '即使明知道那是奉承并且与事实不符，大多数人还是喜欢赞美的话。',
        tag: 'red',
      },
      {
        title: '接触与合作',
        tips: '为着同一目标互相合作过的人之间容易产生好的关系。比如户外拓展能加强团队成员之间的关系。再比如，销售员竭力表现出帮着顾客享受公司最优政策、和老板压低价格，这样顾客就喜爱这个销售员。',
        tag: 'yellow',
      },
      {
        title: '和美好事物关联在一起',
        tips: '不管我们是与好事沾了边还是与坏事沾了边，都会影响我们在他人心目中的形象。',
        tag: 'green',
      },
      {
        title: '人喜欢吃东西',
        tips: '心理学实验表明吃东西时，对同一事物，好感会增强。这就是为何饭桌上谈生意了。',
        tag: 'red',
      },
    ],
  },

  onLoad: function() {
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
    
    const db = wx.cloud.database()
    const _ = db.command
    const myOpenID = 'xxx'
    
    db.collection('articles').where({
      _openid: _.eq(app.globalData.openid)
    }).get({
      success: res => {
        app.isDoc = true
      },
      fail: err => {
        app.isDoc = false
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

    console.log(app.globalData.openid,'isDoc?',app.isDoc)
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

    wx.startPullDownRefresh()
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
