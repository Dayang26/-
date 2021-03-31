<template>
  <div>
    <p>
      <el-row>
        <el-col :span="500">
          <el-button type="info" icon="el-icon-plus" @click="">新增</el-button>
          <el-button type="info" icon="el-icon-edit" @click="">修改</el-button>
          <el-button type="info" icon="el-icon-delete" @click="">删除</el-button>
        </el-col>
        <el-col :span="4"><el-input icon="" v-model="queryParams.search" style=" float:right;"></el-input></el-col>
      </el-row>
    </p>

    <!-- table -->
    <el-table :data="stus" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="stuNo" label="学号"></el-table-column>
      <el-table-column property="name" label="姓名"></el-table-column>
      <el-table-column property="sex" label="性别"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      stus: [],
      currentRow: {},
      queryParams: {
        search: ''
      }
    };
  },
  methods: {
    add() {},
    edit() {},
    del() {},

    refreshTable() {
      this.$ajax.post('list', {}).then(res => {
        var result = res.data;
        if (result.success) {
          this.stus = result.data;
        }
      });
      if (this.params) {
        //this.stus=this.params.stus;
        this.curr = this.params.curr;
      }
    },
    mounted() {
      this.refreshTable();
    },
    computed: {
      ...mapState(['params'])
    }
  }
};
</script>

<style>
el-button {
  text-align: center;
}
.el-input {
  position: relative;

  text-align: center;

  float: right;
}
</style>
