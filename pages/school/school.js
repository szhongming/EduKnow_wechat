// pages/school/school.js
var app = getApp();
var url = app.globalData.url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      navbar:['国内名校','海外高中','海外大学'],
      currentTab:0,
    tabTxt: [
      {
        'text': '地点',
        'originalText': '地点',
        'active': false,
        'child': [
          { 'id': 1, 'text': '北京' },
          { 'id': 2, 'text': '上海' },
          { 'id': 3, 'text': '广州' },
          { 'id': 4, 'text': '深圳' },
        ],
        'type': 0
      },
      {
        'text': '类型',
        'originalText': '--类型',
        'active': false,
        'child': [
          { 'id': 1, 'text': '研究大学' },
          { 'id': 2, 'text': '文理学院' },
        ], 'type': 0
      },
    ],
    searchParam: []
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    wx.request({
      url: url+'/selectBySchoolType',
      data: {
        school_type: e.currentTarget.dataset.text,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (e) {
        
      }
    })
  },
  // 跳转到对比页面
  compare: function () {
    wx.navigateTo({
      url: '../school/school_compare'
    })
  },
  // 跳转到对应学校的信息页面
  schoolmsg: function () {
    wx.navigateTo({
      url: '../school/school_message'
    })
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
  //事件处理函数
bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  filterTab: function (e) {
    var that = this;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    var index = e.currentTarget.dataset.index;
    var newTabTxt = data.map(function (e) {
      e.active = false;
      return e;
    });
    newTabTxt[index].active = !that.data.tabTxt[index].active;
    this.setData({
      tabTxt: data
    })

  },
  filterTabChild: function (e) {

    //我需要切换选中项 修改展示文字 并收回抽屉  
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    if (typeof (e.target.dataset.id) == 'undefined' || e.target.dataset.id == '') {
      data[index].active = !that.data.tabTxt[index].active;
    }
    else {
      data[index].type = e.target.dataset.id;
      data[index].active = !that.data.tabTxt[index].active;
      if (e.target.dataset.id == '0') {
        data[index].text = that.data.tabTxt[index].originalText;
        //不限删除条件
        delete that.data.searchParam[index];
      }
      else {
        data[index].text = e.target.dataset.txt;
        //更改删除条件
        that.data.searchParam[index] = data[index].text;
      }


    }

    that.setData({
      tabTxt: data
    })
    console.log(that.data.searchParam);


  }
})
