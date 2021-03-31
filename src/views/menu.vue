<template>

<div>  <el-button  icon="el-icon-refresh" @click="refreshTable" plain>刷新</el-button>
  <el-table
    :data="stus"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="id"
      label="序号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="parent.id"
      label="父级"
      sortable
      width="180">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
   export default {
      data() {
        return {
          stus: [],
          size:'small',
          currentRow:{},
          queryParams:{

          }
        }
      },
      methods: {
         father(){
           var parent=this.result.parent;
          console.log(par)
         },
        currentRow(){
          this.currentRow=row
        },
     refreshTable(){
          this.$ajax.post('page1',this.queryParams).then(res=>{
            var result=res.data;
            if(result.success){
                this.stus=result.data.rows;
                this.total=result.data.total;
                this.currentRow=null;
            }
            console.log(result);
          }).catch(err=>{})
        },

      },
      mounted() {
        this.refreshTable();
        this.father();
      }
    }
</script>
