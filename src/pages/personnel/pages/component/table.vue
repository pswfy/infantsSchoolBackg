<template>
  <div class="table">
    <div class="canlendar">
      <!-- 放一个table显示边框用的 -->
      <div class="bg_box">
        <table>
          <thead>
          <tr>
            <th v-for="(item,index) in week">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in 6">
            <td v-for="item in 7"></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 核心数据 -->
      <div class="schedule_box">
        <div class="row" v-for="index in 6">
          <table>
            <thead>
            <tr>
              <!-- 显示日期数字 -->
              <th v-for="_index in 7" v-if="the42data[index - 1].length !== 0"
                  v-bind:class="{'gray' : the42data[index - 1][_index - 1].lastmonth || the42data[index - 1][_index - 1].nextmonth}">
                {{ the42data[index - 1][_index - 1].day }}
              </th>
            </tr>
            </thead>
            <tbody>
            <!-- 日程表 -->
            <tr v-for="tr in domdata[index - 1]">
              <td v-for="td in tr" :colspan="td.colspan" :class="['schedule',td.classname , {'leftEndPointRect' : td.leftEndPointRect} , {'rightEndPointRect' : td.rightEndPointRect} , {'boxshadow' : td.title !== ''}]">
                <div>{{td.title}}</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default ({
    data() {
      return {
        //表头
        week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        //42天的数据
        the42data: [[], [], [], [], [], []],
        //42小格
        domdata: [[[], [], []], [[], [], []], [[], [], []], [[], [], []], [[], [], []], [[], [], []]],
        //每天任务量
        the42daythingsnumber: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ],
        //本月api数据
        themonth: [],
        //上个月的信息
        lastmonth: [],
        //下个月的信息
        nextmonth: []
      }
    },
    created() {
      this.tableDomData();
    },

    mounted() {

    },
    methods: {
      tableDomData() {
        this.domdata = [[[], [], []], [[], [], []], [[], [], []], [[], [], []], [[], [], []], [[], [], []]];
        this.the42data = [[], [], [], [], [], []];
        //今年本月
        let y = this.$store.state.nowShow.year;
        let m = this.$store.state.nowShow.month;
        //上一个月所在的年月
        let preY = m === 1 ? y - 1 : y;
        let preM = m === 12 ? 12 : m - 1;
        //下一个月所在的年月
        let nextY = m === 12 ? y + 1 : y;
        let nextM = m === 12 ? 1 : m + 1;
        //本月
        this.postCurrent(y, m, nextY, nextM, preY, preM);
      },
      /*本月*/
      postCurrent(y, m, nextY, nextM, preY, preM) {
        this.$axios.post(this.$store.state.url + '/work/work/tile', {"year": y, "month": m}, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          this.themonth = res.data.result_data;
          this.postLast(nextY, nextM, preY, preM);
          console.log(res.data.result_data);
        }).catch(err => {
          //console.log(err);
        })
      },
      /*下一月*/
      postLast(nextY, nextM, preY, preM) {
        this.$axios.post(this.$store.state.url + '/work/work/tile', {"year": nextY, "month": nextM}, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          this.nextmonth = res.data.result_data;
          this.postNext(preY, preM);
          console.log(this.nextmonth);
        }).catch(err => {
          console.log(err);
        })
      },
      /*上个月*/
      postNext(preY, preM) {
        this.$axios.post(this.$store.state.url + '/work/work/tile', {"year": preY, "month": preM}, {
          emulateJSON: true,
          withCredentials: true
        }).then(res => {
          this.lastmonth = res.data.result_data;
          console.log(this.lastmonth);
          this.setDate();
        }).catch(err => {
          console.log(err);
        })
      },
      setDate() {
        //本月第一天，日期对象
        let thefirstdate = new Date(this.$store.state.nowShow.year, this.$store.state.nowShow.month - 1, 1);
        //console.log(thefirstdate);
        //查看本月第一天星期几
        let thefirestdateday = thefirstdate.getDay();
        //星期几就补几个上月（星期0特殊补充7个，星期1补充1个，星期2补充2个……星期6补充6个）
        //上月需要补充的个数
        let shangyuebuchonggeshu = thefirestdateday === 0 ? 7 : thefirestdateday;
        //将上月的补充到第一行
        while (shangyuebuchonggeshu--) {
          let o = this.lastmonth.pop();
          o.lastmonth = true;
          this.the42data[0].unshift(o)
        }


        //第0行还需要本月的个数
        let count = thefirestdateday !== 0 ? 0 : 1;
        let diyihangbenyuegeshu = 7 - thefirestdateday;
        while (diyihangbenyuegeshu--) {
          this.the42data[count].push(this.themonth.shift());
        }

        while (this.themonth.length > 7) {
          count++;
          this.the42data[count] = this.themonth.slice(0, 7);
          this.themonth = this.themonth.slice(7)
        }
        //剩下的本月天数推进去
        this.the42data[++count] = this.themonth;
        //这不满的这一行需要下月的天数个数
        let zhehangxiayuetianshu = 7 - this.themonth.length;
        while (zhehangxiayuetianshu--) {
          let o = this.nextmonth.shift();
          o.nextmonth = true;
          this.the42data[count].push(o);
        }


        //补满7天，
        this.the42data[++count] = this.nextmonth.slice(0, 7);
        //至此，this.the42data已经生成完毕，下面要根据这个数组来生成42天的DOM情形

        //这里可以看看4月份还没有做完的，遗留到本月的
        //遍历上个月的数组
        let self = this;
        for (let i = 0; i < this.lastmonth.length; i++) {
          this.lastmonth[i].schedule.forEach((item, index) => {
            if (item.during + i > this.lastmonth.length) {
              //发生了跨越的情况
              //计算剩到本月多少天
              let rest = item.during - (this.lastmonth.length - i);

              //干三件事儿！
              for (let m = 0; m < rest; m++) {
                let hanghao = parseInt(m / 7);
                let liehao = m % 7;

                // console.log(hanghao,liehao)
                //第一件事儿，改变the42daythingsnumber
                self.the42daythingsnumber[hanghao][liehao]++;

                //第二件事儿，改变这些天的occupation
                if (!self.the42data[hanghao][liehao].hasOwnProperty("occupation")) {
                  self.the42data[hanghao][liehao].occupation = [];
                }
                self.the42data[hanghao][liehao].occupation.push(index);
              }


              for (let tang = 0; tang < Math.ceil(rest / 7); tang++) {
                if (tang === Math.ceil(rest / 7) - 1) {
                  this.domdata[tang][index] = [{"title": item.title, "classname": item.type, "colspan": rest % 7}]
                } else {
                  this.domdata[tang][index] = [{"title": item.title, "classname": item.type, "colspan": 7}]
                }
              }


            }
          });
        }
        //console.log(self.the42daythingsnumber);
        //调用函数
        this.change42DataToDomData(this.the42data, this.the42daythingsnumber, this.domdata);
      },
      change42DataToDomData(the42data, the42daythingsnumber, domdata) {

        //最终要返回的值
        //arrindex表示行序号，0、1、2、3、4、5
        for (let arrindex = 0; arrindex < 6; arrindex++) {
          let weekarr = the42data[arrindex];
          //计算总tr数
          weekarr.forEach((item, index) => {
            if (!item.hasOwnProperty("occupation")) item.occupation = [];
            the42daythingsnumber[arrindex][index] += item.schedule.length;
            //遍历这个item看看有没有项目有during属性
            item.schedule.forEach((JSON, index2) => {
              if (JSON.during && JSON.during > 1) {
                //在后面的日期加上这个长度
                for (let i = index + 1; i < index + JSON.during; i++) {
                  if (arrindex + parseInt(i / 7) >= 6) {
                    continue;
                  }
                  // TODOS：一会儿这里要考虑出月份，等于说arrindex + parseInt(i / 7)只能是0、1、2、3、4、5
                  the42daythingsnumber[arrindex + parseInt(i / 7)][i % 7]++;
                }
              }
            });
          });
          let max = this._.max(the42daythingsnumber[arrindex]);
          let times = max > 3 ? 3 : max; //循环次数


          //生成了DOM
          weekarr.forEach((item, index) => {
            for (let i = 0; i < times; i++) {
              //如果这一项目没有被占用
              if (this._.indexOf(item.occupation, i) === -1) {
                let first = item.schedule.shift();	//【弹栈】核心语句！！！
                if (first === undefined) {
                  domdata[arrindex][i].push({"colspan": 1, "title": ""});
                } else {
                  domdata[arrindex][i].push({
                    "colspan": first.during || 1,
                    "title": first.title,
                    "classname": first.type,
                    "rightEndPointRect": index + first.during > 7
                  });
                  //干一件事儿，在后面那么多天的occupation中加入自己的行号
                  if (first.during && first.during !== 1) {
                    //不能超过星期6，end：1、2、3、4、5、6、7
                    //这行循环的终点
                    let end = index + first.during > 7 ? 7 : index + first.during;
                    //还剩
                    let rest = (first.during - (7 - index));
                    //改变这个星期的occupation
                    for (let _i = index + 1; _i < end; _i++) {
                      weekarr[_i].occupation.push(i);
                    }

                    let _rest;
                    let count = 0;
                    while (rest > 0) {
                      _rest = rest > 7 ? 7 : rest;
                      rest -= _rest;
                      count++;
                      //改变下一个星期的occupation
                      let nextweekarr = the42data[arrindex + count];
                      //如果越界了，抑制住就行，不需要做任何事情。
                      if (nextweekarr === undefined) {
                        continue;
                      }
                      for (let _i = 0; _i < _rest; _i++) {
                        if (!nextweekarr[_i].hasOwnProperty("occupation")) {
                          nextweekarr[_i].occupation = [];
                        }
                        //改变下一周前几天的occupation
                        nextweekarr[_i].occupation.push(i);
                        //把下一周每日数量数组改变
                        the42daythingsnumber[arrindex + count][_i]++;
                        //改变下一周的结果montharr（总结过）
                        domdata[arrindex + count][i] = [{
                          "title": first.title,
                          "classname": first.type,
                          "colspan": _rest,
                          "leftEndPointRect": true,
                          "rightEndPointRect": rest !== 0
                        }];
                      }
                    }
                  }
                }
              }
            }
          });
        }
      }
    }
  });
