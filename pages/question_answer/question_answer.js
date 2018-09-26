// pages/question_answer/question_answer.js
var app = getApp();
var url = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
      'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg',
      'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg',
      'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
    ] ,
    circular: true,
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",

    navbar: [],

    a:[],                        //存放从数据库查询的问答页面的内容                       
    currentTab: 0,

    color: 0,                    //二级查询标签颜色
    question_content: [],
  },
  /**
   * 一级菜单栏点击事件
   */
  navbarTap: function (e) {
    var that = this;
    that.setData({
      navbarindex: e.currentTarget.dataset.idx,   //点击一级分类标签给当前标签存一个index值
      color: 0,
    })
    wx.request({
      url: url+'/first_level_query',
      data: {
        first: e.currentTarget.dataset.text,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(e){
        for (var i = 0; i < e.data.length; i++) {
          var date = new Date(e.data[i].question_time);//调用的util.js里的方法将接收的字符串转化为时间
          var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); //获取时间的年月日
          e.data[i].question_time = date_value;
          if (e.data[i].hasOwnProperty("answer_context")) {
            if (e.data[i].answer_context.length > 64) {
              var answer = e.data[i].answer_context.substring(0, 64) + '...';
              e.data[i].answer_context = answer;
            }
          }
        }
        that.setData({
          a: e.data,
        })
      },
    })
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
    /**
   * 二级菜单栏点击事件
   */
  changecolor: function(e){
    var that = this;
    wx.request({
      url: url+'/second_level_query',
      data: {
        first: this.data.navbar[this.data.navbarindex], //根据一级分类标签点击事件存的index值获取一级分类标签的内容
        second: e.currentTarget.dataset.text,    //获取二级分类标签的内容
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (e) {
        for (var i = 0; i < e.data.length; i++) {
          var date = new Date(e.data[i].question_time);//调用的util.js里的方法将接收的字符串转化为时间
          var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); //获取时间的年月日
          e.data[i].question_time = date_value;
          if (e.data[i].hasOwnProperty("answer_context")) {
            if (e.data[i].answer_context.length > 64) {
              var answer = e.data[i].answer_context.substring(0, 64) + '...';
              e.data[i].answer_context = answer;
            }
          }
        }
        that.setData({
          a: e.data,
        })
      },
    })
    this.setData({
      color: e.currentTarget.dataset.idx
    })
  },
  // 跳转事件
  toast: function () {
    wx.navigateTo({
      url: '../question_posted/question_posted'
    })
  },
  /**
   * 点击问题进入问题详细页面
   */
  problemDetails: function(e){
    console.log(e.currentTarget.dataset.text)
    var question_content = e.currentTarget.dataset.text;
    var read = e.currentTarget.dataset.read;
    var label = e.currentTarget.dataset.text1;
    var that = this;
    console.log(e);
    wx.navigateTo({
      url: '../problemDetails/problemDetails?question_content='+question_content+'&read='+read +'&label='+label,
    });
    wx.request({
      url: url+'/look_answer',
      data: {
        read: e.currentTarget.dataset.read,
        question_content: e.currentTarget.dataset.text,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
    })
  },
  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var navbar = [];
    var that = this;
    that.setData({
      navbarindex: 0,
    })   
    wx.request({
      url: url+'/question_and_answer_loading',
      data: {
        username: 'zz',
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },      
      success: function(e){
        console.log(e)
        for (var i = 0; i < e.data.allPassQuestion.length;i++){
          var date = new Date(e.data.allPassQuestion[i].question_time);//调用的util.js里的方法将接收的字符串转化为时间
          var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); //获取时间的年月
          e.data.allPassQuestion[i].question_time = date_value;
          // if (e.data.allPassQuestion[i].hasOwnProperty("answer_context")){
          //   if (e.data.allPassQuestion[i].answer_context.length > 64) {
          //     var answer = e.data.allPassQuestion[i].answer_context.substring(0, 64) + '...';
          //     e.data.allPassQuestion[i].answer_context = answer;
          //   }
          // }         
        }
        
        for (var j = 0; j < e.data.questionClass.length;j++){
          navbar.push(e.data.questionClass[j].question_class);
          that.setData({
            ["navbar"+(j+1)]: e.data.questionClass[j].question_categorys.split(",")
          })
          
        }
        that.setData({
          a: e.data.allPassQuestion,
          navbar: navbar,
        })
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