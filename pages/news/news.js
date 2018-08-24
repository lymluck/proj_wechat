var network = require("../../utils/network.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newslist: [],
    loadTxt: "加载中，请稍后...",
    page: 1,
    pageSize: 20,
    hasMoreData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getNewsList("数据加载中...");
  },

  getNewsList: function (msg) {
    var that = this;
    var data = {
      page: that.data.page
    };
    network.requestLoading(
      "/news",
      "GET",
      data,
      msg,
      function (res) {
        var contentlistTem = that.data.newslist
        if (res.code == 0) {
          that.data.pageSize = res.data.pagination.pageSize
          if (that.data.page == 1) {
            contentlistTem = []
          }
          var contentlist = res.data.data
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              newslist: contentlistTem.concat(contentlist),
              hasMoreData: false,
              loadTxt: "没有更多了"
            })
          } else {
            that.setData({
              newslist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: res.msg,
          })
        }
      },
      function (res) {
        wx.showToast({
          title: res.msg
        })
      }
    );
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
    this.data.page = 1
    this.getNewsList("")
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getNewsList('')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})