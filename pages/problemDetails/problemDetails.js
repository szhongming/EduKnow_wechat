// pages/problemDetails/problemDetails.js
var app = getApp();
var url = app.globalData.url;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_content: '',
    read: '',
    label: '',
    answer: [],
    image: '/images/收藏.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      question_content: options.question_content,
      label: options.label,
    }),
    wx.request({
      url: url + '/problemDetails',
      data: {
        question: options.question_content,
        userId: 1,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (result) {
        console.log(result)
        for (var i = 0; i < result.data.question_answer.length; i++) {
          var date = new Date(result.data.question_answer[i].answer_time);//调用的util.js里的方法将接收的字符串转化为时间
          var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); //获取时间的年月
          result.data.question_answer[i].answer_time = date_value;
        }
        if (result.data.collection > 0 && result.data.collection != null) {
          that.setData({
            collected: true,
          })
          wx.setStorageSync('collected', true);
        }else{
          wx.setStorageSync('collected', false);
        }
        that.setData({
          answer: result.data.question_answer,
          read: result.data.look,       
        })
      },
    })
  },
  /**
   * 点赞点击事件
   */
  fabulous: function(e){
    console.log(e.currentTarget.dataset.text)
    wx.request({
      url: url +'/fabulous',

    })
  },
  /**
   * 收藏按键的点击事件---收藏与取消收藏
   */
  onCollectionTap: function (event) {
    var postCollected = wx.getStorageSync('collected');
    postCollected = !postCollected;
    wx.setStorageSync("collected", postCollected),
    this.setData({
      collected: postCollected,
    }),
    wx.showToast({
      title: postCollected?'收藏成功':'取消成功',
      duration: 1000,
      icon: 'success',
    });
    var myData = util.getNowFormatDate();
      wx.request({
        url: url + '/collect',
        data: {
          question: this.data.question_content,
          date: myData,
          userId: 1,
          postCollected: postCollected,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
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