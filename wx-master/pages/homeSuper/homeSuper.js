Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const url = ""  //请求的url
    wx.request({
      url: url,
      data: {},
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res.data);
        _this.setData(
          {
            dayList: res.data,
            loading: false
          }
        )
      }
    })

  },

  // 事件处理函数

  goToPageCheck: function () {
    wx.navigateTo({
      url: '/pages/checkin/checkin',
    })
  },

  goToPageRead: function () {
    wx.navigateTo({
      url: '/pages/articleList/articleList',
    })
  },

  goToPageNote: function(){
    wx.navigateTo({
      url: '/pages/note_index/note_index',
  })},

  goToPageManage: function(){
    wx.navigateTo({
      url: '/pages/manage/manage',
  })},

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

  }
})