<template>
  <el-container>

    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>



  </el-container>
</template>

<script></script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>



<!-- <template>
  <el-container>




    <el-header style="background-color: #ffffff; height: 80px;">
      <el-button id="logout" @click="zx()">注销</el-button>
      <el-button id="udpw" @click="updatepassword()">修改密码</el-button>
      <a @click="sx()" id="title">湖北三峡职业技术学院</a>
    </el-header>

    <el-container>
      <el-aside id="aside" width="200px" style="background-color:#595959; height: 91.8vh; top: 100;">
        <el-col :span="12">
          <el-menu default-active="2" style="width: 199px;" class="el-menu-vertical-demo" background-color="#595959" text-color="#ffffff" active-text-color="#ffffff">
            <el-submenu index="1" @click="dao1" v-if="roles === 'ROLE_ADMIN'">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航管理员一</span>
              </template>

              <el-menu-item index="1-1" @click="stusTable()">学生管理</el-menu-item>
              <el-menu-item index="1-2" @click="teacherTable()">老师管理</el-menu-item>
              <el-menu-item index="1-3" @click="course()">课程管理</el-menu-item>
              <el-menu-item index="1-2" @click="banji()">班级管理</el-menu-item>
            </el-submenu>

            <el-submenu index="1" v-if="roles === 'ROLE_ADMIN' || roles === 'ROLE_TEACHER'">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>导航管理员，老师</span>
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
        <div id="bb"><p>版权所有 © 湖北三峡职业技术学院 鄂ICP备15006448号</p></div>
      </el-main>

      <!-- <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">

          <lable-input :form="ruleForm" lable="学号" prop="stuNo" @change=change>

          </lable-input>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" clearable  placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="ruleForm.sex" clearable  placeholder="请输入性别"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </el-dialog>
      -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      roles: '',
      dialogVisible: false
    };
  },
  methods: {
    sx() {
      this.$router.replace('/main');
    },
    logout2() {
      this.logout();
      this.$router.replace('/');
    },
    /*    updatepassword() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
          this.$ajax.post('updatepassword',{value})

          this.$message({
            type: 'success',
            message: '你的密码是: ' + value
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    updatepassword(){
      this.dialogVisible=true;
    },*/
    stusTable() {
      this.$router.push('/student');
    },
    teacherTable() {
      this.$router.push('/teacherTable');
    },
    course() {
      this.$router.push('/course');
    },
    banji() {
      this.$router.push('/banji');
    },
    bjcjlr() {
      this.$router.push('/bjlrcj');
    },
    grcjlr() {
      this.$router.push('/grcjlr');
    },
    cjcx() {
      this.$router.push('/cjcx');
    },
    xscj() {
      this.$router.push('/xscj');
    },
    bjcj() {
      this.$router.push('/bjcj');
    },
    zx() {
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

<style>
#bb {
  position: absolute;
  top: 97vh;
  left: 41%;
  font-family: sans-serif;
  font-size: 14px;
  color: #606266;
}
#logout {
  position: absolute;
  right: 20px;
  top: 18px;
}

#udpw {
  position: absolute;
  right: 100px;
  top: 18px;
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
</style>
 -->