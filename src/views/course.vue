<template>
  <my-table  :path="path" :url="url" :data="data" :cols="cols" :formObj="form" :rules="rules" :tableAttrs="tableAttrs" :page-size="pageSize" :pageParams="pageParams" @show-dialog="showDlg">
    <template v-slot:form>
      <el-form-item label="课名" prop="name">
        <el-input v-model="form.name" placeholder="课程名" clearable></el-input>
      </el-form-item>

      <el-form-item label="时长" prop="classHour">
        <el-input v-model="form.classHour" placeholder="课程时长" clearable></el-input>
      </el-form-item>
    </template>
  </my-table>
</template>

<script>
  import myTable from '../components/myTable.vue'
  export default {
    components:{myTable},
    data() {
      return {
        data:{
          name:'',
          classHour:''
        },
        path:'/course',
        url:'/page',
        cols:[
          {property:'name',label:'课程名'},
          {property:'classHour',label:'课程时长'}
        ],
        form:{
          name:'',
          classHour:''
        },
        rules: {
          name: [{
            required: true,
            message: '课程名称必填',
            trigger: 'blur'
          }],
          classHour: [{
            required: true,
            message: '课时长必填',
            trigger: 'blur'
          }],
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

    },
    mounted() {
      console.log(this.data)
    }
  }
</script>

<style>
</style>
