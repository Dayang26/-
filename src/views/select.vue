<template>
  <el-card class="banji">
  <div style="margin:  0 auto;width: 95%;height: 100%;">
    <el-dialog title="提示"  :visible.sync="dialogVisible" width="23%" >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="上级部门:" >
          <select-tree :options="options" @getValue="getValue" :value="value" ref="tree"></select-tree>
          </el-form-item>
        <el-form-item label="部门名称:" prop="name">
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <el-col style="text-align: left;">
      <el-button size="small" type="info"  icon="el-icon-plus" @click="add">新增</el-button>
      <el-button size="small" type="info"  icon="el-icon-edit" @click="edit" :disabled="!row">修改</el-button>
      <el-button size="small" type="info"  icon="el-icon-delete" @click="del" :disabled="!row">删除</el-button>
      <el-button size="small" type="warning"  icon="el-icon-refresh" @click="refresh">刷新</el-button>
    </el-col>
    </el-row>
    <el-table :data="tableData"  highlight-current-row ref="table" style="width: 100%;height:auto margin-bottom: 20px;margin-top: 15px;" row-key="id" border  @current-change="changeRow" default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

      <el-table-column prop="name" label="部门名称"  >
      </el-table-column>
    </el-table>
  </div>
  </el-card>
</template>

<script>
  import selectTree from '../components/selectTree.vue'
  export default {
    components:{
      selectTree
    },
    name: 'treeTable',
    data() {
      return {
        tableData: undefined,
        row:undefined,
        dialogVisible:false,
        form:{},
        options:undefined,
        value:undefined,
        rules: {
          name: [{
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      changeRow(row){
        this.row=row;
      },
      getValue(value){
        this.form.parentId=value;
      },
      add(){
        this.form={parentId:0}
        this.dialogVisible=true
        this.options=this.tableData;

      },
      edit(){

      this.dialogVisible=true
      this.form=deepClone1(this.row)
      this.value=this.form.parentId
      console.log(this.value);
      let opts=deepClone1(this.tableData)
      this.options=dataTree(opts,this.row)

      },
      del(){
         this.$confirm('确认删除？').then(_=>{
           this.$ajax.post('SysDept/del',this.row).then(res=>{
             let result=res.data;
             if(result.success){
               this.$notify({
                 title: '成功',
                 message: result.msg,
                 type: 'success',
                 position: 'bottom-right'
               });
               this.empty();
               this.updateTable();
             }

           }).catch(errors=>{
             this.$message.error(
               '网络连接失败......'
             );
           })
         })
      },
      refresh(){
         this.updateTable()
         this.$notify({
           title: '成功',
           message: "刷新成功",
           type: 'success'
         });
      },
      qx() {
        this.empty();
      },
      empty(){
        this.dialogVisible = false;
        this.$refs.tree.clearHandle();
        this.options=undefined
        this.form={}
        this.$refs.table.setCurrentRow()
        this.value=undefined
      },
      save() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$ajax.post('SysDept/save',this.form).then(res => {
              let result = res.data;
              if (result.success) {
                this.$notify({
                  title: '成功',
                  message: result.msg,
                  type: 'success',
                  position: 'bottom-right'
                });
                this.empty();
                this.updateTable();
              }
            }).catch(error => {
              this.$message.error(
                '网络连接失败......'
              );
            })
          }
        })
      },
      updateTable() {
        this.$ajax.post('SysDept/list', {}).then(res => {
          let result = res.data;
          if (result.success) {
            this.tableData = result.data;
          }
        }).catch(errors => {
          this.$message.error('网络连接失败...');
        })
      }
    },
    mounted() {
      this.updateTable();
    }
  }

  function dataTree(opts,row){
    if(opts!=null){
      for(let Key in opts){
        let o=opts[Key];

        if(o.id== row.id){
          opts.splice(Key,1);
          return opts;
        }else{
          dataTree(o.children,row);
        }
      }

    }
    return opts;
  }
  function deepClone1(obj) {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = deepClone1(obj[key]);
          } else {
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }
</script>

<style>
  .banji{
    min-height:84vh;
  }
</style>
