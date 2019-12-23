// pages/articleDetail/articleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let contentId = options.contentId
    this.getDetailDate(contentId)
  },

  /**
   * 根据晨读材料的id来获取详细晨读材料的数据
   */
  getDetailDate(contentId){
    var that = this
    wx.request({
      url: 'http://120.55.168.67:8080/mr/material/articleDetail/' + contentId,
      success(res) {
        // console.log(res)
        if(res.statusCode === 200) {
          that.setData({
            detailData: res.data.data
          })
        }
      }
    })
  },

  /**
   * 回到详细列表列
   */
  back() {
    if (this.data.isFromShare) {
      wx.navigateTo({
        url: '../articleList/articleList'
      })
    } else {
      wx.navigateBack()
    }
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

  }
})