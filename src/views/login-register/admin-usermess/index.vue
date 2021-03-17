<template>
  <div>
    <d2-container>
      <template slot="header">
        <a style="padding-left: 4%"></a
        ><el-input
          placeholder="请输入姓名"
          v-model="UserCompellation"
          style="width: 15%"
          @clear="readAllUsersMessage(1)"
          clearable
        >
        </el-input
        ><el-button
          type="primary"
          icon="el-icon-search"
          :loading="this.loadingUserCompellation"
          @click="
            UserGrade = '';
            StudyDirection = '';
            readUserCompellationUsersMessage(1);
          "
          >搜索</el-button
        >
        <a style="padding-left: 10%"></a>
        <el-select
          v-model="UserGrade"
          clearable
          style="width: 15%"
          @clear="readAllUsersMessage(1)"
          placeholder="请选择年级"
        >
          <el-option
            v-for="item in userGrades"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          :loading="this.loadingUserGrade"
          @click="
            UserCompellation = '';
            StudyDirection = '';
            readGradeUsersMessage(1);
          "
          >搜索</el-button
        >
        <a style="padding-left: 10%"></a>
        <el-select
          v-model="StudyDirection"
          clearable
          style="width: 15%"
          @clear="readAllUsersMessage(1)"
          placeholder="请选择方向"
        >
          <el-option
            v-for="item in studyDirection"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          :loading="this.loadingStudyDirection"
          @click="
            UserCompellation = '';
            UserGrade = '';
            readStudyDirectionUsersMessage(1);
          "
          >搜索</el-button
        >
      </template>
      <div>
        <el-table :data="usersMessageData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户名">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="用户邮箱">
                  <span>{{ props.row.useremail }}</span>
                </el-form-item>
                <el-form-item label="用户昵称">
                  <span>{{ props.row.nickname }}</span>
                </el-form-item>
                <el-form-item label="注册时间">
                  <span>{{ props.row.registime }}</span>
                </el-form-item>
                <el-form-item label="座右铭">
                  <span>{{ props.row.usermotto }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="image" label="用户头像" min-width="120"
            ><template slot-scope="scope"
              ><el-avatar
                :size="42"
                shape="circle"
                :src="scope.row.userimage"
                @error="errorHandler"
              >
                <img
                  src="https://i.postimg.cc/bwfy8MNg/image.jpg"
                /> </el-avatar></template
          ></el-table-column>
          <el-table-column
            align="center"
            prop="usercompellation"
            label="用户姓名"
            min-width="120"
            sortable
          ></el-table-column>
          <el-table-column
            align="center"
            prop="usergender"
            label="性别"
            min-width="140"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="usergrade"
            label="用户年级"
            min-width="120"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="studydirection"
            label="学习方向"
            min-width="140"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="userqq"
            label="用户QQ"
            min-width="140"
          ></el-table-column>

          <el-table-column align="center" label="社团职位" min-width="140">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.studiopost"
                align="center"
                @change="setStudioPostAndIsShow(scope.row)"
                style="width: 120px"
              >
                <el-option label="社长" value="社长"></el-option>
                <el-option label="副社长" value="副社长"></el-option>
                <el-option label="社团成员" value="社团成员"></el-option>
              </el-select> </template
          ></el-table-column>

          <el-table-column align="center" min-width="160" label="显示在前台">
            <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.isshow"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
                @change="setStudioPostAndIsShow(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="180" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" round @click="handleOpen(scope.row)"
                >修改</el-button
              >

              <el-button size="mini" round @click="deleteUser(scope.row)" type="danger"
                >删除</el-button
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
      title="修改用户信息"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="头像">
          <el-avatar :size="42" shape="circle" :src="formLabelAlign.userimage">
          </el-avatar>
          <a style="padding-left: 5%"></a>
          <el-button
            size="mini"
            type="primary"
            round
            @click="
              formLabelAlign.userimage = 'https://i.postimg.cc/Kjc17Cc0/yaoguang.png'
            "
            >重置</el-button
          >
        </el-form-item>
         <!-- <el-form-item label="昵称">
          <el-input
            placeholder="请输入昵称"
            style="width: 20%"
            v-model="formLabelAlign.nickname"
          ></el-input>
           <a style="padding-left: 5%"></a>
          <el-button
            size="small"
            type="primary"
            
            @click="6"
            >修改</el-button
          >
        </el-form-item> -->
        <el-form-item label="姓名">
          <el-input
            placeholder="请输入姓名"
            style="width: 20%"
            v-model="formLabelAlign.usercompellation"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="formLabelAlign.usergender" label="男">男</el-radio>
          <el-radio v-model="formLabelAlign.usergender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年级">
          <el-input
            placeholder="请输入年级"
            style="width: 20%"
            v-model="formLabelAlign.usergrade"
          ></el-input>
        </el-form-item>
        <el-form-item label="座右铭">
          <el-input v-model="formLabelAlign.usermotto"></el-input>
        </el-form-item>
        <el-form-item label="学习方向">
          <el-select v-model="formLabelAlign.studydirection" style="width: 35%">
            <el-option
              v-for="item in studyDirection"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            placeholder="请输入QQ"
            style="width: 23%"
            v-model="formLabelAlign.userqq"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            switchOver(tempPage);
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="amendUserMessage(tempRowData)">确 定</el-button>
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
      labelPosition: "right",
      formLabelAlign: {
        userumage: "",
        usercompellation: "",
        usergender: "",
        usergrade: "",
        usermotto: "",
        studydirection: "",
        userqq: "",
      },
      studyDirection: [],
      usersMessageData: [], //表格数据集
      userGrades: [
        {
          value: "大一",
          label: "大一",
        },
        {
          value: "大二",
          label: "大二",
        },
        {
          value: "大三",
          label: "大三",
        },
        {
          value: "薪火相传",
          label: "薪火相传",
        },
      ],
      studyDirection: [
        {
          value: "人工智能",
          label: "人工智能",
        },
        {
          value: "Golang后台开发",
          label: "Golang后台开发",
        },
        {
          value: "游戏开发",
          label: "游戏开发",
        },
        {
          value: "前端开发",
          label: "前端开发",
        },
      ], //学习方向
      page: 10, //分页数
      pageNum: "5", //每页数据数
      tempPage: 1, //记录当前页
      UserCompellation: "", //查找的姓名
      UserEmail: "", //查找的用户邮箱
      ReadUsersType: 1, //读取用户的类型
      // loadingAllUser: false,  //按键加载
      loadingUserCompellation: false, //按键加载
      loadingUserGrade: false, //按键加载
      loadingStudyDirection: false, //按键加载

      UserGrade: "",
      StudyDirection: "",
      RejextText: "", //驳回理由
      dialogVisible: false, //打开对话框
      tempRowData: {},
    };
  },
  //加载即执行
  mounted() {
    this.readAllUsersMessage(1);
  },
  methods: {
    handleOpen(row) {
      this.dialogVisible = true;
      this.formLabelAlign = row;
      this.tempRowData = row;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.switchOver(this.tempPage);
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
      if (this.ReadUsersType == 1) {
        this.readAllUsersMessage(page);
      } else if (this.ReadUsersType == 2) {
        this.readUserCompellationUsersMessage(page);
      } else if (this.ReadUsersType == 3) {
        this.readGradeUsersMessage(page);
      } else if (this.ReadUsersType == 4) {
        this.readStudyDirectionUsersMessage(page);
      } else {
        this.$message({
          message: "操作错误，请刷新页面",
          type: "warning",
        });
      }
    },
    //读取全部的用户信息
    readAllUsersMessage(page) {
      //切换分页状态
      this.ReadUsersType = 1;
      let api = port.readAllUsersMessage + "?p=" + page + "&pn=" + this.pageNum;
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
          let res = resData.data;
          if (res.statuscode == 200) {
            this.usersMessageData = res.usersmessage;

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
                message: "暂无用户信息",
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
    //根据用户姓名读取用户信息
    readUserCompellationUsersMessage(page) {
      if (this.UserCompellation == "") {
        this.$message({
          message: "请输入姓名",
          type: "warning",
        });
        return false;
      }
      this.loadingUserCompellation = true;
      //切换分页状态
      this.ReadUsersType = 2;
      let api = port.readCompelationUsersMessage + "?p=" + page + "&pn=" + this.pageNum;
      Axios.post(
        api,
        JSON.stringify({
          usercompellation: this.UserCompellation,
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
          let res = resData.data;

          if (res.statuscode == 200) {
            this.loadingUserCompellation = false;
            this.usersMessageData = res.usersmessage;

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
                message: "暂无用户信息",
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
          this.loadingUserCompellation = false;
        })
        .catch((err) => {
          this.$message({
            message: "系统出错，请稍后再试",
            type: "warning",
          });
          console.log("打印错误：", err);
          this.loadingUserCompellation = false;
        });
    },
    //根据年级读取用户信息
    readGradeUsersMessage(page) {
      if (this.UserGrade == "") {
        this.$message({
          message: "请选择年级",
          type: "warning",
        });
        return false;
      }
      this.loadingUserGrade = true;

      //切换分页状态
      this.ReadUsersType = 3;
      let api = port.readGradeUsersMessage + "?p=" + page + "&pn=" + this.pageNum;
      Axios.post(
        api,
        JSON.stringify({
          usergrade: this.UserGrade,
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
          let res = resData.data;
          if (res.statuscode == 200) {
            this.loadingUserGrade = false;

            this.usersMessageData = res.usersmessage;

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
                message: "暂无用户信息",
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
          this.loadingUserGrade = false;
        })
        .catch((err) => {
          this.$message({
            message: "系统出错，请稍后再试",
            type: "warning",
          });
          console.log("打印错误：", err);
          this.loadingUserGrade = false;
        });
    },
    //根据专业方向读取用户信息
    readStudyDirectionUsersMessage(page) {
      if (this.StudyDirection == "") {
        this.$message({
          message: "请选择学习方向",
          type: "warning",
        });
        return false;
      }
      this.loadingStudyDirection = true;

      //切换分页状态
      this.ReadUsersType = 4;
      let api =
        port.readStudyDirectionUsersMessage + "?p=" + page + "&pn=" + this.pageNum;
      Axios.post(
        api,
        JSON.stringify({
          studydirection: this.StudyDirection,
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
          let res = resData.data;
          if (res.statuscode == 200) {
            this.loadingStudyDirection = false;

            this.usersMessageData = res.usersmessage;

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
                message: "暂无用户信息",
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
          this.loadingStudyDirection = false;
        })
        .catch((err) => {
          this.$message({
            message: "系统出错，请稍后再试",
            type: "warning",
          });
          console.log("打印错误：", err);
          this.loadingStudyDirection = false;
        });
    },
    //设置成员职位及是否显示在前台
    setStudioPostAndIsShow(row) {
      let api = port.SetStudioPostAndIsShow;
      Axios.post(
        api,
        JSON.stringify({
          username: row.username,
          studiopost: row.studiopost,
          isshow: row.isshow,
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
          let res = resData.data;
          if (res.statuscode == 200) {
            this.$message({
              message: "设置成功",
              type: "success",
            });
          } else if (res.statuscode == 212) {
            this.$message({
              message: "登陆已过期，请重新登录",
              type: "warning",
            });
          } else {
            this.$message({
              message: "操作失败，请稍后再试",
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
          this.switchOver(this.tempPage);
        });
    },
    //修改用户基础信息
    amendUserMessage(row) {
      this.$confirm("确认要修改该用户的基础信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let api = port.amendusermessage;
          Axios.post(
            api,
            JSON.stringify({
              username: row.username,
              adminemail: sessionStorage.getItem(md5("adminEmail")),
              token: sessionStorage.getItem(md5("adminToken")),
              userimage: row.userimage,
              usercompellation: row.usercompellation,
              usergender: row.usergender,
              usergrade: row.usergrade,
              usermotto: row.usermotto,
              studydirection: row.studydirection,
              userqq: row.userqq,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            }
          )
            .then((resData) => {
              let res = resData.data;
              if (res.statuscode == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              } else if (res.statuscode == 212) {
                this.$message({
                  message: "登陆已过期，请重新登录",
                  type: "warning",
                });
              } else {
                this.$message({
                  message: "修改失败，请稍后再试",
                  type: "warning",
                });
                console.log(res.statuscode, res.message);
              }
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
          console.log(err);
        });
    },
    //删除前台用户
    deleteUser(row) {
      this.$confirm("确认要删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let api = port.deleteUser;
          Axios.post(
            api,
            JSON.stringify({
              username: row.username,
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
              let res = resData.data;
              if (res.statuscode == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
              } else if (res.statuscode == 212) {
                this.$message({
                  message: "登陆已过期，请重新登录",
                  type: "warning",
                });
              } else {
                this.$message({
                  message: "删除失败，请稍后再试",
                  type: "warning",
                });
                console.log(res.statuscode, res.message);
              }
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
            message: "已取消删除操作",
            type: "warning",
          });
          console.log(err);
        });
    },
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
