//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      input_fileName: "data_602541757299269579.csv",
      access_token: "4d14583181064de69d0fd17fba5a3541.cc1f5243e2ef7a804146057d89e6e353",
      output_fileName: ' ',
      data0 : [],
      data1 : [],
      predict:[],
      result: [],
      up:[],
    }
  }

})