var WxParse = require('../wxParse/wxParse.js'); 
var app = getApp();
var requstUrl = app.globalData.url;
var imgUrl = app.globalData.myurl;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    praise: '',
    mode: 'aspectFit',
    inforImage: '/images/12345.gif',
    title:"",
    admin:"",
    article: "",
    time:"",
    numbers:"",
    pnumber:"",
    inforImage1:"/images/wei1.gif",
    inforImage2:"/images/wei2.jpg",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: requstUrl + '/WXarticle',
      data: {
        sort:106
      },
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (e) {
        var ev = e.data[3];
        console.log(ev)
        var temp = WxParse.wxParse('article', 'html', ev, that, 5);
        if(e.data[7] > 0){
          that.setData({
            title: e.data[1],
            admin: e.data[2],
            time: e.data[6],
            numbers: e.data[5],
            article: temp,
            praise: '/images/点赞(1).png',
            pnumber: e.data[8]
          })
        } else if (e.data[7] < 1) {
          that.setData({
            title: e.data[1],
            admin: e.data[2],
            time: e.data[6],
            numbers: e.data[5],
            article: temp,
            praise: '/images/点赞.png',
            pnumber: e.data[8]
          })
        }
      }
    })
  },
  // 点击图片的点赞事件 这里使用的是同步的方式
  toCollect: function (event) {
    var that = this;
    wx.request({
      url: requstUrl + '/WXarticlePraise',
      data: {
        sort: 107,
        openid:'123'
      },
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (e) {
        if (e.data[1] > 0) {
          that.setData({
            praise:'/images/点赞(1).png',
            pnumber:e.data[2]
          })
        } else if (e.data[1] < 1) {
          that.setData({
            praise: '/images/点赞.png',
            pnumber: e.data[2]
          })
        }
        
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
    
  }
})