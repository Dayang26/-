<template>
<div>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible2"
    width="30%">
   <img :src="src" />
  </el-dialog>


  <el-card class="banji">
    <div>
      <el-select v-model="tbClassId" placeholder="请选择班级" clearable @change="uuu">
        <el-option v-for="bj in bjs" :key="bj.id" :value="bj.id" :label="bj.name"></el-option>
      </el-select>
    </div>
    <MyTable highlight-current-row  @currentChange="currentChange" ref="aaa" v-if="tableVisible" :file="file" :cols="cols" :formObj="form" :rules="rules" :tableAttrs="tableAttr" :path="path"
      :urlParam="urlParam">
      <template v-slot:form>
        <el-form-item label="学号" prop="stuNo">
          <el-input v-model="form.stuNo" placeholder="学号" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
          <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择" style="width: 100%;">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>

         </el-select>
           </el-form-item>
       <!-- <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex" placeholder="性别" clearable></el-input>
        </el-form-item> -->
        <el-upload class="upload-demo" drag action="qwer" :before-upload="beforeupload" v-model="form.file" >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2mb</div>
        </el-upload>
      </template>



      <template v-slot:buttons>
        <el-button @click="kan" :size="size" type="info" icon="el-icon-picture-outline" :disabled="!currentRow">查看图片</el-button>
          <el-button @click="czmm" :size="size" type="info" icon="el-icon-refresh-right"  :disabled="currentRow==null">重置密码</el-button>
      </template>

      、

    </MyTable>
  </el-card>
</div>
</template>

<script>
  import MyTable from '../components/myTable.vue'
  export default {
    components: {
      MyTable
    },
    props:{
      size:{
        type:String,
        default:'small'
      },
      },
    data() {
      return {

        currentRow:null,
        src:'',
        dialogVisible2:false,
        tbClassId: '',
        bjs: [],
        tableVisible: false,
        path: '/student',
        urlParam: {},
          file:'',
           options: [{
                    value: '男',
                    label: '男'
                  }, {
                    value: '女',
                    label: '女'
                  }],
        cols: [{
            property: 'id',
            label: '序号'
          },
          {
            property: 'stuNo',
            label: '学号'
          },
          {
            property: 'name',
            label: '姓名'
          },
          {
            property: 'sex',
            label: '性别'
          }
        ],
        form: {
          id: '',
          stuNo: '',
          name: '',
          sex: '',
          tbClass: '',

        },
        rules: {
          stuNo: [{
            required: true,
            message: '请输入学号',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          sex: [{
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }],
        },
        tableAttr: {
          border: true
        }
      }
    },
    created() {
      this.banji();

    },
    methods:{
     currentChange(row) {
       this.currentRow = row;
     },
     banji(){
        this.$ajax.post('banji/list', {}).then(res => {
        var result = res.data;
        this.bjs = result.data;

      })
     },
     uuu(){
       this.currentRow=null;
        console.log(this.currentRow);
     },
      beforeupload(file){
        this.form.file=file
        return false
      },
      kan(){
      this.src="http://localhost:8081/student/download?id="+this.currentRow.id
      console.log(this.src)
      this.dialogVisible2=true
      },
      czmm(){
        this.$ajax.post('student/mima',this.currentRow).then(res=>{
          var result = res.data
          if(result){
            this.$notify({
              title: '提示',
              message: '密码重置成功为1111',
              position: 'bottom-right'
            });
          }else{
            this.$notify({
              title: '提示',
              message: '密码重置失败',
              position: 'bottom-right'
            });
          }
        }).catch((e) => {});

      },
    },

    watch: {
      tbClassId(val) {
        this.tableVisible = false;
        if (val) {
          this.urlParam = {
            tbClassId: val
          };
          this.$nextTick(() => {
            this.tableVisible = true;
          })
        }
      }
    }
  }
</script>

<style scoped>
  .el-table,
  .cell {
    line-height: 60px;
  }
</style>
