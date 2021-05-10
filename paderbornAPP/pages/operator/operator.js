import * as echarts from '../../ec-canvas/echarts';
var util = require('../../util/util.js');
const app = getApp();
//注意 ：： wx.getStorageSync 和 wx.setStorageSync 是固定写法
  //这里将内存中的数据读取出来并且保存到一个新变量中
Page({
  /**
   * 页面的初始数据
   */
  data: {
    up:[],
    pre:[],
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {
  this.onLoad()
	// 在此方法中实现数据加载的逻辑
},
  onLoad:function(){
    var that=this
    let up = wx.getStorageSync('app.globalData.up',app.globalData.up)
   that.setData({
     up:up
   })
   for(let i=0;i<app.globalData.up.length;i++){
     that.setData({
      pre : app.globalData.up[i].value
     })
  }
    console.log(that.data.up)
    console.log(that.data.pre)
  },
  jump:function(e){ 
    let type=e.currentTarget.dataset.text
    app.globalData.up[type].value=0
    console.log(app.globalData.up)
    try{
      //wx.setStorageSync写法 ： 第一个值是key  第二个值是数据
        wx.setStorageSync('app.globalData.up',app.globalData.up)
      }catch(e){  // 作用 用来告诉我们是否写入数据成功与否 也可以用这个
      //函数做其他的用途，这里我们就主要讲保存数据
        console.log('写入数据错误');
      }
  },
})