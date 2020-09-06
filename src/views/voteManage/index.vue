<template>
  <section>
      <div class="title">活动名称：---</div>
      <div class="header">
        <div>
          <span>请输入编号： </span>
          <el-input
            placeholder="请输入编号"
            v-model="input"
            clearable>
          </el-input>
        </div>
        <el-button type="primary" size="normal">查询</el-button>
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
            <el-button type="primary" size="small" @click="search(scope.row)">查询密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :page-size="100"
        :total="998">
      </el-pagination>
  </section>
</template>
<script>
 export default {
    data() {
      return {
        input:'',
        tableData: [],
        formLabelWidth: '120px'
      }
    },
    methods: {
      newAct() {
        this.dialogFormVisible = true
      },
      search(row) {
        console.log(row)
      },
      sure() {
        console.log(this.form)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .title{
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .header{
    height: 40px;
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    padding-left: 100px;
    padding-right: 100px;
    justify-content: center;
    .el-input {
      width: 200px;
      margin-right: 20px;
    }
  }
</style>

