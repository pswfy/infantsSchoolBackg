exports.singleWeek = (myChart, dataMsg, data, weekText,color) => {
  let dataMag = [];
  for (let i = 0; i < data.length; i++) {
    dataMag.push(data[i].name)
  }
  myChart.setOption({
    //颜色
    color: color,
    //鼠标移入提示
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      //班级
      data: dataMag,
      selectedMode: 'single'
    },
    //定位
    grid: {
      top: 90,
      bottom: 30,
      containLabel: false,
      left: 50,
      right: 50
    },
    //下载
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#5793f3'
          }
        },
        //星期
        data: weekText
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#5793f3'
          }
        },
        //日期
        data: dataMsg
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        },
        max: 120,
        min: -20,
        interval: 20,
        nameTextStyle: 'oblique',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#5793f3'
          }
        },
      }
    ],
    //数据
    series: data
  });
};
