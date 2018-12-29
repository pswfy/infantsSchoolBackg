<template>
  <div class="student-table">
    <div class="student-table-nav">
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
    </div>
    <div class="student-table-body">
      <div class="student-table-body-header">
        <div class="name">
          <el-select v-model="value" size="mini" placeholder="请选择班级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-tooltip class="item" effect="dark" content="数据视图" placement="bottom">
            <span :class="{'active':view}" @click="onActiveView"><i class="icon iconfont icon-gengduo"></i></span>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="表格视图" placement="bottom">
            <span :class="{'active':!view}" @click="onActiveTable"><i class="icon iconfont icon-gengduo-2"></i></span>
          </el-tooltip>
        </div>
      </div>
      <div class="student-table-body-table">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="studentName"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="date"
            label="时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="start"
            label="入校时间"
            width="100">
          </el-table-column>
          <el-table-column
            prop="end"
            label="离校时间"
            width="100">
          </el-table-column>
          <el-table-column
            label="入校送人"
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p  v-if="scope.row.startReceiver.type">关系: {{ scope.row.startReceiver.type }}</p>
                <p v-if="scope.row.startReceiver.name">姓名: {{ scope.row.startReceiver.name }}</p>
                <p v-if="scope.row.startReceiver.phone">电话: {{ scope.row.startReceiver.phone }}</p>
                <p v-if="scope.row.startReceiver.startTeacher">学校负责人: {{ scope.row.startReceiver.startTeacher }}</p>
                <p v-if="scope.row.startReceiver.homeAddress">家属家庭地址: {{ scope.row.startReceiver.homeAddress }}</p>
                <p v-if="scope.row.startReceiver.workAddress">家属工作地址: {{ scope.row.startReceiver.workAddress }}</p>
                <div slot="reference" class="name-wrapper" v-if="scope.row.startReceiver.name">
                  <el-tag size="medium">{{ scope.row.startReceiver.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="离校接人"
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-if="scope.row.endReceiver.type">关系: {{ scope.row.endReceiver.type }}</p>
                <p v-if="scope.row.endReceiver.name">姓名: {{ scope.row.endReceiver.name }}</p>
                <p v-if="scope.row.endReceiver.phone">电话: {{ scope.row.startReceiver.phone }}</p>
                <p v-if="scope.row.endReceiver.startTeacher">学校负责人: {{ scope.row.startReceiver.startTeacher }}</p>
                <p v-if="scope.row.endReceiver.homeAddress">家属家庭地址: {{ scope.row.startReceiver.homeAddress }}</p>
                <p v-if="scope.row.endReceiver.workAddress">家属工作地址: {{ scope.row.startReceiver.workAddress }}</p>
                <div slot="reference" class="name-wrapper" v-if="scope.row.endReceiver.name">
                  <el-tag size="medium">{{ scope.row.endReceiver.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="事假"
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-if="scope.row.leaveThing.text === '无'">今天没有事假信息</p>
                <p v-if="scope.row.leaveThing.start">起送时间: {{ scope.row.leaveThing.start }}</p>
                <p v-if="scope.row.leaveThing.end">终始时间: {{ scope.row.leaveThing.end }}</p>
                <p v-if="scope.row.leaveThing.msg">事假原因: {{ scope.row.leaveThing.msg }}</p>
                <p v-if="scope.row.leaveThing.leaveTeacher">批准老师: {{ scope.row.leaveThing.leaveTeacher }}</p>
                <p v-if="scope.row.leaveThing.Receiver.name">请假家属: {{ scope.row.leaveThing.Receiver.name }}</p>
                <p v-if="scope.row.leaveThing.Receiver.type">家属关系: {{ scope.row.leaveThing.Receiver.type }}</p>
                <p v-if="scope.row.leaveThing.Receiver.phone">家属电话: {{ scope.row.leaveThing.Receiver.phone }}</p>
                <p v-if="scope.row.leaveThing.Receiver.homeAddress">家属地址: {{ scope.row.leaveThing.Receiver.homeAddress }}</p>
                <p v-if="scope.row.leaveThing.Receiver.workAddress">家属工作地址: {{ scope.row.leaveThing.Receiver.workAddress }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.leaveThing.text }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="病假"
            width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-if="scope.row.sickThing.text === '无'">今天没有病假信息</p>
                <p v-if="scope.row.sickThing.start">起送时间: {{ scope.row.sickThing.start }}</p>
                <p v-if="scope.row.sickThing.end">终始时间: {{ scope.row.sickThing.end }}</p>
                <p v-if="scope.row.sickThing.msg">事假原因: {{ scope.row.sickThing.msg }}</p>
                <p v-if="scope.row.sickThing.leaveTeacher">批准老师: {{ scope.row.sickThing.leaveTeacher }}</p>
                <p v-if="scope.row.sickThing.Receiver.name">请假家属: {{ scope.row.sickThing.Receiver.name }}</p>
                <p v-if="scope.row.sickThing.Receiver.type">家属关系: {{ scope.row.sickThing.Receiver.type }}</p>
                <p v-if="scope.row.sickThing.Receiver.phone">家属电话: {{ scope.row.sickThing.Receiver.phone }}</p>
                <p v-if="scope.row.sickThing.Receiver.homeAddress">家属地址: {{ scope.row.sickThing.Receiver.homeAddress }}</p>
                <p v-if="scope.row.sickThing.Receiver.workAddress">家属工作地址: {{ scope.row.sickThing.Receiver.workAddress }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.sickThing.text }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    data() {
      return {
        tableData: [
          {
          date: '2018-12-08',
          studentName: '雯雯',
          start: '08:23',
          end: '04:23',
          leaveThing: {
            start: '',
            end: '',
            Receiver: {
              name: '',
              type: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            msg: '',
            leaveTeacher: '',
            text:'无'
          },
          sickThing: {
            start: '',
            end: '',
            Receiver: {
              name: '',
              type: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            msg: '',
            leaveTeacher: '',
            text:'无'
          },
          startReceiver: {
            name: '王静',
            type: '母亲',
            startTeacher: '老师1',
            phone: '18285150052',
            homeAddress: '贵阳市南明路54号',
            workAddress: '贵阳市南明路54号',
          },
          endReceiver: {
            name: '刘新宇',
            type: '父亲',
            endTeacher: '老师2',
            phone: '18285150052',
            homeAddress: '贵阳市南明路54号',
            workAddress: '贵阳市南明路54号',
          }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '',
            end: '',
            leaveThing: {
              start: '',
              end: '',
              Receiver: {
                name: '',
                type: '',
                phone: '',
                homeAddress: '',
                workAddress: '',
              },
              msg: '',
              leaveTeacher: '',
              text:'无'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '',
              type: '',
              startTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            },
            endReceiver: {
              name: '',
              type: '',
              endTeacher: '',
              phone: '',
              homeAddress: '',
              workAddress: '',
            }
          },
          {
            date: '2018-12-08',
            studentName: '雯雯',
            start: '08:23',
            end: '04:23',
            leaveThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            sickThing: {
              start: '2018-12-08 08:00',
              end: '2018-12-08 12:00',
              Receiver: {
                name: '王静',
                type: '母亲',
                phone: '18285150052',
                homeAddress: '贵阳市南明路54号',
                workAddress: '贵阳市南明路54号',
              },
              msg: '家里有事情',
              leaveTeacher: '批准老师',
              text:'有'
            },
            startReceiver: {
              name: '王静',
              type: '母亲',
              startTeacher: '老师1',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            },
            endReceiver: {
              name: '刘新宇',
              type: '父亲',
              endTeacher: '老师2',
              phone: '18285150052',
              homeAddress: '贵阳市南明路54号',
              workAddress: '贵阳市南明路54号',
            }
          }
        ],
        options: [{
          value: '小(1)班',
          label: '小(1)班'
        }, {
          value: '小(2)班',
          label: '小(2)班'
        }, {
          value: '小(3)班',
          label: '小(3)班'
        }, {
          value: '小(4)班',
          label: '小(4)班'
        }, {
          value: '小(5)班',
          label: '小(5)班'
        }],
        value: '小(1)班',
        view: true,
        radio2: 1,
        timeDate: new Date(),//时间选择器的时间
        timeDateMsg: '',//年月
        the42data: [],
      }
    },
    mounted() {
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
        this.getCurrentDate(this.timeDate);//面板时间
      }
    },
    methods: {
      handleClick(rowData){},
      onActiveView() {
        this.view = true;
      },
      onActiveTable() {
        this.view = false;
      },
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
      /*选择日期*/
      onDateClick(date) {
        this.timeDate = date;
      },
    }
  };
</script>

<style scoped lang="scss">
  .student-table {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    user-select: none;
    .student-table-nav {
      flex: 0 0 200px;
      padding: 0 10px;
      box-sizing: border-box;
      background: #fcfcfc;
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
      }
      .data-view {
        margin: 30px 0;
        .item {
          margin: 10px 0 0 4px;
        }
      }
    }
    .student-table-body {
      flex: 1;
      box-sizing: border-box;
      margin-left: 10px;
      background: #fcfcfc;
      .student-table-body-header {
        display: flex;
        justify-content: space-between;
        height: 30px;
        font-size: 0;
        //background: red;
        line-height: 30px;
        .name {
          font-size: 14px;
          margin-left: 10px;
          color: #999;
          i {
            color: #409EFF;
          }
        }
        span {
          display: inline-block;
          height: 30px;
          width: 30px;
          box-sizing: border-box;
          border: 1px solid #f0f0f0;
          font-size: 14px;
          color: #CCCCCC;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
        }
        span:nth-child(1) {
          border-right: 0;
        }
        span:nth-child(2) {
          margin-right: 10px;
        }
        .active {
          background: #409EFF;
          color: #FFFFFF;
        }
      }
      .student-table-body-table {
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
</style>
