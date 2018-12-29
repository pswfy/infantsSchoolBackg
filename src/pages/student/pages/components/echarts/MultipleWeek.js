exports.multipleWeek = (myChart, dataMsg, data,weekText,color) => {
  let dataMag = [];
  for (let i = 0; i < data.length; i++) {
    dataMag.push(data[i].name)
  }
  myChart.setOption({
    //标题
    title: {
      text: '周班级到勤率',
      textStyle: {
        color: '#5793f3',
        fontWeight: 200,
        fontSize: 12,
      }
    },
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: dataMag,
      selectedMode: 'Multiple'
    },
    grid: {
      top: 70,
      bottom: 30,
      containLabel: false,
      left: 50,
      right: 50
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
        data: weekText
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#5793f3'
          }
        },
        data: dataMsg
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        },
        max: 110,
        min: 70,
        nameTextStyle: 'oblique',
        interval: 10,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#5793f3'
          }
        },
      }
    ],
    series: data
  });
};
