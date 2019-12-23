// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayList: [],
    loading: true,
    title: "日期列表"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const url = "http://120.55.168.67:8080/mr/manage/displayActivities"  //请求的url
    wx.request({
      url: url,
      data: {},
      header: {
        "content-type":"json"
      },
      success:function(res){
        _this.setData(
          {
            dayList: res.data.data,
            loading: false
          }
        )
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
  goToNewDate: function(e)
  {
    wx.navigateTo({
      url: "../newDate/newDate"
    })
  }
})