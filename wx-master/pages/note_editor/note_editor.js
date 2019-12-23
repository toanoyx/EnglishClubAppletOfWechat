// pages/editor/editor.js
var util = require('../../utils/util.js')

Page({


    data: {
        uid:"",
        nid: "",
        dates: '2019-12-18',
        title: "",
        text: "",
        nodeDetail: []
    },
  

    onLoad: function (options) {
      var _this = this
      var nickName = '';
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          nickName = userInfo.nickName
          _this.data.uid = nickName
          console.log(nickName)
          console.log()
          //console.log(res)
        }
      })
      var DATE = util.formateDate(new Date());
      var title = title;
      var text = text;
      var nid=nid;
      this.setData({
        date: DATE,
        title: "",
        text: "",
        nid: options.nid
      })
      nid = options.nid
      if(nid != null)
        this.getNoteDetailDate(nid)
    },

    /**
     * 获取备忘录详细信息
     */
    getNoteDetailDate(nid){
      var that = this
      
      wx.request({
        url: "http://120.55.168.67:8080/mr/note/findByNid/" + that.data.nid,
        header: {
         "Content-Type": "application/json;charset=UTF-8" // 默认值
        },
        success(res) {
          that.setData({
            title:res.data.data.title,
            text:res.data.data.text,
          })
        }
      })
    },

  inTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  inText: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  //分享
  onShareAppMessage: function () {
    return {
      title: '记事本见过吗',
      desc: '第一个让我忘不掉的记事本',
      path: '/pages/note_index/note_index'
    }
  },

  //返回上个界面
  back() {
    wx.navigateTo({
      url: '../note_index/note_index',
    })
  },

  //保存按钮
  savePage: function () {
    const url = "http://120.55.168.67:8080/mr/note/savenote"  //请求的url
    wx.request({
      url: url,
      method: "POST",
      data: {
          "date": this.data.date,
          "title": this.data.title,
          "text": this.data.text,
          "uid": this.data.uid
      },
      header: {
        "Content-Type": "application/json" // 默认值
      },
      success(res) {
        wx.navigateTo({
          url: "../note_index/note_index"
        })
      }
    })
  } 
})
