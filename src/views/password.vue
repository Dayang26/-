<template>
  <el-card style="height: 100%;">
      <div style="width: 500px; padding: 10px 350px;">
           <el-form :model="form" :rules="rules" ref="form">
             <el-form-item label="旧密码" label-width="100px" prop="oldPwd">
               <el-input type="password" v-model="form.oldPwd" placeholder="请输入旧密码" show-password></el-input>
             </el-form-item>
             <el-form-item label="新密码" label-width="100px" prop="newPwd" >
               <el-input type="password" v-model="form.newPwd" placeholder="请输入新密码" show-password></el-input>
             </el-form-item>
             <el-form-item label="确认密码" label-width="100px" prop="newPwd2">
               <el-input type="password" v-model="form.newPwd2" placeholder="请再次输入新密码" show-password></el-input>
             </el-form-item>
           </el-form>
           <span slot="footer" class="dialog-footer">
             <el-button type="primary" @click="changPwd">确 定</el-button>
           </span>
      </div>
</el-card>
</template>

<script>
  export default{
    data() {
      return {
       form:{
            oldPwd:'',
            newPwd:'',
            newPwd2:''
          },
         rules:{
                oldPwd:[{required:true,message:'旧密码不能为空',trigger:'blur'}],
                newPwd:[{required:true,message:'新密码不能为空',trigger:'blur'}],
                newPwd2:[{required:true,message:'请确认新密码',trgger:'blur'},]
              },
         roles:'',
      }
    },
    methods:{
          changPwd(){
            this.$ajax.post('/password/save',{'password1':this.form.oldPwd,'password2':this.form.newPwd,'password3':this.form. newPwd2}).then(res=>{
              var result=res.data
             console.log(result)
             if(result.success){
                this.$message({
                  message:'修改成功，请重新登录',
                  type:'success'
                });
                this.$router.replace('/')
             }else{
               this.$message(result.msg)
             }
            })
          },
    }
  }
</script>
