import * as echarts from '../../ec-canvas/echarts';


const app = getApp();

var barec = null;

const getPixelRatio = () => {
  let pixelRatio = 0
  wx.getSystemInfo({
    success: function (res) {
      pixelRatio = res.pixelRatio
    },
    fail: function () {
      pixelRatio = 0
    }
  })
  return pixelRatio
}
// console.log(pixelRatio)
var dpr = getPixelRatio();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    file_names:[
      "1_M01_F10",
      "2_M01_F10",
      "3_M01_F10",
      "4_M01_F10",
      "5_M07_F04",
      "6_M07_F04",
      "7_M07_F04",
      "8_M07_F04",
      "9_M07_F10",
      "10_M07_F10",
      "11_M07_F10",
      "12_M07_F10",
    ],
    index: 0,
    rate: 200,
    ec: {
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(barec);
        return barec;
      }
    },

    predict:[],
    resultName:[{
      text: '准确率：',
      value: 'accuracy'
    },
    {
      text: '召回率：',
      value: 'recall'
    },
    {
      text: '精确率：',
      value: 'precision'
    },
  ],
  result:[],
  },

  getfeatureData: function (index, rate, callback) {
    var that = this
    wx.request({
      url: 'https://phmlearn.com/component/upload/2/426',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        access_token: app.globalData.access_token,
        file_name: this.data.file_names[index]+"_test.csv"
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
        let result = res.data.data.result;
        const resultName= that.data.resultName;
        that.setData({
          predict:predict,
          [`result[${0}]`]: {
            key: resultName[0].text,
            accuracy: result['accuracy'],
          },
          [`result[${1}]`]: {
            key: resultName[1].text,
            recall: result['recall'],
          },
          [`result[${2}]`]: {
            key: resultName[2].text,
            precision: result['precision'],
          }
        })
        callback(res)
      }
    })
  },
  //切换设备picker
  bindPickerChange: function (e) {
    var that = this
    that.setData({
      index: e.detail.value
    })
    that.getfeatureData(that.data.index, that.data.rate, res=>{
      that.getpredictData( res=>{
        var count0=0
        var count1=0
        var count2=0
        var count3=0
        var count4=0
        var predict=that.data.predict
        for(var i=0 ;i<predict.length;i++){
          if(predict[i]==0)count0=count0+1
          if(predict[i]==1)count1=count1+1
          if(predict[i]==2)count2=count2+1
          if(predict[i]==3)count3=count3+1
          if(predict[i]==4)count4=count4+1
        }
      console.log([count0, count1, count2, count3, count4])
      app.globalData.data0=[count0, , , , ]
      app.globalData.data1=[ , count1, count2, count3, count4]
      console.log(app.globalData.data0)
      var option=({
        color: ['#669900', '#FF3300'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          confine: true
        },
        legend: {
          data: ['轴承状态健康', '轴承状态故障']
        },
        grid: {
          left: 20,
          right: 20,
          bottom: 15,
          top: 40,
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['轴承状态健康', '外环损伤1级', '外环损伤2级', '内环损伤1级','内环损伤2级'],
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#666'
            }
          }
        ],
        series: [
          {
            name: '轴承状态健康',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data:app.globalData.data0,
            itemStyle: {
              // emphasis: {
              //   color: '#37a2da'
              // }
            }
          },
          {
            name: '轴承状态故障',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true
              }
            },
            data: app.globalData.data1,
            itemStyle: {
              // emphasis: {
              //   color: '#32c5e9'
              // }
            }
          }
        ],
      })
      barec.setOption(option)
      that.setData({rate:100 * count0 / 50});
      wx.hideLoading(); 
      })  
    })
},
navToPre_fault(){
  wx.navigateTo({
    url: '/pages/administrators/fault/fault',
  })
},
navToPre_normal(){
  wx.navigateTo({
    url: '/pages/administrators/normal/normal',
  })
},
})