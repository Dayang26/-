<template>
  <pop :divAttribute="divAttrbuid">
    <p>{{str}}</p>
    <h4 solt="head">顶部</h4>
    <div slot="main">
      <el-button>qwe</el-button>
    </div>
    <template v-slot:foot>


    </template>
  </pop>
</template>

<script>
  import pop from '../components/myCompon.vue'
  import {mapState,mapMutations} from 'vuex';
  export default{
    components:{pop},
    data() {
      return {
         str:"aaa",
         divAttrbuid:{
           id:'1',
           class:'a',
           bt:['学号','姓名','性别'],
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
         },



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

<style>
  .a{
    background-color: #ffff7f;
  }
</style>
