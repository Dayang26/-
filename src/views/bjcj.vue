<template>
  <div>

    <table  border="ture">
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
  export default{
    data(){
      return{



        grades:[],
        kcs:[]
      }
    },
    methods:{
      sss(){
         this.$ajax.post('grade/grbjcjcxcjb',{}).then(res=>{
          var result=res.data;
        this.grades=result;
        console.log(this.grades);

         })


      },
      ggg(){
          this.$ajax.post('grade/grbjcjcxcourse',{}).then(res=>{
        var result=res.data;

          this.kcs=result,
         console.log(this.kcs);

          })
      }
    },
    created() {
      this.sss();
      this.ggg()
    }
  }
</script>

<style>
</style>
