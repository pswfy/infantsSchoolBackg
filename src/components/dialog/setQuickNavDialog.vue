<template>
  <div class="dialog">
    <el-dialog
      title="快捷菜单设置"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="dialog-inner">
        <el-transfer
          v-model="cursor"
          target-order="original"
          :data="ComTowMenu"
          :titles="['系统菜单', '快捷菜单']"
          :button-texts="['移除出快捷菜单', '添加到快捷菜单']"
        ></el-transfer>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import  {mapState} from 'vuex';
  export default {
    props: {
      dialog: {
        type: Object,
        default: () => {
          return false
        }
      }
    },
    data() {
      return {
        dialogFormVisible: false,
        cursor:[],//快捷菜单游标
      };
    },
    mounted(){
      this.getSetLocalStorage();
    },
    watch: {

    },
    computed: {
      //首页轮播图
      ...mapState(['TwoMenu']),
      ComTowMenu(){
        let twoMenu=[];
        for(let i=0;i<this.TwoMenu.length;i++){
          twoMenu.push({
            'key': i,
            'label': this.TwoMenu[i].title,
            'disabled': false
          })
        }
        return twoMenu;
      },
    },
    methods:{
      getSetLocalStorage(){
        console.log(this.TwoMenu.toString());
        let l = this.TwoMenu.toString().length;
        console.log(l);
        let length = localStorage.getItem('menuLength');
        if(length){
          if(length=== this.TwoMenu.toString().length ){
              let cursor = localStorage.getItem('cursor');
              if(cursor){
                this.cursor = cursor;
              }else{
                this.cursor = [0,1,2,3,4,5,6]
              }
          }else{
            localStorage.removeItem("menuLength");
          }
        }else{
          let l = this.TwoMenu.toString().length;
          localStorage.setItem('menuLength',l);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .dialog{
    .dialog-inner{
      margin-top: -20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
