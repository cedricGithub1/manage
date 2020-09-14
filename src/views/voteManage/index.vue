<template>
  <section>
      <div class="title"  v-if="tpProjectName">活动名称：{{tpProjectName}}</div>
      <div class="header" >
        <div>
          <span>请输入编号： </span>
          <el-input
            placeholder="请输入编号"
            v-model="key"
            clearable>
          </el-input>
        </div>
        <el-button type="primary" size="normal" @click="query">查询</el-button>
      </div>
      <el-table
        v-if="tableData.length  > 0"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="tpShowId"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tpDoneTime"
          label="完成时间"
          width="180"
          :formatter="toDoneShow">
        </el-table-column>
        <el-table-column
          prop="tpName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tpPhone"
          label="手机号"
          :formatter="toPhoneShow">
        </el-table-column>
        <el-table-column
          prop="tpIp"
          label="Ip">
        </el-table-column>
         <el-table-column
          prop="tpPhoneType"
          label="手机型号">
        </el-table-column>
        <el-table-column
          label="查询密码">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="search(scope.row)">查询密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="tableData.length  > 0"
        background
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change='currentChange'>
      </el-pagination>
  </section>
</template>
<script>
import { Message } from 'element-ui';
 export default {
    data() {
      return {
        input:'',
        tableData: [],
        formLabelWidth: '120px',
        key: '',
        pageNum: 1,
        total: 0,
        pageSize: 10,
        tpProjectName: '',
        titleStyle: 'margin-top:100px'
      }
    },
    methods: {
      toPhoneShow(row){
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        return row.tpPhone.replace(reg, "$1****$2"); 
      },
      toDoneShow(row){
       return this.moment(row.tpDoneTime).format('YYYY-MM-DD hh:mm:ss'); 
      },
      newAct() {
        this.dialogFormVisible = true
      },
      search(row) {
        this.$alert(row.tpPhone +'---'+row.tpAnwer, '请不要泄露！！！', {
          confirmButtonText: '确定'
        });
      },
      query(){
        this.axios.post('/api/query',{
          o: this.key
        }).then(res => {
          if(res.data.code === "000000"){
            this.tpProjectName=res.data.projectName
          } else {
             Message.error({
               message: res.data.msg
              })
          }
          
        })
        this.listGet()
      },
      listGet() {
        // alert('1231')
        if(this.key===''){
          Message.error({
            message: '请输入查询编号'
          })
          return
        }
        this.axios.post('/show/query',{
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          o: this.key
        }).then(res => {
          if(res.data.code === "000000"){
            let result = res.data.data
            this.total= result.total
            this.tableData = result.list
          } else {
             Message.error({
               message: res.data.msg
              })
          }
          
        })
      },
      currentChange(val) {
        this.pageNum = val
        this.listGet()
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

