<template>
  <div>
    <d2-container>
      <template slot="header">
        <a style="padding-left: 10%"></a
        ><el-input
          placeholder="请输入用户名"
          v-model="UserName"
          style="width: 18%"
          @clear="readAllRegisterApplyFor(1)"
          clearable
        >
        </el-input
        ><el-button
          type="primary"
          icon="el-icon-search"
          :loading="this.loadingUserName"
          @click="readUserNameRegisterApplyFor(1)"
          >搜索</el-button
        >
        <a style="padding-left: 25%"></a>
        <el-input
          placeholder="请输入用户邮箱"
          v-model="UserEmail"
          style="width: 18%"
          @clear="readAllRegisterApplyFor(1)"
          clearable
        >
        </el-input
        ><el-button
          type="primary"
          icon="el-icon-search"
          :loading="this.loadingUserEmail"
          @click="readUserEmailRegisterApplyFor(1)"
          >搜索</el-button
        ></template
      >
      <div>
        <el-table :data="registerData" style="width: 100%">
          <el-table-column
            align="center"
            prop="image"
            label="用户头像"
            min-width="120"
            sortable
            ><template slot-scope="scope"
              ><el-avatar
                :size="42"
                shape="circle"
                :src="scope.row.image"
                @error="errorHandler"
              >
                <img
                  src="https://i.postimg.cc/bwfy8MNg/image.jpg"
                /> </el-avatar></template
          ></el-table-column>
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
            label="用户邮箱"
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
            prop="registime"
            label="注册时间"
            min-width="140"
            sortable
          ></el-table-column>
          <el-table-column align="center" min-width="180" label="审核">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                round
                @click="checkRegisApplyFor(scope.row, 1)"
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
          @current-change="switchOver"
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
        <el-button type="primary" @click="checkRegisApplyFor(tempRowData, 2)"
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
      registerData: [], //表格数据集
      page: 10, //分页数
      pageNum: "12", //每页数据数
      tempPage: 1, //记录当前页
      UserName: "", //查找的用户名
      UserEmail: "", //查找的用户邮箱
      ReadRegisType: 1, //读取待审核用户的类型
      // loadingAllUser: false,  //按键加载
      loadingUserName: false, //按键加载
      loadingUserEmail: false, //按键加载

      RejextText: "", //驳回理由
      dialogVisible: false, //打开对话框
      tempRowData: {},
    };
  },
  //加载即执行
  mounted() {
    this.readAllRegisterApplyFor(1);
  },
  methods: {
    // tableRowClassName({ row, rowIndex }) {
    //   if (rowIndex % 2 === 0) {
    //     return "warning-row";
    //   } else if (rowIndex % 3 === 0) {
    //     return "success-row";
    //   }
    //   return "";
    // },

    //测试函数
    // returnIndex(index,row){

    //   console.log("测试：",index,row)
    //   return this.image[index]
    // },
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
    //头像加载失败时调用
    errorHandler() {
      console.log("头像加载失败了");
      return true;
    },
    //切换分页要访问的路由函数
    switchOver(page) {
      this.tempPage = page;
      if (this.ReadRegisType == 1) {
        this.readAllRegisterApplyFor(page);
      } else if (this.ReadRegisType == 2) {
        this.readUserNameRegisterApplyFor(page);
      } else if (this.ReadRegisType == 3) {
        this.readUserEmailRegisterApplyFor(page);
      } else {
        this.$message({
          message: "操作错误，请刷新页面",
          type: "warning",
        });
      }
    },
    //读取全部的注册待审核用户
    readAllRegisterApplyFor(page) {
      this.ReadRegisType = 1;
      let api = port.readAllRegisAppFor + "?p=" + page + "&pn=" + this.pageNum;
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
            this.registerData = res.registerusers;

            //设置分页数
            if (res.datasum % this.pageNum == 0) {
              this.page = parseInt(res.datasum / this.pageNum) * 10;
            } else {
              this.page = parseInt(res.datasum / this.pageNum + 1) * 10;
            }
          } else if (res.statuscode == 210) {
            if (page > 1) {
              this.switchOver(page - 1);
            } else {
              this.$message({
                message: "暂无注册申请",
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
    //根据用户名读取注册待审核用户
    readUserNameRegisterApplyFor(page) {
      if (this.UserName == "") {
        this.$message({
          message: "请输入用户名",
          type: "warning",
        });
        return false;
      }
      this.loadingUserName = true;
      //切换分页状态
      this.ReadRegisType = 2;
      let api = port.readUserNameRegisAppFor + "?p=" + page + "&pn=" + this.pageNum;
      Axios.post(
        api,
        JSON.stringify({
          username: this.UserName,
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
            this.loading = false;
            this.registerData = res.registerusers;

            //设置分页数
            if (res.datasum % this.pageNum == 0) {
              this.page = parseInt(res.datasum / this.pageNum) * 10;
            } else {
              this.page = parseInt(res.datasum / this.pageNum + 1) * 10;
            }
          } else if (res.statuscode == 210) {
            if (page > 1) {
              this.switchOver(page - 1);
            } else {
              this.$message({
                message: "暂无注册申请",
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
          this.loadingUserName = false;
        })
        .catch((err) => {
          this.$message({
            message: "系统出错，请稍后再试",
            type: "warning",
          });
          console.log("打印错误：", err);
          this.loadingUserName = false;
        });
    },
    //根据用户邮箱读取注册待审核用户
    readUserEmailRegisterApplyFor(page) {
      if (this.UserEmail == "") {
        this.$message({
          message: "请输入用户邮箱",
          type: "warning",
        });
        return false;
      }
      this.loadingUserEmail = true;

      //切换分页状态
      this.ReadRegisType = 3;
      let api = port.readUserEmailRegisAppFor + "?p=" + page + "&pn=" + this.pageNum;
      Axios.post(
        api,
        JSON.stringify({
          useremail: this.UserEmail,
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
            this.loading = false;
            this.registerData = res.registerusers;

            //设置分页数
            if (res.datasum % this.pageNum == 0) {
              this.page = parseInt(res.datasum / this.pageNum) * 10;
            } else {
              this.page = parseInt(res.datasum / this.pageNum + 1) * 10;
            }
          } else if (res.statuscode == 210) {
            if (page > 1) {
              this.switchOver(page - 1);
            } else {
              this.$message({
                message: "暂无注册申请",
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
          this.loadingUserEmail = false;
        })
        .catch((err) => {
          this.$message({
            message: "系统出错，请稍后再试",
            type: "warning",
          });
          console.log("打印错误：", err);
          this.loadingUserEmail = false;
        });
    },

    //审核用户注册申请
    checkRegisApplyFor(row, ischeck) {
      let val;
      let type;
      if (ischeck == 1) {
        val = "确认要通过该用户的注册申请吗？";
        type = "success";
      } else if (ischeck == 2) {
        if (this.RejextText == "") {
          this.$message({
            message: "请填写驳回理由",
            type: "warning",
          });
          return true;
        }
        val = "确认要驳回该用户的注册申请吗？";
        type = "warning";
      }
      this.$confirm(val, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type,
      })
        .then(() => {
          let api = port.checkRegisApplyFor;
          Axios.post(
            api,
            JSON.stringify({
              username: row.username,
              useremail: row.useremail,
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
              this.registerData = [];
              this.switchOver(this.tempPage);
            })
            .catch((err) => {
              this.$message({
                message: "系统出错，请稍后再试",
                type: "warning",
              });
              console.log("打印错误：", err);
              this.switchOver(this.tempPage);
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
