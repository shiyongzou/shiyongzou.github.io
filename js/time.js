function getMissTime() {
  let missElement = document.getElementsByClassName('miss_time')[0];
  // 指定日期和当前日期
  var specifiedDate = new Date('2023-01-29');
  var currentDate = new Date();

  // 计算时间差（毫秒数）
  var timeDiff = currentDate.getTime() - specifiedDate.getTime();

  // 转换为天数、小时数、分钟数和秒数
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  timeDiff -= days * (1000 * 60 * 60 * 24);

  var hours = Math.floor(timeDiff / (1000 * 60 * 60));
  timeDiff -= hours * (1000 * 60 * 60);

  var minutes = Math.floor(timeDiff / (1000 * 60));
  timeDiff -= minutes * (1000 * 60);

  var seconds = Math.floor(timeDiff / 1000);
  missElement.innerHTML = `跟我郑美女认识了差不多有${days}天${hours}小时${minutes}分钟${seconds}秒了`;
}
// getMissTime();
// setInterval(getMissTime, 1000);