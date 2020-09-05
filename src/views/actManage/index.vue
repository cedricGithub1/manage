<template>
  <section>
      <div class="header">
        <el-button type="primary" size="small" @click="newAct()">新建活动</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          label="查询密码">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="search(scope.row)">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :page-size="100"
        :total="998">
      </el-pagination>
      <el-dialog title="新建活动" width='40%' :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动名称：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上传用户数据：" :label-width="formLabelWidth">
            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              accept='.txt'
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
              <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
  </section>
</template>
<script>
 export default {
    data() {
      return {
        form: {},
        dialogFormVisible: false,
        input: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        formLabelWidth: '120px',
        fileList: []
      }
    },
    methods: {
      // submitUpload() {
      //   this.$refs.upload.submit();
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      newAct() {
        this.dialogFormVisible = true
      },
      search(row) {
        console.log(row)
      },
      sure() {
        console.log(this.form)
      },
      listGet() {
        console.log(1211)
        this.axios.get('/api/test').then(res => {
          console.log(res)
        })
      },   
    },
    created() {
      this.listGet()
    }
  }
</script>
<style lang="scss" scoped>
  .header{
    height: 40px;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    justify-content: space-between;
    .el-input {
      width: 200px;
    }
  }
</style>

