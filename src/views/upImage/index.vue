<template>
  <section>
      <div class="header">
        <el-button type="primary" size="small" @click="newAct()">上传图片</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="tId"
          width="180px"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="tName"
          width="150px"
          label="活动名称">
        </el-table-column>
        <el-table-column
          label="图片">
          <template slot-scope="scope">
            <img style="height: 100px;width:auto" :src="scope.row.tUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="地址">
          <template slot-scope="scope">
            <p :id="scope.row.tId">{{`http://81.68.214.197/voteView?type=${scope.row.tId}`}}</p>
          </template>
        </el-table-column>
        <el-table-column
          width="100px"
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
      <el-dialog title="图片上传" width='40%' :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="背景图片：" :label-width="formLabelWidth">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              action="/background/add"
              :show-file-list="false"
              :auto-upload='false'
              :data='{name: form.name}'
              :on-success="handleAvatarSuccess"
              :on-change="change">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
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
        url: '',
        imageUrl: ''
      }
    },
    methods: {
      change(file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarSuccess(res,file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = ''
        this.form.name = ''
        this.dialogFormVisible = false
      },
      newAct() {
        this.dialogFormVisible = true
      },
      delrow(row) {
        this.axios.post('/background/delete', {
          'tId': row.tId,
          'tFullUrl': row.tFullUrl
        }).then(res => {
          this.listGet()
          Message.success({
            message: '删除成功'
          })
        })
      },
      sure() {
        if(!this.form.name){
           Message.error({
            message: '请输入活动名'
          })
          return
        }
        this.$refs.upload.submit();
      },
      listGet() {
        this.axios.post('/background/query',{
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
<style lang="scss">
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    position: relative;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-icon-plus:before{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>

