exports.singleDay = (myChart,timeData,data,year,color) => {
  let dataMag = [];
  for (let i = 0; i < data.length; i++) {
    dataMag.push(data[i].name)
  }
  timeData = timeData.map(function (str) {
    return str.replace(`${year}-`, '');
  });
  myChart.setOption({
    title: {
      text: '日班级考勤',
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
        animation: false
      }
    },
    legend: {
      data: dataMag,
      x: 'center',
      selectedMode: 'single'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    axisPointer: {
      link: {xAxisIndex: 'all'}
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: [0, 1]
      },
      {
        type: 'inside',
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: [0, 1]
      }
    ],
    grid: [{
      left: 50,
      right: 50,
      height: '35%'
    }, {
      left: 50,
      right: 50,
      top: '55%',
      height: '35%'
    }],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#5793f3'
          }
        },
        data: timeData,
      },
      {
        gridIndex: 1,
        type: 'category',
        boundaryGap: false,
        data: timeData,
        axisLine: {
          onZero: true,
          lineStyle: {
            color: '#9899f9'
          }
        },
        position: 'top'
      }
    ],
    yAxis: [
      {
        name: '到勤率(%)',
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        },
        max: 100,
        min: 0,
        interval: 20,
        nameTextStyle: 'oblique',
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#5793f3'
          }
        },
      },
      {
        gridIndex: 1,
        name: '缺勤率(%)',
        type: 'value',
        inverse: true,
        axisLabel: {
          formatter: '{value} %'
        },
        max: 100,
        min: 0,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#9899f9'
          }
        },
      }
    ],
    series: data
  });
};
