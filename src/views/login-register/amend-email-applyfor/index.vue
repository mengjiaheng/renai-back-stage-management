<template>
  <div>
    <d2-container>
      <div>
        <el-table :data="amendEmailData" style="width: 100%">
          <el-table-column
            align="center"
            prop="username"
            label="用户名"
            min-width="120"
            sortable
          ></el-table-column>

          <el-table-column
            align="center"
            prop="useremail"
            label="用户旧邮箱"
            min-width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="usernewemail"
            label="用户新邮箱"
            min-width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="nickname"
            label="用户昵称"
            min-width="140"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="amendtext"
            label="修改理由"
            min-width="140"
          ></el-table-column>
          <el-table-column align="center" min-width="180" label="审核">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                round
                @click="checkAmendEmailApplyFor(scope.row, 1)"
                >通过</el-button
              >
              <el-button size="mini" type="danger" round @click="handleOpen(scope.row)"
                >驳回</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template slot="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page"
          @current-change="readAmendEmailApplyFor"
        ></el-pagination
      ></template>
    </d2-container>
    <el-dialog
      title="驳回理由"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入驳回理由"
        v-model="RejextText"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            RejextText = '';
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="checkAmendEmailApplyFor(tempRowData, 2)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import md5 from "crypto-js/md5";
var port = require("../../../apiconf");
export default {
  data() {
    return {
      amendEmailData: [], //表格数据集
      page: 10, //分页数
      pageNum: "12", //每页数据数
      tempPage: 1, //记录当前页

      RejextText: "", //驳回理由
      dialogVisible: false, //打开对话框
      tempRowData: {},
    };
  },
  //加载即执行
  mounted() {
    this.readAmendEmailApplyFor(1);
  },
  methods: {
    handleOpen(row) {
      this.dialogVisible = true;
      this.tempRowData = row;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.RejextText = "";
          done();
        })
        .catch((_) => {});
    },
    //读取全部的修改邮箱待审核用户
    readAmendEmailApplyFor(page) {
      this.tempPage = page;
      let api = port.readUserEmailAmendApplyFor + "?p=" + page + "&pn=" + this.pageNum;
      Axios.post(
        api,
        JSON.stringify({
          adminemail: sessionStorage.getItem(md5("adminEmail")),
          token: sessionStorage.getItem(md5("adminToken")),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
        .then((resData) => {
          // if (resData.data.code == 1) {
          let res = resData.data;
          // let res = ECBDecrypt(resData.data.data);
          if (res.statuscode == 200) {
            this.amendEmailData = res.emailamendusers;

            //设置分页数
            if (res.datasum % this.pageNum == 0) {
              this.page = parseInt(res.datasum / this.pageNum) * 10;
            } else {
              this.page = parseInt(res.datasum / this.pageNum + 1) * 10;
            }
          } else if (res.statuscode == 210) {
            if (page > 1) {
              this.readAmendEmailApplyFor(page - 1);
            } else {
              this.$message({
                message: "暂无修改申请申请",
                type: "warning",
              });
            }
          } else if (res.statuscode == 212) {
            this.$message({
              message: "登陆已过期，请重新登录",
              type: "warning",
            });
          } else {
            this.$message({
              message: "读取失败，请稍后再试",
              type: "warning",
            });
            console.log(res.statuscode, res.message);
          }
        })
        .catch((err) => {
          this.$message({
            message: "系统出错，请稍后再试",
            type: "warning",
          });
          console.log("打印错误：", err);
        });
    },

    //审核用户修改邮箱申请
    checkAmendEmailApplyFor(row, ischeck) {
      let val;
      let type;
      if (ischeck == 1) {
        val = "确认要通过该用户的邮箱变更申请吗？";
        type = "success";
      } else if (ischeck == 2) {
        if (this.RejextText == "") {
          this.$message({
            message: "请填写驳回理由",
            type: "warning",
          });
          return true;
        }
        val = "确认要驳回该用户的邮箱变更申请吗？";
        type = "warning";
      }
      this.$confirm(val, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
      })
        .then(() => {
          let api = port.checkEmailAmendApplyFor;
          Axios.post(
            api,
            JSON.stringify({
              username: row.username,
              useremail: row.useremail,
              usernewemail: row.usernewemail,
              ischeck: ischeck,
              rejecttext: this.RejextText,
              adminemail: sessionStorage.getItem(md5("adminEmail")),
              token: sessionStorage.getItem(md5("adminToken")),
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            }
          )
            .then((resData) => {
              // if (resData.data.code == 1) {
              let res = resData.data;
              if (res.statuscode == 200) {
                this.$message({
                  message: "审核成功",
                  type: "success",
                });
              } else if (res.statuscode == 208) {
                this.$message({
                  message: "该账号已审核，无法重新审核",
                  type: "warning",
                });
              } else if (res.statuscode == 212) {
                this.$message({
                  message: "登陆已过期，请重新登录",
                  type: "warning",
                });
              } else {
                this.$message({
                  message: "审核失败，请稍后再试",
                  type: "warning",
                });
                console.log(res.statuscode, res.message);
              }
              this.RejextText = "";
              this.dialogVisible = false;
              this.readAmendEmailApplyFor(this.tempPage);
            })
            .catch((err) => {
              this.$message({
                message: "系统出错，请稍后再试",
                type: "warning",
              });
              console.log("打印错误：", err);
              this.amendEmailData = [];
              this.readAmendEmailApplyFor(this.tempPage);
            });
        })
        .catch((err) => {
          //异常情况
          this.$message({
            message: "已取消审核操作",
            type: "warning",
          });
        });
    },
  },
};
</script>

<style>
/* .el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
} */
</style>
