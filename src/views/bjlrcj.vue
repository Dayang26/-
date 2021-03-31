<template>
  <div>
    
      <el-select v-model="tbClassId" placeholder="请选择班级" clearable><el-option v-for="bj in bjs" :key="bj.id" :value="bj.id" :label="bj.name"></el-option></el-select>
    
      <el-select v-model="courseId" placeholder="请选择课程" clearable><el-option v-for="kc in kcs" :key="kc.id" :value="kc.id" :label="kc.name"></el-option></el-select>
    
    <el-button :size="size" type="info" icon="el-icon-plus" @click="cx">查询</el-button>

    <el-table size="mini" :data="grades" border ref="tablel" highlight-current-row v-if="aaa">
      <el-table-column v-for="item in stugrade" :key="item.id" v-bind="item"></el-table-column>
      <el-table-column label="成绩" width="150">
        <template slot-scope="scope">
          <el-input-number type="number" size="small" v-model="scope.row.grade" @change="setGrade(scope.row.id, scope.row.grade)"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- <el-card class="bjlrcj">
     <MyTable ref="aaa" v-if="tableVisible"  :cols="cols" :formObj="form"  :tableAttrs="tableAttr" :path="path" :urlParam="urlParam">


     </MyTable>
   </el-card> -->
</template>

<script>
import MyTable from '../components/myTable.vue';
export default {
  components: { MyTable },
  data() {
    return {
      grades: [],
      stugrade: [
        {
          label: '学号',
          prop: 'student.username'
        },
        {
          label: '姓名',
          prop: 'student.name'
        }
      ],
      sele: true,
      table: true,

      grades: [],
      tbClassId: '',
      bjs: [],
      courseId: '',
      aaa: '',
      kcs: [],

      cols: [{ property: 'id', label: '序号' }, { property: 'name', label: '姓名' }, { property: 'grade', label: '成绩' }],
      form: {
        name: '',
        grade: '',
        courseId: ''
      },
      tableAttr: {
        border: true
      }
    };
  },
  methods: {
    cx() {
      if (this.tbClassId != null && this.courseId != null) {
        console.log(this.tbClassId);
        console.log(this.courseId);
        var kcId = this.courseId;
        var bjId = this.tbClassId;
        this.$ajax.post('grade/bjcj', { kcId, bjId }).then(res => {
          var result = res.data;
          if (result.success) {
            (this.grades = result.data), (this.aaa = 1);
          }
        });
      }
    },
    setGrade(id, grade) {
      console.log(id), console.log(grade);
      this.$ajax.post('grade/cjChange', { id: id, grade: grade }).then(res => {});
    },

    course() {
      this.$ajax.post('course/courselist', {}).then(res => {
        var result = res.data;
        this.kcs = result.data;
        console.log(this.kcs);
      });
    }
  },

  watch: {
    tbClassId(val) {
      if ((val = null)) {
        this.aaa = null;
      }
    }
  },
  created() {
    this.$ajax.post('banji/list', {}).then(res => {
      var result = res.data;
      this.bjs = result.data;
      console.log(this.bjs);
    });
  },
  mounted() {
    /*  this.banji(); */
    this.course();
  }
};
</script>

<style></style>
