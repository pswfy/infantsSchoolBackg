exports.multipleMouth = (myChart) => {
  myChart.setOption({
    //标题
    title: {
      text: '月班级到勤率',
      textStyle: {
        color: '#5793f3',
        fontWeight: 200,
        fontSize: 12,
      }
    },
    color: ['#0bae26','#0fdf76', '#158ef4', '#00f0ff', '#6b75fb'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['小(1)班', '小(2)班', '小(3)班', '小(4)班', '小(5)班', '小(6)班', '小(7)班', '小(8)班', '小(9)班'],
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
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
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
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
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
    series: [
      {
        name: '小(1)班',
        type: 'line',
        smooth: true,
        data: [90, 97, 89, 89, 98, 93, 95, 99, 98, 89, 90, 89]
      },
      {
        name: '小(2)班',
        type: 'line',
        smooth: true,
        data: [93, 95, 99, 98, 89, 91, 94, 96, 80, 92, 78, 98]
      },
      {
        name: '小(3)班',
        type: 'line',
        smooth: true,
        data: [92, 100, 94, 100, 90, 90, 97, 89, 89, 98, 93, 95]
      },
      {
        name: '小(4)班',
        type: 'line',
        smooth: true,
        data: [91, 94, 96, 80, 92, 89, 100, 96, 75, 87, 78, 98]
      },
      {
        name: '小(5)班',
        type: 'line',
        smooth: true,
        data: [74, 90, 80, 86, 78, 92, 89, 100, 96, 75, 87, 98]
      },
      {
        name: '小(6)班',
        type: 'line',
        smooth: true,
        data: [73, 80, 90, 96, 73, 78, 78, 99, 89, 79, 87, 78]
      },
      {
        name: '小(7)班',
        type: 'line',
        smooth: true,
        data: [100, 96, 89, 72, 94, 73, 80, 90, 96, 73, 89, 90]
      },
      {
        name: '小(8)班',
        type: 'line',
        smooth: true,
        data: [89, 100, 96, 75, 87, 100, 96, 89, 72, 94, 89, 78]
      },
      {
        name: '小(9)班',
        type: 'line',
        smooth: true,
        data: [78, 79, 94, 95, 97, 89, 100, 96, 75, 87, 89, 90]
      }
    ]
  });
};
