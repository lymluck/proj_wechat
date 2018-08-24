var network = require("../../utils/network.js");

var screenW = wx.getSystemInfoSync().screenWidth;
var circleGap = (screenW - 130 * 4 * screenW / 750) / 8;
var tagW = (screenW - 30 * 2 * screenW / 750 - 20 * 2 * screenW / 750) / 3;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemGap: circleGap,
    doubleItemGap: circleGap * 2,
    tagW: tagW
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getHotMajor("数据加载中...")
  },

  getHotMajor: function(msg) {
    var that = this
    network.requestLoading('/major_lib/major/hottest/by_category', "GET", null, msg,
      function(res) {
        if (res.code == 0) {
          that.setData({
            majorlist: res.data
          })
        } else {
          wx.showToast({
            title: res.msg,
          })
        }
      },
      function(res) {
        wx.showToast({
          title: res.msg
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})