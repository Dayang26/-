<template>
  <my-table
    :path="path"
    :url="url"
    :data="data"
    :cols="cols"
    :formObj="form"
    :rules="rules"
    :tableAttrs="tableAttrs"
    :page-size="pageSize"
    :pageParams="pageParams"
    @show-dialog="showDlg"
  >
    <template v-slot:form>
      <el-form-item label="用户" prop="username"><el-input v-model="form.username" placeholder="用户" clearable></el-input></el-form-item>
      <el-form-item label="姓名" prop="name"><el-input v-model="form.name" placeholder="姓名" clearable></el-input></el-form-item>
      <el-form-item label="密码" prop="name"><el-input v-model="form.password" placeholder="密码" clearable></el-input></el-form-item>
    </template>
    
  </my-table>
</template>

<script>
import myTable from '../components/myTable.vue';
export default {
  components: { myTable },
  data() {
    return {
      data: {
        username: '',
        name: ''
      },
      path: '/teacher',

      cols: [{ property: 'username', label: '用户名' }, { property: 'name', label: '姓名' }],
      form: {
        username: '',
        name: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '学号必填',
            trigger: 'blur'
          }
        ],

        name: [
          {
            required: true,
            message: '姓名必填',
            trigger: 'blur'
          }
        ]
      },
      tableAttrs: {
        border: true
      },
      pageSize: [3, 10, 20, 50],
      pageParams: {
        limit: 3
      }
    };
  },
  methods: {
    showDlg(form) {
      console.log(form);
    },
    sx() {
      this.$router.go(0);
    }
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style></style>
