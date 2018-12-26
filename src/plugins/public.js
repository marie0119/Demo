var publicFun=function() {
  var self = {};
//处理时间戳
  self.formatDate = function (now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date;
  }
  return self;
}();
export {
  publicFun
}
