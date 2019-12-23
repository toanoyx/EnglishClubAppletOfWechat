// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 晨读材料列表
    articleList: []
  },
  /**
   * 获取晨读材料列表的数据
   */
  getArticleList(){
    var that = this;
    wx.request({
      url: 'http://120.55.168.67:8080/mr/material/articleList',
      success(res) {
        // console.log(res);
        if (res.statusCode === 200) {
          that.setData({
            articleList: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取晨读材料列表的数据
    this.getArticleList();
  },
  /**
   * 
   */
  showDetail(e){
    let dataset = e.currentTarget.dataset
    let contentId = dataset.id
    wx.navigateTo({
      url: `../articleDetail/articleDetail?contentId=${contentId}`
    });
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