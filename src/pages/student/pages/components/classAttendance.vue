<template>
  <div class="class-attendance">
    <div class="table-body-title">
      <el-button type="primary" icon="el-icon-date" size="mini" @click="onWeek">周视图</el-button>
      <el-button type="primary" icon="el-icon-date" size="mini" @click="onDay">日视图</el-button>
      <el-button type="primary" icon="el-icon-date" size="mini" @click="onMonth">月视图</el-button>
      <el-button type="primary" icon="el-icon-news" @click="singleOnclick" size="mini">单视图</el-button>
      <el-button type="primary" icon="el-icon-news" @click="multipleOnclick" size="mini">多视图</el-button>
    </div>
    <!--时间选择器-->
    <div class="view">
      <div class="view-nav">
        <div class="view-nav-title">
          <span class="el-icon-date">{{title.weekTitle}}</span>
          <span class="el-icon-news">{{title.weekView}}</span>
        </div>
        <div class="tile">
          <i class="icon iconfont icon-fanhui1" @click="goNextMonth"></i>
          <span>{{timeDateMsg}}</span>
          <i class="icon iconfont icon-fanhui2" @click="goPrevMonth"></i>
        </div>
        <div class="table-peal">
          <div class="row-header">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>
          <div class="row" :key="index" v-for="(item,index) in the42data">
            <span @click="onDateClick(items.text)" :key="ins" v-for="(items,ins) in item" :class="items.c">{{items.text | capitalize}}</span>
          </div>
        </div>
        <div class="data-view" @click="onShowHideView">
          <i class="icon iconfont icon-shuju3 pre"></i>
          <span class="text" :class="{'active':showHideTable}">数据视图</span>
          <i class="icon iconfont icon-icon_more next"></i>
        </div>
        <div class="table-view" @click="onShowHideTable">
          <i class="icon iconfont icon-fsux_tubiao_biaoge pre"></i>
          <span class="text" :class="{'active':!showHideTable}">表格视图</span>
          <i class="icon iconfont icon-icon_more next"></i>
        </div>
      </div>
      <div class="view-body">
        <div class="table-a" v-show="showHideTable">
          <!--周视图-->
          <div v-show='week' class="week">
            <!--单线-->
            <div ref="singleId" v-show="single" :style="{ height: '400px'}"></div>
            <!--多线-->
            <div ref="multipleId" v-show="Multiple" :style="{height: '400px'}"></div>
          </div>
          <!--日视图-->
          <div v-show="day" class="week">
            <!--单线-->
            <div ref="singleDayRef" v-show="single" :style="{ height: '600px'}"></div>
            <!--多线-->
            <div ref="multipleDayRef" v-show="Multiple" :style="{height: '600px'}"></div>
          </div>
          <!--月视图-->
          <div v-show="month" class="week">
            <!--单线-->
            <div ref="singleMonthRef" v-show="single" :style="{ height: '400px'}"></div>
            <!--多线-->
            <div ref="multipleMonthRef" v-show="Multiple" :style="{height: '400px'}"></div>
          </div>
        </div>
        <!--班级考勤表格-->
        <div class="table-c" v-show="!showHideTable">
          <!--周视图-->
          <div v-show='week' class="week">
            <div v-show="single || Multiple">
              <s-tableWeek/>
            </div>
          </div>
          <!--日视图-->
          <div v-show="day" class="week">
            <div v-show="single || Multiple">
              <s-tableDay/>
            </div>
          </div>
          <!--月视图-->
          <div v-show="month" class="week">
            <div v-show="single || Multiple">
              <s-tableMouth/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tableWeek from './table/tableWeek';
  import tableDay from './table/tableDay';
  import tableMouth from './table/tableMouth';
  import {singleWeek} from './echarts/SingleWeek.js';
  import {multipleWeek} from './echarts/MultipleWeek.js';
  import {singleDay} from './echarts/singleDay.js';
  import {multipleDay} from './echarts/MultipleDay.js';
  import {singleMouth} from './echarts/SingleMouth.js';
  import {multipleMouth} from './echarts/MultipleMouth.js';
  import {
    getMouthDay,
    getWeekDay,
    getYearMouthDay,
    getYearDayText,
    getFirstLastMouthDay,
    getYearMouth,
    preMouth,
    nextMouth,
    get42Day,
  } from '../../../../utils/util';

  export default {
    components: {
      's-tableWeek': tableWeek,
      's-tableDay': tableDay,
      's-tableMouth': tableMouth
    },
    data() {
      return {
        showHideTable:true,
        the42data: [],
        title: {
          weekTitle: '周视图',
          weekView: '单视图'
        },
        weekText: ["周一", "周二", "周三", "周四", "周五", "周六", "周日", "下周"],
        color: ['#0bae26', '#0fdf76', '#158ef4', '#00f0ff', '#6b75fb'],
        timeDate: new Date(),//时间选择器的时间
        timeDateMsg: '',//年月
        week: true,
        day: true,
        month: true,
        single: true,
        Multiple: true,
        colors: ['#5793f3', '#d14a61', '#675bba', '#8c58a0', '#0bae26', '#bdd114'],
      }
    },
    computed: {},
    mounted() {
      this.Multiple = false;//周视图多线
      this.day = false;//日视图多线
      this.month = false;//月视图多线
      this.year = false;//年视图多线
      this.onSingleWeek();//周单线-班级
      this.onMultipleWeek();//周多线-班级
      this.onSingleDay();//日视图单线-班级
      this.onMultipleDay();//日视图多线-班级
      this.onSingleMonth();//月视图单线-班级
      this.onMultipleMonth();//月视图多线-班级
      this.getCurrentDate(this.timeDate);//面板时间
    },
    /*时间过滤器*/
    filters: {
      capitalize: (value) => {
        let day = value.getDate();
        if (day < 10) {
          day = '0' + day;
        }
        return day;
      }
    },
    watch: {
      //监听选择时间变化
      timeDate(newVal, oldVal) {
        this.onSingleWeek();//周单线-班级
        this.onMultipleWeek();//周多线-班级
        this.onSingleDay();//日视图单线-班级
        this.onMultipleDay();//日视图多线-班级
        this.onSingleMonth();//月视图单线-班级
        this.onMultipleMonth();//月视图多线-班级
        this.getCurrentDate(this.timeDate);//面板时间
      }
    },
    methods: {
      /*表格视图与数据视图切换*/
      onShowHideView(){
        this.showHideTable = true;
      },
      onShowHideTable(){
        this.showHideTable = false;
      },
      /*下一月*/
      goNextMonth() {
        preMouth(this.timeDate, (e) => {
          this.timeDate = e;
        })
      },
      /*上一月*/
      goPrevMonth() {
        nextMouth(this.timeDate, (e) => {
          this.timeDate = e;
        })
      },
      //面板时间上的数字
      getCurrentDate(date) {
        getYearMouth(date, (result) => {
          this.timeDateMsg = result;
          get42Day(date, (result) => {
            let a = [];
            let b = [];
            let c = [];
            let d = [];
            let e = [];
            let f = [];
            a.push(result.slice(0, 7));
            b.push(result.slice(7, 14));
            c.push(result.slice(14, 21));
            d.push(result.slice(21, 28));
            e.push(result.slice(28, 35));
            f.push(result.slice(35, 42));
            this.the42data = [a[0], b[0], c[0], d[0], e[0], f[0]];
          });
        });
      },
      /*选择日期*/
      onDateClick(date) {
        this.timeDate = date;
      },
      /*周视图*/
      onWeek() {
        this.title.weekTitle = '周视图';
        /*视图模式*/
        this.single = true;
        this.Multiple = false;
        /*视图类型*/
        this.week = true;
        this.day = false;
        this.month = false;
      },
      /*日视图*/
      onDay() {
        this.title.weekTitle = '日视图';
        /*视图模式*/
        this.single = true;
        this.Multiple = false;
        /*视图类型*/
        this.week = false;
        this.day = true;
        this.month = false;
      },
      /*月视图*/
      onMonth() {
        this.title.weekTitle = '月视图';
        /*视图模式*/
        this.single = true;
        this.Multiple = false;
        /*视图类型*/
        this.week = false;
        this.day = false;
        this.month = true;
      },
      /*单线*/
      singleOnclick() {
        if (this.week || this.day || this.month) {
          this.single = true;
          this.Multiple = false;
          this.title.weekView = '单视图';
        } else {
          this.single = false;
          this.Multiple = false;
        }
      },
      /*多线*/
      multipleOnclick() {
        if (this.week || this.day || this.month) {
          this.single = false;
          this.Multiple = true;
          this.title.weekView = '多视图';
        } else {
          this.single = false;
          this.Multiple = false;
        }
      },
      /*周视图单线图*/
      onSingleWeek() {
        let date = this.timeDate;
        let week = date.getDay();
        if (week === 0) {
          week = 7;
        }
        let dateArray = new Array(8);
        getWeekDay(date, (ArrayDate) => {
          for (let i = 0; i < ArrayDate.length; i++) {
            getMouthDay(ArrayDate[i], (result) => {
              dateArray[i] = result;
            });
          }
        });
        let data = [
          {
            name: '小(1)班',
            type: 'line',
            smooth: true,
            data: [90, 97, 89, 89, 98],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [93, 95, 99, 98, 89],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [92, 100, 94, 100, 90],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [91, 94, 96, 80, 92],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [74, 90, 80, 86, 78],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [73, 80, 90, 96, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [100, 96, 89, 72, 94],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [89, 100, 96, 75, 87],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            data: [78, 79, 94, 95, 97],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(10)班',
            type: 'line',
            smooth: true,
            data: [88, 89, 93, 91, 93],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(11)班',
            type: 'line',
            smooth: true,
            data: [87, 99, 94, 99, 83],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(12)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(12)班',
            type: 'line',
            smooth: true,
            data: [74, 92, 74, 99, 83],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(13)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(14)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(15)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(16)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(17)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(18)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(19)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(20)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(21)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(22)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(23)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(24)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(25)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(26)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(27)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(28)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(29)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
            name: '小(30)班',
            type: 'line',
            smooth: true,
            data: [84, 91, 84, 79, 73],
            markArea: {
              data: [[{
                xAxis: this.weekText[week - 1]
              }, {
                xAxis: this.weekText[week]
              }], [{
                xAxis: '周六'
              }, {
                xAxis: '下周'
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
        ];
        let myChart = this.$echarts.init(this.$refs.singleId);
        singleWeek(myChart, dateArray, data, this.weekText, this.color);
      },
      /*周视图多线图*/
      onMultipleWeek() {
        let date = this.timeDate;
        let week = date.getDay();
        if (week === 0) {
          week = 7;
        }
        let dateArray = new Array(8);
        getWeekDay(date, (ArrayDate) => {
          for (let i = 0; i < ArrayDate.length; i++) {
            getMouthDay(ArrayDate[i], (result) => {
              dateArray[i] = result;
            });
          }
        });
        let data = [
          {
            name: '小(1)班',
            type: 'line',
            smooth: true,
            data: [90, 97, 89, 89, 98]
          },
          {
            name: '小(2)班',
            type: 'line',
            smooth: true,
            data: [93, 95, 99, 98, 89]
          },
          {
            name: '小(3)班',
            type: 'line',
            smooth: true,
            data: [92, 100, 94, 100, 90]
          },
          {
            name: '小(4)班',
            type: 'line',
            smooth: true,
            data: [91, 94, 96, 80, 92]
          },
          {
            name: '小(5)班',
            type: 'line',
            smooth: true,
            data: [74, 90, 80, 86, 78]
          },
          {
            name: '小(6)班',
            type: 'line',
            smooth: true,
            data: [73, 80, 90, 96, 73]
          },
          {
            name: '小(7)班',
            type: 'line',
            smooth: true,
            data: [100, 96, 89, 72, 94]
          },
          {
            name: '小(8)班',
            type: 'line',
            smooth: true,
            data: [89, 100, 96, 75, 87]
          },
          {
            name: '小(9)班',
            type: 'line',
            smooth: true,
            data: [78, 79, 94, 95, 97]
          }
        ];
        let myChart = this.$echarts.init(this.$refs.multipleId);
        multipleWeek(myChart, dateArray, data, this.weekText, this.color);
      },
      /*日视图单线*/
      onSingleDay() {
        let date = this.timeDate;
        let year = date.getFullYear();
        let dateArray = [];
        getYearDayText(date, (result) => {
          for (let i = 0; i < result.length; i++) {
            getYearMouthDay(result[i], (date) => {
              dateArray[i] = date;
            });
          }
        });
        /*获取今天明天*/
        let f = '';
        let l = '';
        getFirstLastMouthDay(date, (obj) => {
          f = obj.first;
          l = obj.last;
        });
        let data = [
          {
            name: '小(1)班',
            type: 'line',
            symbolSize: 8,
            smooth: true,
            hoverAnimation: false,
            markArea: {
              data: [[{
                xAxis: f
              }, {
                xAxis: l
              }], [{
                xAxis: ''
              }, {
                xAxis: ''
              }]]
            },
            data: [89, 90, 34, 80, 79, 67, 56, 89, 90]
          },
          {
            name: '小(1)班',
            type: 'line',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            markArea: {
              data: [[{
                xAxis: f
              }, {
                xAxis: l
              }], [{
                xAxis: ''
              }, {
                xAxis: ''
              }]]
            },
            data: [19, 10, 78, 23, 45, 23, 12, 23, 34]
          },
          {
            name: '小(2)班',
            type: 'line',
            symbolSize: 8,
            smooth: true,
            hoverAnimation: false,
            markArea: {
              data: [[{
                xAxis: f
              }, {
                xAxis: l
              }], [{
                xAxis: ''
              }, {
                xAxis: ''
              }]]
            },
            data: [78, 93, 89, 90, 89, 87, 76, 99, 91]
          },
          {
            name: '小(2)班',
            type: 'line',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            markArea: {
              data: [[{
                xAxis: f
              }, {
                xAxis: l
              }], [{
                xAxis: ''
              }, {
                xAxis: ''
              }]]
            },
            data: [12, 12, 18, 20, 12, 20, 22, 20, 14]
          }
        ];
        let myChart = this.$echarts.init(this.$refs.singleDayRef);
        singleDay(myChart, dateArray, data, year, this.color);
      },
      /*日视图多线*/
      onMultipleDay() {
        let date = this.timeDate;
        let year = date.getFullYear();
        let dateArray = [];
        getYearDayText(date, (result) => {
          for (let i = 0; i < result.length; i++) {
            getYearMouthDay(result[i], (date) => {
              dateArray[i] = date;
            });
          }
        });
        let data = [
          {
            name: '小(1)班',
            type: 'line',
            symbolSize: 8,
            smooth: true,
            hoverAnimation: false,
            data: [89, 90, 34, 80, 79, 67, 56, 89, 90]
          },
          {
            name: '小(1)班',
            type: 'line',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: [93, 95, 99, 98, 89, 87, 78, 90, 67, 56, 76, 78],
          },
          {
            name: '小(2)班',
            type: 'line',
            symbolSize: 8,
            smooth: true,
            hoverAnimation: false,
            data: [93, 95, 99, 98, 89, 87, 78, 90, 67, 56, 76, 78],
          },
          {
            name: '小(2)班',
            type: 'line',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: [12, 12, 18, 20, 12, 20, 22, 20, 14]
          }
        ];
        let myChart = this.$echarts.init(this.$refs.multipleDayRef);
        multipleDay(myChart, dateArray, data, year, this.color);
      },
      /*月视图单线*/
      onSingleMonth() {
        let myChart = this.$echarts.init(this.$refs.singleMonthRef);
        singleMouth(myChart);
      },
      /*月视图多线*/
      onMultipleMonth() {
        let myChart = this.$echarts.init(this.$refs.multipleMonthRef);
        multipleMouth(myChart);
      },
    }
  };
</script>

<style scoped lang="scss">
  .class-attendance {
    .table-body-title {
      height: 40px;
    }
    .week {
      width: 100%;
    }
    .table-c {
      margin: 0;
      padding: 0;
      background: #fcfcfc;
    }
    .view {
      display: flex;
      width: 100%;
      margin: 0;
      padding: 0;
      user-select: none;
      .view-nav {
        flex: 0 0 200px;
        padding: 0 10px;
        box-sizing: border-box;
        background: #fcfcfc;
        .view-nav-title {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-top: 16px;
        }
        .tile {
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          & span {
            font-size: 14px;
            padding: 0 36px;
          }
          & i {
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
          }
        }
        .table-peal {
          .row-header {
            display: flex;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            font-weight: 500;
            justify-content: space-between;
            span {
              display: inline-block;
              line-height: 24px;
              text-align: center;
              width: 24px;
              height: 24px;
            }
          }
          .row {
            cursor: pointer;
            display: flex;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            justify-content: space-between;
            span {
              box-sizing: border-box;
              display: inline-block;
              line-height: 24px;
              text-align: center;
              width: 24px;
              height: 24px;
              &:hover {
                box-sizing: border-box;
                box-shadow: 0 0 4px #CCCCCC;
                border-radius: 50%;
              }
            }
            .item {
              border-radius: 50%;
              background: #409EFF;
              color: #FFFFFF;
            }
            .pre {
              color: #aaaaaa;
            }
          }
        }
        .data-view, .table-view {
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
          .pre {
            flex: 0 0 20px;
            color: #409EFF;
          }
          .text {
            flex: 1;
          }
          .next {
            display: block;
            flex: 0 0 30px;
          }
          .active{
            color: #409EFF;
          }
        }
        .data-view {
          margin-top: 10px;
          &:hover {
            .next {
              color: #409EFF;
            }
          }
        }
        .table-view {
          &:hover {
            .pre {
              color: #409EFF;
            }
            .next {
              color: #409EFF;
            }
          }
        }
      }
      .view-body {
        flex: 1;
        box-sizing: border-box;
        margin-left: 10px;
        background: #fcfcfc;
        .table-a {
          box-sizing: border-box;
          padding: 10px;
        }
        .table-c {
          box-sizing: border-box;
          .week{
            width: 100%;
            box-sizing: border-box;
            padding: 0;
          }
        }
      }
    }
  }
</style>
