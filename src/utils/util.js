/**
 * 获取月日mm-dd
 * @param dateObj
 * @param callback
 */
exports.getMouthDay = (dateObj, callback) => {
  let mouth = dateObj.getMonth();
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  mouth = mouth + 1;
  if (mouth < 10) {
    mouth = '0' + mouth;
  }
  let da = mouth + '-' + day;
  callback(da);
};
/**
 * 获取月日xx年xx月
 * @param dateObj
 * @param callback
 */
exports.getYearMouth = (dateObj, callback) => {
  let year = dateObj.getFullYear();
  let mouth = dateObj.getMonth();
  mouth = mouth + 1;
  if (mouth < 10) {
    mouth = '0' + mouth;
  }
  let da = year + '年' + mouth + '月';
  callback(da);
};
/**
 * 上个月
 * @param dateObj
 * @param callback
 */
exports.preMouth = (dateObj, callback) => {
  let time = dateObj.getTime();
  let cu = new Date(time);
  let curMonth = cu.getMonth();
  let c = new Date(time);
  c.setMonth(curMonth);
  c.setDate(0);
  cu.setTime(c.getTime() - 3600 * 1000 * 24 * cu.getDate());
  callback(cu)
};
/**
 * 下一月
 * @param dateObj
 * @param callback
 */
exports.nextMouth = (dateObj, callback) => {
  let time = dateObj.getTime();
  let cu = new Date(time);
  let curMonth = cu.getMonth();
  let c = new Date(time);
  c.setMonth(curMonth + 1);
  c.setDate(0);
  cu.setTime(c.getTime() + 3600 * 1000 * 24 * cu.getDate());
  callback(cu)
};

/**
 * 获取今天明天月日mm-dd
 * @param dateObj
 * @param callback
 */
exports.getFirstLastMouthDay = (dateObj, callback) => {
  //今天
  let mouth = dateObj.getMonth();
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  mouth = mouth + 1;
  if (mouth < 10) {
    mouth = '0' + mouth;
  }
  //明天
  let lastMouthDay = new Date((dateObj.getTime() - 3600 * 1000 * 24));
  let mouths = lastMouthDay.getMonth();
  let days = lastMouthDay.getDate();
  if (days < 10) {
    days = '0' + days;
  }
  mouths = mouths + 1;
  if (mouths < 10) {
    mouths = '0' + mouths;
  }
  let first = mouth + '-' + day;
  let last = mouths + '-' + days;
  callback({'first': first, 'last': last});
};
/**
 * 获取年月日YYYY-mm-dd
 * @param dateObj
 * @param callback
 */
exports.getYearMouthDay = (dateObj, callback) => {
  let mouth = dateObj.getMonth();
  let year = dateObj.getFullYear();
  let day = dateObj.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  mouth = mouth + 1;
  if (mouth < 10) {
    mouth = '0' + mouth;
  }
  let da = year + '-' + mouth + '-' + day;
  callback(da);
};
/**
 * 获取每周对应的日期
 * @param dateObj
 * @param callback
 */
exports.getWeekDay = (dateObj, callback) => {
  let firstArr = [];
  let currentArr = [dateObj];
  let lastArr = [];
  let week = dateObj.getDay();
  if (week === 0) {
    week = 7;
  }
  for (let i = 1; i < week; i++) {
    firstArr.push(new Date((dateObj.getTime() - 3600 * 1000 * 24 * i)));
  }
  for (let i = 1; i < 8 - week + 1; i++) {
    lastArr.push(new Date((dateObj.getTime() + 3600 * 1000 * 24 * i)));
  }
  firstArr = firstArr.reverse();
  callback(firstArr.concat(currentArr, lastArr));
};
/**
 * 获取一年每一天
 * @param dateObj
 * @param callback
 */
exports.getYearDayText = (dateObj, callback) => {
  let yearText = [];
  let year = dateObj.getFullYear();
  let isLeap = (0 === year % 4) && (0 === year % 100) || (0 === year % 400);
  let dayCount = isLeap ? 366 : 365;
  let e = new Date();
  e.setDate(1);
  e.setMonth(0);
  for (let i = 0; i < dayCount; i++) {
    yearText.push(new Date((e.getTime() + 3600 * 1000 * 24 * i)));
  }
  callback(yearText);
};
/**
 * 42天时间对象
 * @param dateObj
 * @param callback
 */
exports.get42Day = (dateObj, callback) => {
  let firstArr = [];//上个月
  let currentArr = [];//这个月的天数
  let nextArr = [];//下个月的天数
  let c ='';
  //查看本月第一天星期几
  let preMouth = new Date(dateObj.getTime());
  preMouth.setDate(0);
  let thefirestdateday = preMouth.getDay();
  //补足上个月天数
  for(let i=0;i<=thefirestdateday;i++){
    c= '';
    let msg = new Date((preMouth.getTime() - 3600 * 1000 * 24 * i));
    firstArr.unshift({'c':`pre ${c}`,'text':msg});
  }
  //这个月的天数
  let currentMouth = new Date(dateObj.getTime());
  let curMonth =currentMouth.getMonth();
  currentMouth.setMonth(curMonth +1);
  currentMouth.setDate(0);
  let curDate = currentMouth.getDate();
  for(let i=1;i<=curDate;i++){
    c= '';
    let msg = new Date(((firstArr[(firstArr.length)-1]).text.getTime() + 3600 * 1000 * 24 * i));
    if(msg.getDate() === dateObj.getDate()){
      c = 'item'
    }
    currentArr.push({'c':`current ${c}`,'text':msg});
  }
  //补足下个月的天数
  let cur = parseInt(currentArr.length);
  let pre = parseInt(firstArr.length);
  let next = 42 - (cur+ pre);
  for(let i=1;i<=next;i++){
    c= '';
    let msg = new Date(((currentArr[currentArr.length-1]).text.getTime() + 3600 * 1000 * 24 * i));
    nextArr.push({'c':`pre ${c}`,'text':msg});
  }
  callback(firstArr.concat(currentArr, nextArr));
};
