<template>
  <div>

 <el-table  size="mini" :data="grades" border ref="tablel" highlight-current-row >
       <!-- <el-table-column v-for="item in cols" :key="item.id" v-bind="item"></el-table-column>
        <el-table-column label="成绩" >
          <template slot-scope="scope">
            <el-input-number type="number"  v-model="scope.row.grade" @change="setGrade(scope.row.id,scope.row.grade)"></el-input-number>
          </template>
        </el-table-column> -->

          <el-table-column prop="student.stuNo" label="学号"></el-table-column>
           <el-table-column prop="course.name" label="课程"></el-table-column>
            <el-table-column prop="grade" label="成绩"></el-table-column>

      </el-table>
</div>
</template>

<script>
    import MyTable from '../components/myTable.vue'
  export default{
     components:{MyTable},
    data(){
      return{
      course:[],
      grades:[],
      cols:[
        {property:'course.name',label:'课程'},

      ],

      }

    },
    methods:{
      list(){
       this.$ajax.post('grade/grcjcx1',{}).then(res=>{
         var result=res.data;
         this.grades=result.data;

       })

       },
       kckc(){
           this.$ajax.post('course/courselist',{}).then(res=>{
         var result=res.data;
         this.course=result.data;
         console.log(this.course);
       })
       },

    },
    created() {
      this.list();
      this.kckc();

    }
  }
</script>

<style>
</style>
