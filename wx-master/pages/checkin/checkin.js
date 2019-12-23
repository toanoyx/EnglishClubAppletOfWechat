import { b64_md5 } from '../../utils/md5.js';

Page({

  /** 
   * 页面的初始数据
   */
  data: {
    password_info:'',
    usrid:'',
    dakapwd:'',
    admin:1,
    sysW: null,
    lastDay: null,
    firstDay: null,
    year: null,
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    firstDay: null,
    getDate: null,
    month: null,
    display: "none",
    checkincount: 0,
    checkindate:[],
    week: [
      {
        wook: "日"
      },
      {
        wook: "一"
      }, {
        wook: "二"
      }, {
        wook: "三"
      }, {
        wook: "四"
      }, {
        wook: "五"
      }, {
        wook: "六"
      },
    ],
    day: [
      {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }, {
        wook: ''
      }
    ],
    days: [
      {
        src:'',
        jdg:0
      }
    ]
  },
  getProWeekList: function () {
    let that = this
    let date = new Date()
    let dateTime = date.getTime(); // 获取现在的时间
    let dateDay = date.getDay();// 获取现在的
    let oneDayTime = 24 * 60 * 60 * 1000; //一天的时间
    let proWeekList;
    let weekday;
    console.log(dateTime)
    for (let i = 0; i < 7; i++) {
      let time = dateTime - (dateDay - i) * oneDayTime;
      proWeekList = new Date(time).getDate(); //date格式转换为yyyy-mm-dd格式的字符串
      weekday = "day[" + i + "].wook"
      that.setData({
        [weekday]: proWeekList,
      })
      //that.data.day[i].wook = new Date(time).getDate();
    }
  },
  dateSelectAction: function (e) {
    let cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex: cur_day
    })
    console.log(`点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day + 1}日`);
  },

  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate();
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    console.log(`firstday：${firstDayOfWeek}`);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];
    let weekday;
    let jdg1;
    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      // days[i].push(i);
      weekday = "days[" + (i - 1) + "].item"
      jdg1 = "days[" + (i - 1) + "].jdg"
      let tmpjdg=0;
      let tmpsrc='';
      let oneDayTime = 24 * 60 * 60 * 1000; //一天的时间
      for(let j=0;j< this.data.checkindate.length;j++){
        let k = this.data.checkindate[j]
        let tmptime = new Date();
        tmptime.setTime(k * oneDayTime - 8 * 60 * 60 * 1000);
        if (year == tmptime.getFullYear() && month == (tmptime.getMonth() + 1) && tmptime.getDate()==i){
          tmpjdg=1;
          tmpsrc ='image/rili.png'
          console.log('tmpjdg=1')
        }
      }
      this.setData({
        [weekday]: i,
        src: 'image/rili.png',
        [jdg1]: tmpjdg
      })
    }
    console.log('days')
    console.log(this.data.days)
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;


    this.setData({
      days: []
    })


    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      let firstDay = new Date(newYear, newMonth - 1, 1);
      this.data.firstDay = firstDay.getDay();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        marLet: this.data.firstDay
      })
      if (this.data.month == newMonth) {
        this.setData({
          judge: 1
        })
      } else {
        this.setData({
          judge: 0
        })
      }
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);
      let firstDay = new Date(newYear, newMonth - 1, 1);
      this.data.firstDay = firstDay.getDay();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth,
        marLet: this.data.firstDay
      })
      if (this.data.month == newMonth) {
        this.setData({
          judge: 1
        })
      } else {
        this.setData({
          judge: 0
        })
      }
    }
  },
  dataTime: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var months = date.getMonth() + 1;

    //获取现今年份
    this.data.year = year;

    //获取现今月份
    this.data.month = months;

    //获取今日日期
    this.data.getDate = date.getDate();

    //最后一天是几号
    var d = new Date(year, months, 0);
    this.data.lastDay = d.getDate();

    //第一天星期几
    let firstDay = new Date(year, month, 1);
    this.data.firstDay = firstDay.getDay();
  },
  onshow: function () {
    this.setData({
      display: "block",
    })
  },
  onhide: function () {
    this.setData({
      display: "none",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var nickName='';
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        nickName = userInfo.nickName
        console.log(nickName)
        //console.log(res)
      }
    })
    this.setData({
      usrid: nickName
    });
    this.adminva(nickName);
    this.getdakaarr(nickName);

    this.setNowDate();
    this.getProWeekList()
    this.dataTime();
    var res = wx.getSystemInfoSync();
    this.setData({
      sysW: res.windowWidth / 9,//更具屏幕宽度变化自动设置宽度
      marLet: this.data.firstDay,
      getDate: this.data.getDate,
      judge: 1,
      month: this.data.month,
    });

    /**
     * 获取系统信息
     */
    console.log(that.data.month)
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,

      })
    }
    // console.log(that.data.nubmerLength)
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
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
  todaypassword: function (today) {
    var str = "" + b64_md5(String(today));
    str = ""+str.slice(-6);
    console.log(str.toUpperCase());  //返回字符串“JAVASCRIPT”
    this.setData({
      password_info: '\n'+'打卡密码为：'+str.toUpperCase()
    })
  },
  ondaka: function(){
    let date = new Date()
    let dateTime = date.getTime(); // 获取现在的时间
    let oneDayTime = 24 * 60 * 60 * 1000; //一天的时间
    console.log('打卡')
    console.log(Date(dateTime))
    console.log(Math.floor((dateTime+8*60*60*1000) / oneDayTime))
    if (this.data.admin == 2 || this.data.admin == 3){
      let checkindate1 = this.data.checkindate;
      checkindate1.push(Math.floor((dateTime + 8 * 60 * 60 * 1000) / oneDayTime))
      let arr2 = new Set(checkindate1)
      let arr3 = [...arr2]
      this.setData({
        checkincount: arr3.length,
        checkindate: arr3
      })
      console.log(this.data.checkindate)
      this.todaypassword(Math.floor((dateTime + 8 * 60 * 60 * 1000) / oneDayTime))
      this.calculateDays(date.getFullYear(), date.getMonth() + 1)
      //console.log('****************')
      //console.log(arr3.length+"****************"+arr2.size)
      if(arr3.length==arr2.size){
        this.setdakaarr(this.data.usrid, Math.floor((dateTime + 8 * 60 * 60 * 1000) / oneDayTime))
      }
    }else{
      var inputpwd = "" + this.data.dakapwd;
      var todaystr = "" + b64_md5(String(Math.floor((dateTime + 8 * 60 * 60 * 1000) / oneDayTime)));
      todaystr = "" + todaystr.slice(-6);
      if (todaystr.toUpperCase() == inputpwd.toUpperCase()){
        let checkindate1 = this.data.checkindate;
        checkindate1.push(Math.floor((dateTime + 8 * 60 * 60 * 1000) / oneDayTime))
        let arr2 = new Set(checkindate1)
        let arr3 = [...arr2]
        this.setData({
          checkincount: arr3.length,
          checkindate: arr3,
          password_info: ''
        })
        wx.showToast({
          title: '打卡成功',
          icon: 'none',
          duration: 2000
        })
        console.log(this.data.checkindate)
        this.calculateDays(date.getFullYear(), date.getMonth() + 1)
        if (arr3.length == arr2.size) {
          this.setdakaarr(this.data.usrid, Math.floor((dateTime + 8 * 60 * 60 * 1000) / oneDayTime))
        }
      }else{
        wx.showToast({
          title: '请输入正确密码',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  passWdInput: function (e) {
    this.setData({
      dakapwd: e.detail.value
    })
  },
  adminva:function(userid1){
    var _this=this;
    console.log(userid1);
    wx.request({
      url: 'http://120.55.168.67:8080/mr/user/adminvalue',
      data: {
        userid: userid1
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res);
        //_this.setData({
         // admin:res.data.data.admin
        //})
      }
    })
  },
  setdakaarr:function(userid1,newtime1){
    var _this = this;
    console.log('setdakaarr')
    wx.request({
      url: 'http://120.55.168.67:8080/mr/sign/addcheckinnewtime',
      data: {
        userid: userid1,
        newtime:newtime1
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log('加入时间'+newtime1)
        console.log(res.data.message)
      }
    })
  },
  getdakaarr:function(userid1){
    var _this = this;
    console.log('setdakaarr')
    wx.request({
      url: 'http://120.55.168.67:8080/mr/sign/getcheckinarr',
      data: {
        userid: userid1
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log(res);
        /*_this.setData({
          checkincount:res.data.data.count,
          checkindate:res.data.data.checkdatearr
        })
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        _this.calculateDays(cur_year, cur_month);*/
      }
    });
  }
})
