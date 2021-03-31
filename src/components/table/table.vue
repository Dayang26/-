<template>
  <div>
    <p>
      <el-button @click="add()" type="info">新增</el-button>
<!--      <button @click="edit()" :disabled="this.curr===-1">修改</button>
      <button @click="del()" :dised="this.curr===-1">删除</button> -->
      <button @click="logout2()">注销</button>
    </p>

<el-table
    :data="stus"
    style="width: 100%">
   <el-table-column
      label="学号"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-user"></i>
        <span style="margin-left: 10px">{{ scope.row.stuNo }}</span>
      </template>
    </el-table-column>

    <el-table-column
       label="姓名"
       width="180">
       <template slot-scope="scope">

         <span style="margin-left: 10px">{{ scope.row.name }}</span>
       </template>
     </el-table-column>

     <el-table-column
        label="性别"
        width="180">
        <template slot-scope="scope">

          <span style="margin-left: 10px">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>


    <el-table-column label="操作">
      <template slot-scope="stus">
        <el-button  @click="dialogVisible = true">编辑</el-button>
    <!--      <el-button
          size="mini"
          @click="edit(scope.$index, scope.row)">编辑</el-button>
 <el-button
          size="mini"
          type="danger"
          @click="del(stus.$index)">删除</el-button> -->
          <el-popconfirm
            confirm-button-text='好的'
            cancel-button-text='不用了'
            icon="el-icon-info"
            icon-color="red"
            @confirm="del(stus.$index)"
            title="这是一段内容确定删除吗？"
          >
            <el-button slot="reference" >删除</el-button>
          </el-popconfirm>

      </template>
    </el-table-column>
  </el-table>

 <!-- 分页器 -->
 <div style="margin-top: 0.625rem;">
  <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
   </div>




<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>

 <!-- Form -->



</template>

<script>
  import {mapState,mapMutations} from 'vuex';
  export default {
    data() {
      return {
        stus: [],
        curr: -1,
        dialogVisible: false,
        
      }
    },
    methods:{
        handleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
            },
      ...mapMutations(['setParams','logout']),
      add(){
        var params={stus:this.stus,curr:-1};
        this.setParams(params);
        this.$router.push('/edit');
      },
      edit(){
        var params={stus:this.stus,curr:this.curr};
        this.setParams(params);
        this.$router.push('/edit');

      },
      del(index){
        this.$ajax.post('delete',this.stus[index]).then(res=>{
          this.stus.splice(index,1);
          this.curr=-1;
        }).catch(error=>{
          alert('网络连接失败...');
        })
      },



          handleSizeChange(val) {
              console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              console.log(`当前页: ${val}`);
            },





      currRow(row){
       if(row===this.curr){
          this.curr=-1

           console.log("-1");
        }else{
          this.curr=row;
           console.log("11");

        }

      },
      logout2(){
        this.logout();
        this.$router.replace('/');
      }
    },
    computed:{
      ...mapState(['params'])
    },
    mounted() {
      this.$ajax.post('list',{}).then(res=>{
        var result=res.data;
        if(result.success){
          this.stus=result.data;
        }
      })
      if(this.params){
        //this.stus=this.params.stus;
        this.curr=this.params.curr;
      }
    }
  }
</script>

<style scoped>

  div {

    margin: 0rem auto;
    text-align: center;
    width: 800px;
  }
.el-table{
  margin: auto;
  width: 100%;
}
  td,th,button {
    padding: 0.3125rem 0.9375rem;

  }
  .active {
    background-color: aquamarine;
  }

</style>
