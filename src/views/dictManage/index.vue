<template>
  <section>
      <div class="header">
        <el-button type="primary" size="small" @click="newAct()">新建字典</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="tpId"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="tpKey"
          label="字典名称"
          :formatter="toShowKey">
        </el-table-column>
        <el-table-column
          prop="tpValue"
          label="字典值">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="delrow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change='currentChange'>
      </el-pagination>
      <el-dialog title="新建字典" width='40%' :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="手机型号：" :label-width="formLabelWidth">
            <el-input v-model="form.tpValue" autocomplete="off" placeholder="请输入手机型号"></el-input>
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
import { Message } from 'element-ui';
import { constants } from 'zlib';
import { async } from 'q';
 export default {
    data() {
      return {
        id: '',
        pageNum: 1,
        total: 0,
        pageSize: 6,
        tpQueryFlag: false,
        value: '',
        form: {},
        dialogFormVisible: false,
        tableData: [],
        formLabelWidth: '120px',
        url: ''
      }
    },
    methods: {
      toShowKey(row){
        return row.tpKey==="phone_type"? "手机型号": "通用"; 
      },
      newAct() {
        this.dialogFormVisible = true
      },
      delrow(row) {
        this.axios.post('/dict/delete', {
          'tpId': row.tpId
        }).then(res => {
          this.listGet()
          Message.success({
            message: '删除成功'
          })
        })
      },
      sure() {
        if(!this.form.tpValue){
           Message.error({
            message: '请输入所有值'
          })
          return
        }
       
        this.axios.post('/dict/add',{
          tpKey: 'phone_type',
          tpValue: this.form.tpValue
        }).then(res => {
          this.dialogFormVisible = false
          Message.success({
            message: '成功'
          })
          this.listGet()
        })
      },
      listGet() {
        this.axios.post('/dict/query',{
          pageSize: this.pageSize,
          pageNum: this.pageNum,
        }).then(res => {
          let result = res.data.data
          this.total= result.total
          this.tableData = result.list
        })
      },
      currentChange(val) {
        this.pageNum = val
        this.listGet()
      }
    },
    created() {
      this.listGet()
    }
  }
</script>
<style lang="scss" scoped>
.header {
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

