const baseUrl = 'https://api.smartstudy.com/school';

function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, methodtype, params, message, success, fail) {
  console.log(params)
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: getUrl(url),
    data: params,
    header: {
      'Content-Type': 'application/json'
    },
    method: methodtype,
    success: function(res) {
      //console.log(res.data)
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function(res) {
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function(res) {

    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}