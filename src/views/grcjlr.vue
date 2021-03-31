<template>
  <div>
    <span>
      <el-select v-model="tbClassId" placeholder="请选择班级" clearable @change="setStudent()">
        <el-option v-for="bj in bjs" :key="bj.id" :value="bj.id" :label="bj.name"></el-option>
      </el-select>

      <el-select v-model="studentId" placeholder="请选择学生" clearable @change="ggg()">
        <el-option v-for="st in sts" :key="st.id" :value="st.id" :label="st.name"></el-option>
      </el-select>
    </span>
    <el-table v-show="aaa" size="mini" :data="grades" border ref="tablel" highlight-current-row>
      <el-table-column v-for="item in cols" :key="item.id" v-bind="item"></el-table-column>
      <el-table-column label="成绩">
        <template slot-scope="scope">
          <el-input-number type="number" v-model="scope.row.grade" @change="setGrade(scope.row.id, scope.row.grade)"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MyTable from '../components/myTable.vue';
export default {
  components: { MyTable },
  data() {
    return {
      /*  grades: [],
                  stugrade: [{
                      label: '学号',
                      prop: 'student.username'
                    },
                    {
                      label: '姓名',
                      prop: 'student.name'
                    },
                  ],
                  sele: true,
                  table: true,
  */
      grades: [],
      studentId: '',
      size: '',
      sts: [],

      tbClassId: '',
      bjs: [],

      aaa: false,

      cols: [{ property: 'course.name', label: '课程' }],
      form: {
        name: '',
        grade: '',
        studentId: ''
      },
      tableAttr: {
        border: true
      }
    };
  },
  methods: {
    setGrade(id, grade) {
      console.log(id), console.log(grade);
      this.$ajax.post('grade/cjChange', { id: id, grade: grade }).then(res => {});
    },
    setStudent() {
      console.log(this.tbClassId);
      var bjId = this.tbClassId;
      this.$ajax.post('grade/getStu', { bjId }).then(res => {
        var result = res.data;
        if (result.success) {
          this.sts = result.data;
        }
      });
    },
    course() {
      this.$ajax.post('course/courselist', {}).then(res => {
        var result = res.data;
        this.kcs = result.data;
        console.log(this.kcs);
      });
    },
    ggg() {
      console.log(this.studentId);
      var stuId = this.studentId;
      this.$ajax.post('grade/getPersonGrade', { stuId }).then(res => {
        var result = res.data;
        if (result.success) {
          (this.grades = result.data), (this.aaa = true);
        }
      });
    }
  },
  watch: {
    // tbClassId(val){
    //  if(val!=null&&){
    //  }
    // }
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
