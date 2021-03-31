<template>
  <div style="padding: 20px 20px;">
    <h3 style="line-height:1.7 ">学生管理</h3>
   <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
       <!-- <el-form-item label="学号" prop="stuNo">
          <el-input v-model="ruleForm.stuNo" clearable ></el-input>
        </el-form-item> -->
        <lable-input :form="ruleForm" lable="学号" prop="stuNo" @change=change>

        </lable-input>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" clearable  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex" clearable  placeholder="请输入性别"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>

    <el-row>
      <el-col :span="20">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add">新增</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="edit" plain :disabled="!currentRow">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="del" plain :disabled="!currentRow">删除</el-button>
           <el-button  icon="el-icon-refresh" @click="refreshTable" plain>刷新</el-button>
      </el-col>
      <el-col :span="4">
         <el-input placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="queryParams.search" clearable @change="searChange"/>
      </el-col>
    </el-row>
    <p>
      <el-table ref="singleTable" :data="stus" border highlight-current-row @current-change="handle" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column property="stuNo" label="学号"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="sex" label="性别"></el-table-column>
      </el-table>

    </p>
    <div style="margin-top: 10px;">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryParams.page"
            :page-sizes="[2, 10, 15, 20]"
            :page-size="queryParams.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
    </div>
  </div>

</template>

<script>
 import lableInput from '../components/lableInput.vue';
  export default{
components:{ lableInput },
    data() {
      return {
        title:'编辑',
        dialogVisible:false,
        stus: [],
        total:0,
        ruleForm:{
           stuNo:'',
           name:'',
           sex:''
        },
        rules:{
           stuNo: [
                  { required: true, message: '请输入学号', trigger: 'blur' },
                  { min: 4, max: 11, message: '长度在 4 到 11 个字符', trigger: 'blur' }
                ],
           name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
               ],
            sex: [
              { required: true, message: '请输入性别', trigger: 'blur' },
              { min: 1, max: 1, message: '长度是 1 个字符', trigger: 'blur' }
              ]
           },
        currentRow:null,
        queryParams:{
          limit:3,
          page:1,
          sort:'stuNo',
          order:'asc',
          search:''
        }
      }
    },
    methods:{
      change(a){
        console.log('change事件',a);
      },
      add(){
        this.ruleForm={};
        this.dialogVisible=true;
      },
      edit(){
        this.ruleForm=Object.assign({},this.currentRow);
        this.dialogVisible=true;
      },
      del(){
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
              this.$ajax.post('delete',this.currentRow).then(res=>{
                var result = res.data;
                if(result.success){
                  this.$notify.success({
                    title: '提示',
                    message: '数据删除成功',
                     position: 'bottom-right'
                   });
                   this.refreshTable();
                }
              }).catch(err=>{
                this.$message({
                  type:'error',
                  message:'删除失败'
                })
              })

           }).catch(() => {
             this.$message({
               type: 'info',
               message: '已取消删除'
             });
           });
      },
      save(){
        this.$refs.ruleForm.validate(valid=>{
          if(valid){
            this.$ajax.post('save',this.ruleForm).then(res=>{
              var result=res.data;
                if(result.success){
                  this.ruleForm={};
                  this.dialogVisible=false;
                  this.$notify({
                      title: '提示',
                      message: '保存成功',
                       position: 'bottom-right'
                  });
                  this.refreshTable();
                }
            })
          }
        })
      },

      currentchange(row){
           this.currentRow=row;
      },
      handle(val) {
          this.currentRow=val;
      },
      setCurrent(row) {
              this.$refs.singleTable.setCurrentRow(row);
      },
      refreshTable(){
        this.$ajax.post('page',this.queryParams).then(res=>{
          var result=res.data;
          if(result.success){
              this.stus=result.data.rows;
              this.total=result.data.total;
              this.currentRow=null;
          }
          //console.log(result);
        }).catch(err=>{})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryParams.limit=val;
        this.refreshTable();
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.queryParams.page=val;
        this.refreshTable();
      },
      searChange(){
        this.refreshTable();
      }
    },
    mounted(){
      this.refreshTable();
  },
}
</script>

<style>
</style>
