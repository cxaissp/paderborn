// pages/admin/admin.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  /**
   * 组件的方法列表
   */
  methods: {
    navToPre_admin(){
      wx.navigateTo({
        url: '/pages/administrators/administrators',
      })
    },
    navToPre_operator(){
      wx.navigateTo({
        url: '/pages/monitor/monitor',
      })
    },
  navToPre_1(){
    wx.navigateTo({
      url: '/pages/current/current',
    })
  },
  navToPre_2(){
    wx.navigateTo({
      url: '/pages/monitornew/monitornew',
    })
  },
  },
})
