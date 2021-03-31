<template>
  <el-form-item :label="lable" :prop="prop">
    <el-input v-model="form[prop]"  :placeholder="pal" clearable @change="inputChange"></el-input>

  </el-form-item>
</template>

<script>
  export default {
    props:{
      lable:{
        type:String,
        // default:'',默认值
        required:true
      },
      prop:{
        type:String,
        required:true
      },
      form:{
        type:Object,
        required:true
      }
    },
    data() {
      return {

      }
    },
    methods:{
      inputChange(e){
        this.$emit('change',e);
      }
    },
    computed:{
      pal(){
        return '请输入1'+this.lable
      }
    },
    }
</script>

<style>
</style>
