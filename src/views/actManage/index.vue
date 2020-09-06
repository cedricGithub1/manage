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
          prop="tpProjectName"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="tpName"
          label="参与人姓名">
        </el-table-column>
        <el-table-column
          prop="tpCount"
          label="参与人数">
        </el-table-column>
        <el-table-column
          prop="tpUnionCode"
          label="编码">
        </el-table-column>
        <el-table-column
          prop="tpQueryFlag"
          label="是否可查询"
          :formatter='formatter'>
        </el-table-column>
        <el-table-column
          prop="tpVersion"
          label="版本号">
        </el-table-column>
        <el-table-column
          prop="tpStartTime"
          label="开始时间"
          :formatter="tpStartTime"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="tpEndTime"
          label="结束时间"
          width="200px"
          :formatter="tpEndTime">
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
      <el-dialog title="新建活动" width='40%' :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称：" :label-width="formLabelWidth">
            <el-input v-model="form.tpProjectName" autocomplete="off" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="参与人数：" :label-width="formLabelWidth">
            <el-input v-model="form.tpCount" autocomplete="off" type="number" placeholder="请输入参入人数"></el-input>
          </el-form-item>
          <el-form-item label="编码：" :label-width="formLabelWidth">
            <el-input v-model="form.tpUnionCode" autocomplete="off" placeholder="请输入编码"></el-input>
          </el-form-item>
          <el-form-item label="是否可查询：" :label-width="formLabelWidth">
            <el-switch
              v-model="tpQueryFlag"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="参与人姓名: " :label-width="formLabelWidth">
            <el-input v-model="form.tpName" autocomplete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="版本号：" :label-width="formLabelWidth">
            <el-input v-model="form.tpVersion" autocomplete="off" placeholder="请输入版本号"></el-input>
          </el-form-item>
          <el-form-item label="活动名称：" :label-width="formLabelWidth">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div style="display: flex">
          <span style="display: inline-block;width:120px;text-align:right">请上传文件：</span>
          <el-upload
          ref="upload"
          :action="url"
          :before-upload="urlget"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          accept='.txt'
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
        </el-upload>
        </div>
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
        fileList: [],
        url: ''
      }
    },
    methods: {
      urlget (file) {
        return new Promise((resolve, reject) => {
          this.$nextTick(() => {
            this.url = `/api/uploadFile/${this.id}`       
            resolve()
          })
       })
      },
      formatter(row) {
        return row.tpQueryFlag == 1 ? '可查询':'不可查询'
      },
      tpStartTime(row,val) {
        return this.moment(row.tpStartTime).format('YYYY-MM-DD hh:mm:ss')
      },
      tpEndTime(row) {
        return this.moment(row.tpEndTime).format('YYYY-MM-DD hh:mm:ss')
      },
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
      delrow(row) {
        this.axios.post('/api/deleteItem', {
          'tpId': row.tpId
        }).then(res => {
          this.listGet()
          Message.success({
            message: '删除成功'
          })
        })
      },
      sure() {
        this.form.tpStartTime = this.value[0]
        this.form.tpEndTime = this.value[1]
        this.tpQueryFlag ? this.form.tpQueryFlag = 1 : this.form.tpQueryFlag = 0
        console.log(this.form)
        if(!(this.form.tpProjectName&&this.form.tpCount&&this.form.tpStartTime&&this.form.tpEndTime&&this.form.tpUnionCode&&this.form.tpQueryFlag&&this.form.tpVersion&&this.form.tpName)) {
          Message.error({
            message: '请输入所有值'
          })
          return
        }
        if (this.fileList.length <=0) {
          Message.error({
            message: '请选择文件'
          })
          return
        }
        this.axios.post('/api/addItem',{
          ...this.form
        }).then(res => {
          this.fileList = []
          this.dialogFormVisible = false
          Message.success({
            message: '成功'
          })
          console.log(res)
          this.id = res.data.tpId
          this.$refs.upload.submit()
          this.listGet()
        })
      },
      upload() {

      },
      listGet() {
        this.axios.post('/api/queryItem',{
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

