<template>
  <div style="height: 500px;" class=main>
    <el-container>

      <el-header>
        <p>123</p>
      </el-header>
      <el-tabs v-model="activeName" @click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-row class="tac">

            <el-col :span="12">


              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1" @click="stusTable()">学生管理</el-menu-item>
                    <el-menu-item index="1-2" @click="teacherTable()">老师管理</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3" @click="course()">课程管理</el-menu-item>
                    <el-menu-item index="1-2" @click="banji()">班级管理</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1"  @click="bjcjlr()">班级成绩录入</el-menu-item>
					 <el-menu-item index="1-4-1"  @click="grcjlr()">个人成绩录入</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>

            </el-col>

          </el-row>

          <el-main>

            <router-view></router-view>
          </el-main>
          <!-- 以上导航栏 -->

        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>

      </el-tabs>












      <el-footer>Footer</el-footer>

    </el-container>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        activeName: 'second'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      logout2() {
        this.logout();
        this.$router.replace('/');
      },
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
	  }
    }
  }
</script>

<style scoped>
  .el-tabs {


    line-height: 70px;
  }

  .tac {
    background-color: #545c64;
    height: 757px;
    width: 249.1px;
    margin: 0em;
    z-index: 9999;

  }

  .el-col {
    width: 250px;
    height: 100%;
    margin: 0em;
  }

  .el-menu {
    margin: 0em;
    /* height: 870px; */
    background-color: red;
    z-index: 9999;
  }

  .el-container {

    margin: 0em;
  }

  .el-main {

    height: 899px;

    width: 1600px;

    position: relative;

    top: -755px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

    float: right;

  }

  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-footer {

    position: fixed;
    bottom: 0;
    width: 100%;
  }



  .el-container {
    margin-bottom: 90px;
  }
</style>