</script>

<style>
  .table {
    display: flex;
    width: 100%;
    background: #f1f6f9;
    box-sizing: border-box;
  }

  .canlendar {
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    margin: 0;
    width: 100%;
    height: 690px;
    position: relative;
  }

  .canlendar .bg_box {
    width: 100%;
    height: 690px;
  }

  .canlendar .schedule_box {
    width: 100%;
    height: 660px;
    top: 30px;
    left: 0;
    position: absolute;
  }

  .canlendar .bg_box table {
    width: 100%;
    border-collapse: collapse;
  }

  .canlendar .bg_box table thead tr {
    height: 30px;
    font-size: 14px;
    font-family: "微软雅黑";
  }

  .canlendar .bg_box table tbody tr {
    height: 110px;
  }

  .canlendar .bg_box table tbody td {
    border: 1px solid #f3f3f3;
  }

  .canlendar .schedule_box .row {
    height: 110px;
  }

  .canlendar .schedule_box .row table {
    width: 100%;
    border-collapse: collapse;
  }

  .canlendar .schedule_box .row table thead {
    height: 20px;
  }

  .canlendar .schedule_box .row table thead tr {
    height: 20px;
  }

  .canlendar .schedule_box .row table thead th {
    box-sizing: border-box;
    width: 14.285%;
    text-align: right;
    padding-right: 16px;
    padding-top: 4px;
    line-height: 16px;
    font-size: 14px;
    color: #222222;
    font-family: "consolas";
  }

  .canlendar .schedule_box .row table thead th.gray {
    color: gray;
  }

  .canlendar .schedule_box .row table tbody td {
    box-sizing: border-box;
    width: 14.285%;
    padding: 2px;
  }

  .schedule div {
    box-sizing: border-box;
    margin: 0 4px;
    font-size: 12px;
    padding: 3px 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .schedule.life div {
    background-color: #2afcdb;
    border-left: 4px solid #26e7c9;
  }
  .schedule.life div:hover{
    background-color: #26e7c9;
    color: #FFFFFF;
  }

  .schedule.warning div {
    background-color: darkred;
    color: white;
  }

  .schedule.work div {
    background-color: orange;
  }

  .schedule.important div {
    background-color: red;
    color: white;
  }

  .schedule.ceshi div {
    background-color: black;
    color: white;
  }

  .leftEndPointRect div {
    border-left: 4px solid transparent !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }

  .rightEndPointRect div {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  .canlendar .bg_box table th {
    text-align: center;
  }
</style>
