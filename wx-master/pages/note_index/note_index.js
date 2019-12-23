//index.js
//��ȡӦ��ʵ��
const app = getApp();

Page({
    data: {
        list: [],
        index: 0,
        dates: '2019-12-18',
        chexkStatus: false,
        chexkItem: false,
        url: "../images/check_false.png",
        uid: ""
    },
    onLoad: function (options) {
      // 这里要获取一个用户id
      this.setData({uid: options.uid})
      this.getNoteDate()
    },

    // 获取记事本列表数据
    getNoteDate(){
      var that = this
      wx.request({
        // 这个地方要拼接一个用户id
        url: 'http://120.55.168.67:8080/mr/note/findByUid',
        header: {
          "Content-Type": "application/json" // 默认值
        },
        data: {
          uid: this.data.uid
        },
        success(res) {
          if(res.statusCode === 200) {
            that.setData({
              list: res.data.data
            })
            console.log("222"+ res.data.data)
          }
        },
        fail(err) {
          console.log(err+ "1111")
        }
      })
    },

    onShow() {
    },

   backHomePage() {
     wx.navigateTo({
       url: '../homeNormal/homeNormal',
     })
   },

    add() {
        wx.navigateTo({
            url: '../note_editor/note_editor',
        })
    },
    editor() {
        this.setData({
            chexkStatus: true
        })
    },
    check(e) {
        var newList = this.data.list;
        var num = ~~e.currentTarget.dataset.index;
        if (e.currentTarget.dataset.src === '../images/check_false.png') {
            newList[num].check = true;
        } else {
            newList[num].check = false;
        }
        this.setData({
            list: newList
        })
    },
    delHandel() {
        var obj = this.data.list;
        var arr = [];
        for (var i in obj) {
            if (arr.length > 1) {
                wx.showToast({
                  title: '只能选中一条',
                  icon: 'error',
                  duration: 1000
                })
                break;
            } else {
                if (obj[i].check) {
                    wx.request({
                      url: 'http://120.55.168.67:8080/mr/note/deleteByNid/' + obj[i].nid,
                      header:{
                        'content-type': 'application/json' // 默认值
                      },
                      success:function(res){
                        console.log("----")
                        arr.push(i)
                        wx.showToast({
                          title: "删除成功"
                        })
                      }
                    })
                }
            }
        }
        obj.splice(arr[0], 1);
        this.setData({
            list: obj
        })
        wx.setStorageSync('searchLog', JSON.stringify(obj));
    },
    save() {
        this.setData({
            chexkStatus: false
        })
    },
    nodeDetail(e) {
      let nid = e.data-nid
      console.log("111111"+nid)
      wx.navigateTo({
        url: `../note_editor/note_editor?nid=nid`
      })
    },
    onShareAppMessage: function () {
        return {
          title: '记事本见过吗',
          desc: '第一个让我忘不掉的记事本',
          path: '/pages/note_index/note_index'
        }
    }
})
