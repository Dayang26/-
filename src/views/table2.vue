<template>

  <my-table :cols="cols" :formObj="form" :rules="rules" :tableAttrs="tableAttrs" :page-size="pageSize" :pageParams="pageParams" @show-dialog="showDlg">

    <template v-slot:form>
      <el-form-item label="学号" prop="stuNo">
        <el-input v-model="form.stuNo" placeholder="学号" clearable></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="姓名" clearable></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-input v-model="form.sex" placeholder="性别" clearable></el-input>
      </el-form-item>
    "<transition
      mode="out-in"
      @before-enter="beforeEnter"
      @enter="enter"

      @before-leave="beforeLeave"
      @leave="leave"
      :css="false">

    </transition>'

    </template>
    <template v-slot:buttons>

      <el-button :size="size" type="primary" icon="el-icon-back"  @click="zx">注销</el-button>

    </template>
  </my-table>
</template>

<script>
  import myTable from '../components/myTable.vue'
  export default {
    components:{myTable},
    data() {
      return {
        cols:[
          {property:'stuNo',label:'学号'},
          {property:'name',label:'姓名'},
          {property:'sex',label:'性别'}
        ],
        form:{
          stuNo:'',
          name:'',
          sex:''
        },
        rules: {
          stuNo: [{
            required: true,
            message: '学号必填',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '姓名必填',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '性别必填',
            trigger: 'blur'
          }]
        },
        tableAttrs:{
          border:true
        },
        pageSize:[3,10,20,50],
        pageParams:{
          limit:3
        }
      }
    },
    methods:{
      showDlg(form){
        console.log(form);
      },
     zx(){
        this.$ajax.post('logout',{}).then(res=>{
        var result=res.data;
        if(result.success){
          window.sessionStorage.removeItem("token");
          window.sessionStorage.removeItem("name");
          this.$notify.success({
            title:'提示',
            message:result.msg,
            position:'bottom-right'
          })
          this.$router.replace('/');
        }
        })
      },

},
    mounted(){
      this.refreshTable();
  },
  }
</script>

<style>
</style>
