import * as echarts from '../../ec-canvas/echarts';
var util = require('../../util/util.js');
const app = getApp();
let up1=[];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time:util.formatTime(new Date()),
    file_names:[{
      id:1,
      te:"1_M01_F10",
    },
    {
      id:2,
      te:"2_M01_F10",
    },
    {
      id:3,
      te:"3_M01_F10",
    },
    {
      id:4,
      te:"4_M01_F10",
    },
    {
      id:5,
      te:"5_M07_F04",
    },
    {
      id:6,
      te:"6_M07_F04",
    },
    {
      id:7,
      te:"7_M07_F04",
    },
    {
      id:8,
      te:"8_M07_F04",
    },
    {
      id:9,
      te:"9_M07_F10",
    },
    {
      id:10,
      te:"10_M07_F10",
    },
    {
      id:11,
      te:"11_M07_F10",
    },
    {
      id:12,
      te:"12_M07_F10",
    },
    ],
    index: [],
    pre:[],
    up:[],
    fault: [ '外环损伤1级', '外环损伤2级', '内环损伤1级','内环损伤2级'],
  },
  onPullDownRefresh: function() {
    // 在此方法中实现数据加载的逻辑
    this.onLoad()
    this.change()
  },
  onLoad: function () {
    this.setData({
      time: util.formatTime(new Date()),
    })
  },

  getfeatureData: function (id,  callback) {
    var that = this
    wx.request({
      url: 'https://phmlearn.com/component/upload/2/426',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        file_name: this.data.file_names[id].te+"_test.csv"
      },
      success: function (res) {
        app.globalData.output_fileName = res.data.data.file_name;
        callback(res)
      }
    })
  },
 getpredictData: function (callback){
   var that=this
    wx.request({
      url: 'https://phmlearn.com/component/upload/ML/model/196/431',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        file_name: app.globalData.output_fileName
      },
      success: function (res) {
        callback(res)
      }
    })
  },

  change: function (e) {
    var that=this
    let up = wx.getStorageSync('app.globalData.up',app.globalData.up)
    console.log(up)
    console.log(this.data.up)
    if(this.data.up!=null){
    for(let i=0;i<up.length;i++){
      this.data.up[up[i].id].value=up[i].value
    }
  }
    console.log(this.data.up)
},
up:function(e){
  var fault=[ '外环损伤1级', '外环损伤2级', '内环损伤1级','内环损伤2级'];
  let i=0;
    this.getfeatureData(0,res=>{
      this.getpredictData( res=>{
        let predict = res.data.data.predict;
        const name= this.data.file_names[0].te;
        for(let j=0;j<=49;j++){
          if(predict[j]==1){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[0],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==2){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[1],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==3){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[2],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==4){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[3],
                time:this.data.time,
              }
            })
            i=i+1
          }
        }
      }) 
    })

    this.getfeatureData(4,res=>{
      this.getpredictData( res=>{
        let predict = res.data.data.predict;
        const name= this.data.file_names[4].te;
        for(let j=0;j<=49;j++){
          if(predict[j]==1){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[0],
                time:this.data.time,
              }
            })
          }
          if(predict[j]==2){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[1],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==3){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[2],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==4){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[3],
                time:this.data.time,
              }
            })
            i=i+1
          }
        }
      }) 
    })
  

    this.getfeatureData(8,res=>{
      this.getpredictData( res=>{
        let predict = res.data.data.predict;
        const name= this.data.file_names[8].te;
        for(let j=0;j<=49;j++){
          if(predict[j]==1){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[0],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==2){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[1],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==3){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[2],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==4){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[3],
                time:this.data.time,
              }
            })
            i=i+1
          }
        }
      }) 
    })
  

    this.getfeatureData(9,res=>{
      this.getpredictData( res=>{
        let predict = res.data.data.predict;
        const name= this.data.file_names[9].te;
        for(let j=0;j<=49;j++){
          if(predict[j]==1){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[0],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==2){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[1],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==3){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[2],
                time:this.data.time,
              }
            })
            i=i+1
          }
          if(predict[j]==4){
            this.setData({
              [`up[${i}]`]: {
                id:i,
                key:name,
                value:predict[j],
                text:fault[3],
                time:this.data.time,
              }
            })
            i=i+1
          }
        }
      }) 
    })
  },
  jump:function(e){ 
    this.setData({
      index:this.data.index.concat(e.currentTarget.dataset.text),
    })
    let index=this.data.index
    var i=e.currentTarget.dataset.text
    if(e.currentTarget.dataset.text<20){
      console.log(index.length)
      app.globalData.up=app.globalData.up.concat(this.data.up[i])
    }
    else if(e.currentTarget.dataset.text==20){
      app.globalData.up=this.data.up
    }
    try{
        wx.setStorageSync('app.globalData.up',app.globalData.up)
      }catch(e){ 
        console.log('写入数据错误');
      }
    console.log(this.data.index)
    console.log(app.globalData.up)
  },
})