<template>
  <my-table :path="path" :url="url" :data="data" :cols="cols" :formObj="form" :rules="rules" :tableAttrs="tableAttrs" :page-size="pageSize" :pageParams="pageParams" @show-dialog="showDlg">
    <template v-slot:form>
  <el-form-item label="班名" prop="name">
        <el-input v-model="form.name" placeholder="班级" clearable></el-input>
      </el-form-item>

      <el-form-item label="导员" prop="manager">
        <el-input v-model="form.manager" placeholder="导员" clearable></el-input>
      </el-form-item>

    </template>
	<template v-slot:buttons>



	</template>
  </my-table>
</template>

<script>
  import myTable from '../components/myTable.vue'
  export default {
    components:{myTable},
    data() {
      return {
        data:{

          name:'',
          manager:''
        },
        path:'/banji',

        cols:[

          {property:'name',label:'班级'},
            {property:'manager',label:'班主任'},
        ],
        form:{
          name:'',
          manager:''
        },
        rules: {
          manager: [{
            required: true,
            message: '班主任必填',
            trigger: 'blur'
          }],

          name: [{
            required: true,
            message: '班级必填',
            trigger: 'blur'
          }]
        },
        tableAttrs:{
          border:true
        },
        pageSize:[3,10,20,50],
        pageParams:{
          limit:3
        }
      }
    },
    methods:{
      showDlg(form){
        console.log(form);
      },



    },
    mounted() {
    console.log(this.data)
    }
  }
</script>

<style>
</style>
