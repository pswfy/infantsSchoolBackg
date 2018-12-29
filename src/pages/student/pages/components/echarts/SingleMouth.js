exports.singleMouth = (myChart) => {
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
    //颜色
    color: ['#0bae26','#0fdf76', '#158ef4', '#00f0ff', '#6b75fb'],
    //鼠标移入提示
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['小(1)班', '小(2)班', '小(3)班', '小(4)班', '小(5)班', '小(6)班', '小(7)班', '小(8)班', '小(9)班'],
      selectedMode: 'single'
    },
    //定位
    grid: {
      top: 70,
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
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
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
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
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
    series: [
      {
        name: '小(1)班',
        type: 'line',
        smooth: true,
        data: [93, 95, 99, 98, 89, 87, 78, 90, 67, 56, 76, 78],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(2)班',
        type: 'line',
        smooth: true,
        data: [93, 95, 99, 98, 89, 87, 78, 90, 67, 56, 76, 78],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(3)班',
        type: 'line',
        smooth: true,
        data: [93, 95, 99, 98, 100, 77, 88, 69, 97, 86, 66, 98],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(4)班',
        type: 'line',
        smooth: true,
        data: [93, 95, 99, 98, 79, 87, 98, 79, 89, 89, 69, 97],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(5)班',
        type: 'line',
        smooth: true,
        data: [93, 98, 99, 98, 89, 89, 99, 99, 86, 85, 79, 99],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(6)班',
        type: 'line',
        smooth: true,
        data: [96, 91, 79, 97, 89, 99, 69, 69, 66, 75, 89, 69],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(7)班',
        type: 'line',
        smooth: true,
        data: [76, 94, 89, 67, 59, 89, 99, 69, 66, 75, 89, 69],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(8)班',
        type: 'line',
        smooth: true,
        data: [76, 94, 89, 67, 59, 89, 99, 69, 66, 75, 89, 69],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      },
      {
        name: '小(9)班',
        type: 'line',
        smooth: true,
        data: [76, 94, 89, 67, 59, 89, 99, 69, 66, 75, 89, 69],
        markArea: {
          data: [[{
            name: '本月',
            xAxis: '三月'
          }, {
            xAxis: '四月'
          }], [{
            xAxis: ''
          }, {
            xAxis: ''
          }]]
        },
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      }
    ]
  });
};
