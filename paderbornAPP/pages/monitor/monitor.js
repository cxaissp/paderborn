var util = require('../../util/util.js')
import * as echarts from '../../ec-canvas/echarts';
var initChart = null
var app = getApp()

function setOption(chart, ylist) {
  var options = {
    title: {
      left: 'center'
    },
    color: ["#237ab7"],
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      show: true
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: "cross"
      }
    },
    axisPointer: {
      link: {xAxisIndex: 'all'},
      label: {
          backgroundColor: '#777'
      }
  },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['6s前', '5s前', '4s前', '3s前', '2s前', '1s前']
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      type: 'line',
      smooth: true,
      data: ylist
    }]
  }
  chart.setOption(options);
}

Page({
  data: {
    allParams: [{
        text: '径向力',
        value: 'force'
      },
      {
        text: '第一相电流',
        value: 'phase_current_1'
      },
      {
        text: '第二相电流',
        value: 'phase_current_2'
      },
      {
        text: '旋转速率',
        value: 'speed'
      },
      {
        text: '负荷扭矩',
        value: 'torque'
      },
      {
        text: '振动信号',
        value: 'vibration_1'
      }
    ],
    time: '',
    zcnum: ['fan1', 'fan2','fan3','fan4','fan5','fan6','fan7','fan8','fan9','fan10','fan11','fan12'],
    array: ['1_M01_F10','2_M01_F10','3_M01_F10','4_M01_F10','5_M07_F04','6_M07_F04','7_M07_F04','8_M07_F04','9_M07_F10','10_M07_F10','11_M07_F10','12_M07_F10'],
    allConditionName: ['径向力','第一相电流','第二相电流','旋转速率','负荷扭矩','振动信号'],
    index: 0,
    index2: 0,
    predict:[],
    labels: [],
    result: [],
    series: [],
    i: 0,
    timer: '',
    timer2: '',
    chartTimer: '',
    ec: {
      lazyLoad: true
    }
  },
  onLoad: function () {
    this.getAllParamsDatas('1_M01_F10')
    this.setData({
      time: util.formatTime(new Date()),
    })
    this.oneComponent = this.selectComponent('#mychart-dom-line');
  },
   //获取单个工况原始数据
   getSingParamData: function (fanId, attr, callback) {
    var that = this
    wx.request({
      url: 'https://phmlearn.com/component/data/paderborn',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        device_id: fanId,
        attribute: attr
      },
      success: function (res) {
        callback(res)
      }
    })
  },

  //获取所有工况数据
  getAllParamsDatas: function (fanId) {
    const allParamsName = this.data.allParams;  //定义一个常量
    let promises = []       //定义一个变量
    for (let i = 0; i < allParamsName.length; i++) {
      let paramsKey = allParamsName[i].value
      if(i == 0){

        this.getSingParamData(fanId,paramsKey,res=>{
          this.getChartdata(res.data.data.force)
        })
        promises.push(this.getSingParamData(fanId, paramsKey, res => {
          const data = res.data.data.force
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)       //result数组初始化数组为空数组
            }
          })
        }))
      }
      else if(i==1){
        promises.push(this.getSingParamData(fanId, paramsKey, res => {
          const data = res.data.data.phase_current_1
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)       //result数组初始化数组为空数组
            }
          })
        }))  
      }
      else if(i==2){
        promises.push(this.getSingParamData(fanId, paramsKey, res => {
          const data = res.data.data.phase_current_2
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)       //result数组初始化数组为空数组
            }
          })
        }))  
      }
      else if(i==3){
        promises.push(this.getSingParamData(fanId, paramsKey, res => {
          const data = res.data.data.speed
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)       //result数组初始化数组为空数组
            }
          })
        }))  
      }
      else if(i==4){
        promises.push(this.getSingParamData(fanId, paramsKey, res => {
          const data = res.data.data.torque
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)       //result数组初始化数组为空数组
            }
          })
        }))  
      }
      else if(i==5){
        promises.push(this.getSingParamData(fanId, paramsKey, res => {
          const data = res.data.data.vibration_1
          this.setData({
            [`result[${i}]`]: {
              key: allParamsName[i].text,
              max: util.getMaxValue(data),
              min: util.getMinValue(data),
              arr: util.getDataArray(data)       //result数组初始化数组为空数组
            }
          })
        }))  
      }
    }
    Promise.all(promises).then(res => {
      this.startTimer();
      this.setDate()
    })
  },
  //获取折线图数据
  getChartdata: function (array) {
    wx.showLoading({
      title: '折线图加载中',
    })
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
    let index = 0
    this.setData({
      chartTimer: setInterval(() => {
        if (index <= 3000) {
          this.setData({
            ylist: array.slice(index, index + 6)
          })
          index++
        } else {
          this.closeTimer(this.data.chartTimer)
          this.setData({
            ylist: array.slice(array.length - 7, array.length - 1)
          })
        }
        this.oneComponent.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          setOption(chart, this.data.ylist) //赋值给echart图表
          this.chart = chart;
          wx.hideLoading()
          return chart;
        });
      }, 2000)
    })
  },
  //开启刷新时间定时器
  setDate: function () {
    this.setData({
      timer2: setInterval(() => {
        this.setData({
          time: util.formatTime(new Date())
        })
      }, 1000)
    })
  },
  //开启刷新数据定时器
  startTimer: function () {
    this.setData({
      i: 0
    })
    this.setData({
      timer: setInterval(() => {
        if (this.data.i <= 3000) {
          this.setData({
            i: this.data.i + 1
          })
        } else {
          this.setData({
            i: 0
          })
          this.closeTimer(this.data.timer)
          this.closeTimer(this.data.timer2)
        }
      }, 1000)
    })
  },
  //关闭定时器
  closeTimer: function (time) {
    clearInterval(time)
  },

  getfeatureData: function (index, callback) {
    var that = this
    wx.request({
      url: 'https://phmlearn.com/component/upload/2/426',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        file_name: this.data.array[index]+"_test.csv"
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
        let predict = res.data.data.predict;
        that.setData({
          predict:predict,
        })
        callback(res)
      }
    })
  },
  //切换设备picker
  bindPickerChange: function (e) {
    let arr = ['1_M01_F10','2_M01_F10','3_M01_F10','4_M01_F10','5_M07_F04','6_M07_F04','7_M07_F04','8_M07_F04','9_M07_F10','10_M07_F10','11_M07_F10','12_M07_F10']
    this.closeTimer(this.data.timer)
    this.closeTimer(this.data.timer2)
    var that = this
    that.setData({
      index: e.detail.value
    })
    that.getfeatureData(that.data.index, res=>{
      that.getpredictData( res=>{
        let predict = res.data.data.predict;
        that.setData({
          predict:predict,
        })
        console.log(that.data.predict)
    })
  })

    let j = this.data.index
    // let fanid = this.data.zcnum[j]
    // this.getLabel(fanid)
    this.getAllParamsDatas(arr[j])
  },
  //切换工况picker
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
    let index = e.detail.value
    let arr = this.data.result[index].arr
    this.getChartdata(arr)
  },

  //页面卸载时清空定时器
  onUnload: function () {
    if (this.data.timer) {
      this.closeTimer(this.data.timer)
    }
    if (this.data.timer2) {
      this.closeTimer(this.data.timer2)
    }
    if (this.data.chartTimer) {
      this.closeTimer(this.data.chartTimer)
    }
  }
})