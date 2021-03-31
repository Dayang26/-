<template>
  <div>
    <el-select v-model="tbClassId" placeholder="请选择班级" clearable @change="ggg">
        <el-option v-for="bj in bjs" :key="bj.id" :value="bj.id" :label="bj.name"></el-option>
    </el-select>
    <table v-if="tbClassId" border="ture" id="acc">
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th v-for="item in kcs">{{item.name}}</th>
            <th>总分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in grades">
            <td v-for="r in item" >{{r}}</td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import MyTable from '../components/myTable.vue'
  export default {
    components:{MyTable},
    data() {
      return {
         tbClassId:'',
         bjs:[],
         tableVisible:false,
         path:'/student',
         urlParam:{},
         grades:[],
        kcs:[],


        tableAttr:{
          border:true
        }
      }
    },
    methods:{
     ggg(){
       console.log(this.tbClassId);
        var bjId=this.tbClassId;
            this.$ajax.post('grade/bjChange?bjId='+bjId,{}).then(res=>{
              var result=res.data;

                this.grades=result,
                console.log(this.grades)
                this.aaa=true;


            })
      this.$ajax.post('grade/bjChange2?bjId='+bjId,{}).then(res=>{
              var result=res.data;

                this.kcs=result,
              console.log(this.kcs)

            })

     }
    },
    created(){
      this.$ajax.post('banji/list',{}).then(res=>{
        var result=res.data;
        this.bjs=result.data;
        console.log(this.bjs);
      })
    },

    watch:{
      tbClassId(val){
        this.tableVisible=false;
        if(val){
          this.urlParam={tbClassId:val};
          this.$nextTick(()=>{
              this.tableVisible=true;
          })
        }
      }
    }
  }
</script>

<style>
  #acc{
    font-size: 17px;
    text-align: center;
    height:30vh;
    width: 100%;
  }
</style>
