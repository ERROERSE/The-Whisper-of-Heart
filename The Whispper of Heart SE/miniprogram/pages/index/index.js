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
        title: '充分的安全感',
        tips:'安全感是人的基本需要之一，如果惶惶不可终日，人便会很快衰老。抑郁、焦虑等心理，会引起消化系统功能的失调，甚至会导致病变。',
        tag: 'yellow',
      },
      {
        title: '适度表达和控制情绪',
        tips: '人有喜怒哀乐不同的情绪体验，不愉快的情绪必须释放，以求得心理上的平衡。但不能发泄过份，否则，既影响自己的生活，又加剧了人际矛盾，于身心健康无益。',
        tag: 'green',
      },
      {
        title: '焦虑反应',
        tips: '焦虑反应是人们适应某种特定环境的一种反应方式。但正常的焦虑反应常有其现实原因(现实性焦虑)，如面临高考，但可随着事过境迁而很快缓解。',
        tag: 'red',
      },
      {
        title: '强迫现象',
        tips: '有些脑力劳动者，特别是办事认真的人反复思考一些自己都意识到没有必要的事，如是不是得罪了某个人，反复检查门是否锁好了等。但持续时间不长，不影响生活工作。',
        tag: 'yellow',
      },
      {
        title: '偏执和自我牵挂',
        tips: '任何人都有自我牵连倾向，即假设外界事物影射着自己特别是对自己有不利影响，如走进办公室时，人们停止谈话，这时往往会怀疑人们在议论自己。',
        tag: 'green',
      },
      {
        title: '疑病现象',
        tips: '很多人都将轻微的不适现象看成严重疾病，反复多次检查，特别是当亲友、邻居、同事因某病英年早逝和意外死亡后容易出现。但检查如排除相关疾病后能接受医生的劝告，属正常现象。',
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
