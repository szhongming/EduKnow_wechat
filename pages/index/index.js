var app = getApp();
var requstUrl = app.globalData.url;
var imgUrl = app.globalData.myurl;
//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    collection:'/images/收藏.png',
    inforRead:'/images/显示答案.png',
    mode:'aspectFit',
    question:'问答',
    
    
    expertUrl:[],
    intervalExpert: 4000, //(专家)自动切换时间间隔
    durationExpert: 500,  //(专家)滑动动画时长

    imgUrls: [],
    circular: true,       //是否衔接滑动
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,       //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",

    navbar: [],

    a: [],

    information: [
      {
        "text": '掌握五门外语，12岁创作英文小说，裸考托福SAT近满分,她说学好英语的秘诀是......',
        "inforImage": 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg',
        "inforNum": '20',
        "rejoinNum": '5',
        "typeOne": 'SAT',
        "typeTwo": '托福',
      },
      {
        "text": '没想好这三个问题，孩子的留美之路可能是个坑！',
        "inforImage": 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg',
        "inforNum": '15',
        "typeOne": 'SAT',
        "typeTwo": '托福',
      },
      {
        "text": '托福一次通过的学霸，只因父母重视阅读？他的书单值得收藏',
        "inforImage": 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg',
        "inforNum": '10',
        "typeOne": 'SAT',
        "typeTwo": '托福',
      },
      {
        "text": '放弃美国，我如何在挪威收获学位、爱情和生活的快乐？',
        "inforImage": 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
        "inforNum": '5',
        "typeOne": 'SAT',
        "typeTwo": '托福',
      }
    ],

    video:[
      {
        "foreword":'讲话直接、性格单纯也是罪？这一步让孩子走向成熟',
        "preview": 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        "videoNum": '5',
      },
    ],
    currentTab: 0,
    color: 0,
  },
  navbarTap: function (e) {
    var that = this;
    that.setData({
      navbarindex: e.currentTarget.dataset.idx,   //点击一级分类标签给当前标签存一个index值
      color: 0,
    })
    // wx.request({
    //   url: requestUrl + '/bindtap',
    //   data: {
    //     first: e.currentTarget.dataset.text,
    //   },
    //   method: 'GET',
    //   header: { 'Content-Type': 'application/json' },
    //   success: function(e){
    //     console.log(e)

    //   }
    // })
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    });
  },
  changecolor: function (e) {
    this.setData({
      color: e.currentTarget.dataset.idx
    })
  },
  toasts: function () {
    wx.navigateTo({
      url: '../index_article/index_article'
    })
  },
 
  toast: function () {
    wx.navigateTo({
      url: '../index_expert/index_expert'
    })
  },
  gotoquestion: function(){
    wx.switchTab({
      url: '../question_answer/question_answer',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //轮播图
    var question = [];
    var navbar =[];
    var that = this;
    wx.request({
      url: requstUrl+'/broadcast',
      data: {
        sort:4
      },
      method:'GET',
      header: { 'Content-Type': 'application/json' },
      success: function(e){
        for(var i=0;i<e.data.length;i++){
          var img = imgUrl+e.data[i].b_url;
          e.data[i].b_url=img
        }
        that.setData({
          imgUrls: e.data
        })
      }
    }),

    wx.request({
      url: requstUrl + '/expert',
      method:'GET',
      header: { 'Content-Type': 'application/json' },
      success: function(a){
        var expertUrl=[];
        for(var i=0; i<a.data.length;i++){
          var obj = new Object();
          obj.one = a.data[i];
          obj.two = a.data[i + 1];
          obj.three = a.data[i + 2];
          expertUrl.push(obj)
          i+=2
        }
        that.setData({
          expertUrl: expertUrl,
        })
      } 
    }),

    wx.request({
      url: requstUrl +'/classification',
      method: 'GET',
      header: { 'Content-Type': 'application/json' },
      success: function (classification){
        console.log(classification)
        for (var j = 0; j < classification.data.questionClass.length; j++) {
          navbar.push(classification.data.questionClass[j].question_class);
          that.setData({
            ["navbar" + (j + 1)]: classification.data.questionClass[j].question_categorys.split(",")
          })
        }
        for (var i = 0; i < classification.data.question.length; i++){
          var date = new Date(classification.data.question[i].question_time);//调用的util.js里的方法将接收的字符串转化为时间
          var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); //获取时间的年月日
          classification.data.question[i].question_time = date_value;
          question.push(classification.data.question[i]);
        }
        that.setData({
          navbar: navbar,
          a: question,
          answer: classification.data.answerNum,
          rejoinNum: classification.data.questionNum
        })
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
