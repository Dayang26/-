<template>
  <el-container>
    <el-header style="background-color: #ffffff; height: 80px;">
      <el-button id="logout" @click="zx()">注销</el-button>
      <el-button id="udpw" @click="password()">修改密码</el-button>
      <a @click="sx()" id="title">湖北三峡职业技术学院</a>
    </el-header>

    <el-container>
      <el-aside id="aside" width="200px" style="background-color:#5f5f5f; height: 91.8vh; top: 100;">
        <el-col :span="12">
          <el-menu default-active="2" style="width: 199px;" class="el-menu-vertical-demo" background-color="#5f5f5f" text-color="#ffffff" active-text-color="#ffffff">
            <el-submenu index="1" @click="dao1" v-if="roles === 'ROLE_ADMIN'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>

              <el-menu-item index="1-1" @click="stusTable()">学生管理</el-menu-item>
              <el-menu-item index="1-2" @click="teacherTable()">老师管理</el-menu-item>
              <el-menu-item index="1-3" @click="course()">课程管理</el-menu-item>
              <el-menu-item index="1-4" @click="banji()">班级管理</el-menu-item>
              <el-menu-item index="1-5" @click="select()()">部门管理</el-menu-item>
            </el-submenu>

            <el-submenu index="1" v-if="roles === 'ROLE_ADMIN' || roles === 'ROLE_TEACHER'">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>成绩管理</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="1-4-1" @click="bjcjlr()">班级成绩录入</el-menu-item>
                <el-menu-item index="1-4-1" @click="grcjlr()">个人成绩录入</el-menu-item>
                <el-menu-item index="1-4-1" @click="cjcx()">班级成绩查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1" v-if="roles === 'ROLE_STUDENT'">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>导航学生</span>
              </template>

              <el-menu-item-group title="分组2">
                <el-menu-item index="1-4-1" @click="xscj()">学生成绩</el-menu-item>
                <el-menu-item index="1-4-1" @click="bjcj()">班级成绩</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main style="background-color: #ffffff;">
        <router-view></router-view>
        <div id="head"></div>
        <div id="bg" v-show="isShow"></div>
        <div id="bb"><p>版权所有 © 湖北三峡职业技术学院 鄂ICP备15006448号</p></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      roles: '',
      isShow: true,
      dialogVisible: false
    };
  },
  methods: {
    sx() {
      this.isShow = true;
      this.$router.replace('/main');
    },
    logout2() {
      this.isShow = true;
      this.logout();
      this.$router.replace('/');
    },
    stusTable() {
      this.isShow = false;
      this.$router.push('/student');
    },
    teacherTable() {
      this.isShow = false;
      this.$router.push('/teacherTable');
    },
    course() {
      this.isShow = false;
      this.$router.push('/course');
    },
    banji() {
      this.isShow = false;
      this.$router.push('/banji');
    },
    bjcjlr() {
      this.isShow = false;
      this.$router.push('/bjlrcj');
    },
    grcjlr() {
      this.isShow = false;
      this.$router.push('/grcjlr');
    },
    cjcx() {
      this.isShow = false;
      this.$router.push('/cjcx');
    },
    xscj() {
      this.isShow = false;
      this.$router.push('/xscj');
    },
    bjcj() {
      this.isShow = false;
      this.$router.push('/bjcj');
    },
    password() {
      this.isShow = false;
      this.$router.push('/password');
    },
    select() {
       this.isShow = false;
      this.$router.push('/select');
    },
    zx() {
      this.isShow = false;
      this.isShow = true;
      this.$ajax.post('logout', {}).then(res => {
        var result = res.data;
        if (result.success) {
          window.sessionStorage.removeItem('token');
          window.sessionStorage.removeItem('name');
          this.$notify.success({
            title: '提示',
            message: result.msg,
            position: 'bottom-right'
          });
          this.$router.replace('/');
        }
      });
    }
  },
  created() {
    this.roles = window.sessionStorage.getItem('roles');
    this.name = window.sessionStorage.getItem('name');
    console.log('1');
    console.log(this.roles);
  }
};
</script>

<style scoped>
#bb {
  position: absolute;
  top: 97vh;
  left: 41%;
  font-family: sans-serif;
  font-size: 14px;
  color: #ffffff;
}
#logout {
  position: absolute;
  right: 20px;
  top: 23px;
}

#udpw {
  position: absolute;
  right: 100px;
  top: 23px;
}

#title {
  font-family: Cursive;
  font-size: 35px;
  position: absolute;
  top: 18px;
  color: #2b2b2b;
  left: 80px;
}
#head {
  background-image: url(../views/12312.jpg);
  background-repeat: no-repeat;
  position: absolute;
  height: 250px;
  width: 250px;
  left: -185px;
  top: 5px;
  background-position: right top;
  background-attachment: scroll;

  -moz-opacity: 1;
  -ms-opacity: 1;
  -webkit-opacity: 1;
  -moz-background-size: 25% 25%;

  background-size: 25% 25%;
}
#bg {
  background-image: url(../views/111.jpg);
  background-repeat: no-repeat;
  position: absolute;
  height: 895px;
  width: 1700px;
  left: 200px;
  top: 80px;
  background-position: right top;
  background-attachment: scroll;

  -moz-opacity: 1;
  -ms-opacity: 1;
  -webkit-opacity: 1;
  -moz-background-size: 100% 100%;

  background-size: 100% 100%;
}
</style>
