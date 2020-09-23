<template>
  <section>
      <div class="top" :style="{backgroundImage: `url(${imgurl})`}">
        <div class="title"  v-if="tpProjectName">{{tpProjectName}}</div>
        <div class="header" >
          <div>
            <span>请输入查询编号： </span>
            <el-input
              placeholder="请输入编号"
              v-model="key"
              clearable>
            </el-input>
          </div>
          <el-button type="primary" size="normal" @click="query">查询</el-button>
        </div>
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
      <div class="bottom"  v-if="tableData.length  > 0">
        <span>共{{total}}条成功记录</span>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change='currentChange'>
        </el-pagination>
      </div>
      <el-dialog
        title="查询成功！请勿泄露！"
        :visible.sync="dialogVisible"
        width="30%">
        <span>{{messages}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </section>
</template>
<script>
import { Message } from 'element-ui';
import { constants } from 'zlib';
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
        titleStyle: 'margin-top:100px',
        dialogVisible: false,
        messages: '',
        imgurl: ''
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
        this.axios.post('/show/query/anwer', {
          tpShowId: row.tpShowId,
          tpProjectId: row.tpProjectId,
        }).then(res => {
          console.log(res)
          if(res.data.code === "000000"){
            this.dialogVisible = true
            this.messages = res.data.data.tpPhone +'---'+res.data.data.tpAnwer
          } else {
            Message.error({
              message: res.data.msg
            })
          }
        })
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
      imgGet() {
        this.axios.post('/background/query',{
          o: this.$route.query.type
        }).then(res => {
          console.log(res)
          this.imgurl = res.data.data.list[0].tUrl
        })
      },
      currentChange(val) {
        this.pageNum = val
        this.listGet()
      }
    },
    created() {
      if (this.$route.query.type) {
        this.imgGet()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .top{
    height: 150px;
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .title{
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
    color: #fff;
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
  .bottom{
    text-align: center;
    overflow: hidden;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      display: inline-block;
      margin-right: 20px;
    }
  }
  .el-pagination{
    float: none;
    display: inline-block;
    margin: 0;
    padding: 0;
  }
</style>

