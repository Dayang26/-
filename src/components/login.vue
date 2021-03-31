<template>
  <div id="acc">
    <div id="logo"></div>

    <div id="loginWindows">
      <span id="sn">成绩管理系统</span>
      <div id="aa">
        <label>账户：</label>
        <el-input type="text" id="ap" class="app" v-model="user.username" placeholder="请输入账号" />
      </div>

      <div id="bb">
        <label>密码：</label>
        <el-input type="password" id="ad" class="app" v-model="user.password" placeholder="请输入密码" />
      </div>

      <!--  <button type="button" @click="login()">登录</button> -->
      <el-button id="btn" type="info" @click="login()">登录</el-button>
    </div>
    <div id="tt"><p>版权所有 © 湖北三峡职业技术学院 鄂ICP备15006448号</p></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapMutations(['setName', 'setIsLogined', 'setUser']),
    login() {
      this.$ajax
        .post('login', this.user)
        .then(res => {
          var result = res.data;
          if (result.success) {
            var name = result.data.name;
            var token = result.data.token;
            var roles = result.data.roles;
            window.sessionStorage.setItem('roles', roles);
            window.sessionStorage.setItem('name', name);
            window.sessionStorage.setItem('token', token);
            this.setName(name);
            this.setIsLogined(true);
            this.setUser(this.user.username);
            /* this.$router.replace('/table'); */
            this.$router.replace('/main');
          }
        })
        .catch(error => {
          alert('账户或密码错误');
        });
    }
  }
};
</script>

<style scoped>
 #logo{
 background-image: url(../views/logo2.jpg);
  background-repeat: no-repeat;
  position: absolute;
  height: 10%;
  width: 20%;
  left: 0px;
  top: -10px;
  background-position: right top;
  background-attachment: scroll;

  -moz-opacity: 1;
  -ms-opacity: 1;
  -webkit-opacity: 1;
  -moz-background-size: 100% 100%;

  background-size: 100% 100%;
 }
#sn {
position: absolute;
top: 15px;
right: 120px;
  font-weight: bold;
  font-size: 25px;
   font-family: "Times New Roman", Times, serif;
}
#aa {
  position: absolute;
  top: -30px;
  right: -50px;
}
#bb {
  position: absolute;
  top: 40px;
  right: -50px;
}
div {
  width: 31.25rem;
  margin: 3.125rem auto;
  text-align: center;
}
input,
button {
  padding: 0.3rem 1rem;
  width: 100px;
  height: 35px;
}
.app {
  width: 250px;
}

#btn {
  position: absolute;
  top: 200px;
  right: 150px;
  background-color: #409eff;
}

#acc {
  background-image: url(../views/acc.jpg);
  background-repeat: no-repeat;
  position: absolute;
  height: 103.1%;
  width: 100%;
  left: 0px;
  top: -80px;
  background-position: right top;
  background-attachment: scroll;

  -moz-opacity: 1;
  -ms-opacity: 1;
  -webkit-opacity: 1;
  -moz-background-size: 100% 100%;

  background-size: 100% 100%;
}

#loginWindows {
  position: absolute;
  background-color: #edf5fc;
  top: 180px;
  right: 200px;
  width: 400px;
  height: 250px;
}
#tt{
  position: absolute;
  top: 95vh;
  left: 37%;
  font-family: sans-serif;
  font-size: 14px;
  color: #ffffff;
}
</style>
