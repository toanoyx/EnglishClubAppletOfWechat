// pages/manageDayItem/manageDayItem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    loading: true,
    signInList:[],
    fileName : "",
    mid : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    _this.setData({mid: options.mid})
    const url = "http://120.55.168.67:8080/mr/manage/activityResult/" + options.mid
    wx.request({
      url: url,
      data: {},
      header: {
        "content-type":"json"
      },
      success:function(res){
        _this.setData({
          signInList: res.data.data.signList,
          fileName: res.data.data.fileName,
          loading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      
    })
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
  upLoadAction: function(e){
    const _this = this;
    wx.chooseMessageFile({
      count:1,
      type: "file",
      success(res){
        _this.data.loading = true
        var fileName = res.tempFiles[0].name  
        wx.uploadFile({     
          url: 'http://120.55.168.67:8080/mr/manage/upload',
          filePath: res.tempFiles[0].path,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData:{
            mid:  _this.data.mid,
            name: fileName
          },
          success:function(res)
          {
            var data = res.data
            console.log("111" + res.data)
            _this.setData({
              fileName: fileName,
              loading: false
            })
            wx.showToast({
              title: '文件上传成功'
            })
          }
          
        })

      }
    })
  }

  
})