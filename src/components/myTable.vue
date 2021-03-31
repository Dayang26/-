<template>
 <div style="padding: 1.25rem">
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form1" label-width="60px">
        <slot name="form"></slot>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save" :disabled="saveBtnDisable">保存</el-button>
      </span>
    </el-dialog>

    <p>
      <el-row>
        <el-col :span="20">
          <el-button :size="size" type="info" icon="el-icon-plus" @click="addClick">新增</el-button>
          <el-button :size="size" type="info" icon="el-icon-edit" @click="editClick" :disabled="!currentRow">修改</el-button>
          <el-button :size="size" type="info" icon="el-icon-delete" @click="delClick" :disabled="!currentRow">删除</el-button>

          <el-button type="warning" :size="size" icon="el-icon-refresh" @click="refreshTable">刷新</el-button>
<slot name="buttons"></slot>
        </el-col>
        <el-col :span="4">
          <el-input :size="size" placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="queryParams.search"
            clearable @change="searChange" />
        </el-col>
      </el-row>
    </p>
    <el-table :size="size" :data="stus" v-bind="tableAttrs" highlight-current-row @current-change="currentChange" style="width: 100%">
     <!-- <el-table-column type="index" width="50"> </el-table-column> -->
      <el-table-column v-for="(item,index) in cols" :key="index" :property="item.property" :label="item.label"> </el-table-column>
    </el-table>
    <div style="margin-top: 0.625rem;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParams.page"
        :page-sizes="pageSizes" :page-size="queryParams.limit" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name:'myTable',
    props:{
      file:{
        type:Object,
        default:''
      },
      size:{
        type:String,
        default:'small'
      },
      add:{
        type:Boolean,
        default:true
      },
      edit:{
        type:Boolean,
        default:true
      },
      del:{
        type:Boolean,
        default:true
      },
      refresh:{
        type : Boolean,
        default:true
      },
      url:{
        type: String,
        default:'/page'
      },
      deleteUrl:{
        type:String,
        default:'/delete'
      },
      saveUrl:{
        type:String,
        default:'/save'
      },
      path:{
        type:String
      },
      formObj:{
        type:Object,
        required:true
      },
      cols:{
        type:Array,
        required:true
      },
      tableData:{
        type:Array,
      },
      rules:{
        type:Object,
        required:true
      },
      pageParams:{
        type:Object
      },
      pageSize:{
        type:Array,
        default:()=>[10, 20, 50, 100]
      },
      tableAttrs:{
        type:Object,
        required:true
      },
      urlParam:{
        type:Object,
        default:()=>{}
      }
    },
    data() {
      return {
        dialogVisible: false,
        title: '对话框',
        // size: 'small',
        stus: [],
        total: 0,
        ajaxUrl:{
          url:'',
          deleteUrl:'',
          saveUrl:''
        },
        form: {
          stuNo: '',
          name: '',
          sex: ''
        },
        saveBtnDisable:false,
        currentRow: null,
        queryParams: {
          limit: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          search: ''
        },
        pageSizes: [10, 20, 50, 100],
      }
    },
    methods: {
      change(sss){
        console.log('change事件',sss);
      },
      addClick() {
        emptyObj(this.form);
        console.log(this.form);
        this.$emit('show-dialog',this.form);
        this.dialogVisible = true;
      },
      editClick() {
        Object.assign(this.form, this.currentRow);
        this.$emit('show-dialog',this.form);
        this.dialogVisible = true;
      },
      delClick() {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$ajax.post(this.ajaxUrl.deleteUrl, this.currentRow).then(res => {
            var result = res.data;
            if (result.success) {
              this.$notify.success({
                title: '提示',
                message: '数据删除成功',
                position: 'bottom-right',
              });
              this.total--;
              this.$emit('deleted',this.currentRow);
              this.refreshTable();
            }

          }).catch(err => {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      save() {
        this.$refs.form1.validate(valid => {
          this.saveBtnDisable=true;
          if (valid) {
            this.$ajax.post(this.ajaxUrl.saveUrl, Object.assign({},this.form,this.urlParam,this.file)).then(res => {
              var result = res.data;
              if (result.success) {
                //emptyObj(this.form);
                this.dialogVisible = false;
                this.$notify({
                  title: '提示',
                  message: '数据保存成功',
                  position: 'bottom-right'
                });
                this.saveBtnDisable=false;
                this.$emit('save-succ',this.form);
                this.refreshTable();
              }
            })
          }else{
            this.saveBtnDisable=false;
          }

        })
      },
      currentChange(row) {
        this.currentRow = row;
        this.$emit("currentChange",row);
      },
      refreshTable() {
        if(this.queryParams.limit*(this.queryParams.page-1)>=this.total&&this.queryParams.page>1){
          this.queryParams.page--;
        }

        this.$ajax.post(this.ajaxUrl.url,Object.assign({},this.queryParams,this.urlParam)).then(res => {
          var result = res.data;
          if (result.success) {
            //this.stus = result.data;
            this.stus = result.data.rows;
            this.total = result.data.total;
            //console.log(result);
            this.currentRow = null;
          }
        }).catch(err => {})
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryParams.limit = val;
        this.refreshTable();
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.queryParams.page = val;
        this.refreshTable();
      },
      searChange() {
        this.queryParams.page=1;
        this.refreshTable();
      }

    },
    mounted() {
      this.refreshTable();
    },
    created() {
      if(this.path){
        this.ajaxUrl.url=this.path+this.url;
        this.ajaxUrl.deleteUrl=this.path+this.deleteUrl;
        this.ajaxUrl.saveUrl=this.path+this.saveUrl;
      }else{
        this.ajaxUrl.url=this.url;
        this.ajaxUrl.deleteUrl=this.deleteUrl;
        this.ajaxUrl.saveUrl=this.saveUrl;
      }
      this.form=this.formObj;
      Object.assign(this.queryParams,this.pageParams);
      this.pageSizes=this.pageSize;
      //this.rules2=this.rules;
    }
}
function emptyObj(obj){
  if(obj.file){
    obj.file='';
  }

  for( var key in obj){
    var o = obj[key];
    if(o instanceof Object){
      emptyObj(o);
    }else{
      obj[key]='';
    }
  }
}
</script>

<style>
</style>
