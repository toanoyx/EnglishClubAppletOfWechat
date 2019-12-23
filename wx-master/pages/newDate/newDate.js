// pages/newDate/newDate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  dateInput: function(e){
    this.setData({
      date: e.detail.value
    })
  },
  cancelBtnClick: function(){
    wx.navigateTo({
      url: "../manage/manage"
    })
  },
  ensureBtnClick: function(){
    this.data.loading = false
    const url = "http://120.55.168.67:8080/mr/manage/createActivity"
    console.log("1111"+ this.data.date)
    wx.request({
      url: url,
      data:{
        date: this.data.date
      },
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        wx.navigateTo({
          url: "../manage/manage"
        })
      }
    })
  }

})