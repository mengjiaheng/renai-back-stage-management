<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer page-login--layer-time" flex="main:center cross:center">
      {{ time }}
    </div>
    <div v-show="isTrue">
      <div class="page-login--layer">
        <div
          class="page-login--content"
          flex="dir:top main:justify cross:stretch box:justify"
        >
          <div class="page-login--content-header">
            <p class="page-login--content-header-motto">时间是一切财富中最宝贵的财富</p>
          </div>
          <div class="page-login--content-main" flex="dir:top main:center cross:center">
            <div class="page-login--form">
              <el-card shadow="never">
                <el-form
                  ref="loginForm"
                  label-position="top"
                  :rules="rules"
                  :model="formLogin"
                  size="default"
                >
                  <el-form-item prop="userNameEmail">
                    <el-input
                      type="text"
                      v-model="formLogin.userNameEmail"
                      placeholder="用户名或邮箱"
                    >
                      <i slot="prepend" class="fa fa-user-circle-o"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      type="password"
                      v-model="formLogin.password"
                      placeholder="密码"
                    >
                      <i slot="prepend" class="fa fa-keyboard-o"></i>
                      <el-button type="text"></el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      type="text"
                      v-model="formLogin.code"
                      placeholder="请输入验证码"
                    >
                      <!-- <template slot="prepend">验证码</template> -->
                      <template slot="append">
                        <div class="login-code" @click="refreshCode">
                          <Identify :identifyCode="identifyCode"></Identify>
                        </div>
                      </template>
                    </el-input>
                  </el-form-item>

                  <el-button
                    size="default"
                    :loading="loginLoad"
                    @click="submitLogin"
                    type="primary"
                    class="button-login"
                  >
                    登录
                  </el-button>
                </el-form>
              </el-card>
              <p class="page-login--options" flex="main:justify cross:center">
                <span @click="forgetPwdClick"
                  ><d2-icon name="question-circle" /> 忘记密码</span
                >
                <span @click="registerClick">注册用户</span>
              </p>
            </div>
          </div>
          <div class="page-login--content-footer">
            <p class="page-login--content-footer-locales">
              <a
                v-for="language in $languages"
                :key="language.value"
                @click="onChangeLocale(language.value)"
              >
                {{ language.label }}
              </a>
            </p>
            <p class="page-login--content-footer-copyright">
              Copyright
              <d2-icon name="copyright" />
              2020 南阳理工学院18级软设三班孟家恒出品
              <a href="https://github.com/FairyEver"> @mjh </a>
            </p>
            <p class="page-login--content-footer-options">
              <a href="#">帮助</a>
              <a href="#">隐私</a>
              <a href="#">条款</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 注册表单 -->
    <div
      style="position: absolute; z-index: 100; margin-left: 38%; margin-top: 60px"
      v-if="isShow"
    >
      <div class="page-register--form">
        <form>
          <h3 class="register-form-style">输入注册信息</h3>
          <el-input
            type="text"
            prefix-icon="el-icon-user"
            v-model="formRegister.username"
            placeholder="用户名"
          ></el-input>
          <br />
          <br />
          <el-input
            type="text"
            prefix-icon="el-icon-edit"
            v-model="formRegister.nickname"
            placeholder="昵称"
          ></el-input>
          <br />
          <br />
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="formRegister.password"
            placeholder="密码"
          ></el-input>
          <br />
          <br />
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="formRegister.password1"
            placeholder="请确认密码"
          ></el-input>
          <br />
          <br />
          <!-- <el-input
            type="number"
            v-model="formRegister.userphone"
            placeholder="手机号"
          ></el-input> -->
          <el-input
            type="text"
            prefix-icon="el-icon-message"
            v-model="formRegister.useremail"
            placeholder="邮箱"
          ></el-input>
          <br />
          <br />
          <el-input
            type="text"
            style="width: 60%"
            prefix-icon="el-icon-key"
            v-model="formRegister.emailcode"
            placeholder="邮箱验证码"
          ></el-input>
          <el-button
            style="width: 40%"
            type="text"
            :disabled="canClick"
            :loading="emailCodeLoad"
            @click="sendEmailCode(formRegister.useremail)"
            >{{ content }}</el-button
          >
          <br />
          <br />
          <div>
            <el-button
              type="submit"
              class="button-login-create-back"
              @click="submitRegisterForm"
            >
              <span style="color: white">注册</span>
            </el-button>
          </div>
          <div>
            <el-button class="button-login-create-back" @click="back">
              <span style="color: white">返回</span>
            </el-button>
          </div>
        </form>
      </div>
    </div>
    <!-- 忘记密码表单 -->
    <div
      style="position: absolute; z-index: 100; margin-left: 38%; margin-top: 8%"
      v-if="isForgetShow"
    >
      <div class="page-forget--form">
        <form>
          <h3 class="forget-form-style">忘记密码</h3>
          <el-input
            type="text"
            prefix-icon="el-icon-message"
            v-model="formForgetPwd.useremail"
            placeholder="请输入注册邮箱"
          ></el-input>
          <br />
          <br />
          <el-input
            type="text"
            style="width: 60%"
            prefix-icon="el-icon-key"
            v-model="formForgetPwd.emailcode"
            placeholder="邮箱验证码"
          ></el-input>
          <el-button
            style="width: 40%"
            type="text"
            :disabled="canClick"
            :loading="emailCodeLoad"
            @click="sendEmailCode(formForgetPwd.useremail)"
            >{{ content }}</el-button
          >
          <br />
          <br />
          <div>
            <el-button
              type="submit"
              class="button-login-create-back"
              @click="checkEmailCode"
            >
              <span style="color: white">验证</span>
            </el-button>
          </div>
          <div>
            <el-button class="button-login-create-back" @click="back">
              <span style="color: white">返回</span>
            </el-button>
          </div>
        </form>
      </div>
    </div>
    <!-- 修改新密码 -->
    <el-dialog
      title="忘记密码"
      :before-close="handleClose"
      :show-close="false"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <el-input
        type="password"
        placeholder="新密码"
        align="center"
        v-model="formForgetPwd.password"
        style="width: 60%; margin-left: 20%"
      ></el-input>
      <br />
      <br />
      <el-input
        type="password"
        placeholder="再次输入密码"
        align="center"
        v-model="formForgetPwd.password1"
        style="width: 60%; margin-left: 20%"
      ></el-input>
      <br />
      <br />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForgetPwdWin">取 消</el-button>
        <el-button type="primary" @click="amendPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Axios from "axios";
import { mapActions } from "vuex";
import localeMixin from "@/locales/mixin.js";
var port = require("../../../apiconf");
import Identify from "./identify";
// import CryptoJS from "crypto-js";
import { Encrypt, Decrypt } from "../../../aes";
import md5 from "crypto-js/md5";

export default {
  mixins: [localeMixin],
  components: { Identify },
  data() {
    return {
      //打开忘记密码窗口
      dialogFormVisible: false,

      clock: "",
      //打开注册弹窗使用
      isTrue: true,
      isShow: false,
      //打开忘记密码弹窗使用
      isForgetShow: false,

      timeInterval: null,
      time: dayjs().format("HH:mm:ss"),
      // 登录表单
      formLogin: {
        userNameEmail: "",
        password: "",
        code: "",
      },
      formForgetPwd: {
        useremail: "",
        emailcode: "",
        password: "",
        password1: "",
      },
      //发送邮箱验证码使用
      content: "发送验证码", // 按钮里显示的内容
      totalTime: 60, //记录具体倒计时时间
      canClick: false, //添加canClick
      emailCodeLoad: false, //发送邮箱验证码按钮加载
      loginLoad: false, //登录按钮加载

      //注册表单
      formRegister: {
        nickname: "",
        username: "",
        password: "",
        password1: "",
        useremail: "",
        emailcode: "",
      },
      //登录验证码用
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz",
      identifyCode: "",
      // 表单校验
      rules: {
        userNameEmail: [
          {
            required: true,
            message: "请输入用户名或邮箱",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.withoutCodeLogin();
    // 初始化验证码
    this.initCode();
  },
  // created() {
  //   this.refreshCode();
  // },
  beforeDestroy() {
    clearInterval(this.timeInterval);
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    refreshTime() {
      this.time = dayjs().format("HH:mm:ss");
    },
    handleClose() {
      // this.dialogFormVisible=false
    },
    //免密登录
    withoutCodeLogin() {
      let usernameemail = localStorage.getItem(md5("usernameemail"));
      if (usernameemail != "" && usernameemail != null) {
        this.login({
          username: "admin",
          password: "admin",
        });
        this.$router.replace(this.$route.query.redirect || "/");
      }
    },
    //验证码
    // 重置验证码
    initCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      this.timeInterval = setInterval(() => {
        this.refreshTime();
      }, 1000);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 进入注册页面
    registerClick() {
      this.isShow = true;
      this.isTrue = false;
    },
    // 进入忘记密码页面
    forgetPwdClick() {
      this.isForgetShow = true;
      this.isTrue = false;
    },
    // 取消创建并返回
    back() {
      this.isShow = false;
      this.isTrue = true;
      this.isForgetShow = false;
    },
    //初始化短信
    initClock() {
      this.content = "发送验证码";
      this.totalTime = 60;
      window.clearInterval(this.clock);
      this.canClick = false;
    },
    //打开忘记密码弹窗
    openForgetPwdWin() {
      this.dialogFormVisible = true;
    },
    //关闭忘记密码弹窗
    cancelForgetPwdWin() {
      this.$confirm("确认要取消修改密码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dialogFormVisible = false;
          this.formForgetPwd.useremail = "";
          this.formForgetPwd.emailcode = "";
          this.formForgetPwd.password = "";
          this.formForgetPwd.password1 = "";
          this.initClock();
        })

        .catch(() => {});
    },
    // 提交登录信息
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.formLogin.code.toLowerCase() != this.identifyCode) {
            this.$message({
              message: "验证码错误",
              type: "warning",
            });
            this.refreshCode();
            return false;
          }
          this.login({
            username: "admin",
            password: "admin",
          });
          this.loginLoad = true;
          let time = Date.parse(new Date());
          let api = port.login + "?time=" + time;
          Axios.post(
            api,
            Encrypt(
              JSON.stringify({
                usernameemail: this.formLogin.userNameEmail,
                password: this.formLogin.password,
              }),
              time.toString()
            ),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            }
          )
            .then((res) => {
              this.loginLoad = false;
              let resData = Decrypt(res.data, time.toString());
              // 成功，返回数据
              if (resData.statuscode == 200) {
                localStorage.setItem(md5("nickname"), resData.nickname);
                localStorage.setItem(md5("usernameemail"), this.formLogin.userNameEmail);
                this.$router.replace(this.$route.query.redirect || "/");

                this.$message({
                  message: "登陆成功",
                  type: "success",
                });
              } else if (resData.statuscode == 212) {
                this.$message({
                  message: "密码错误",
                  type: "warning",
                });
                this.refreshCode();
              } else {
                this.$message({
                  message: "登录失败，请稍后再试",
                  type: "warning",
                });
                this.refreshCode();
              }
            })
            .catch((err) => {
              this.loginLoad = false;
              // 失败
              this.$message({
                message: "网络异常，请稍后再试",
                type: "warning",
              });
              console.log("神马错误呀", err);
            });
        } else {
          this.$message({
            message: "请把数据填写完成",
            type: "warning",
          });
        }
      });
    },
    //修改密码
    amendPwd() {
      this.$confirm("确认要修改密码吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          if (this.formForgetPwd.password == "" || this.formForgetPwd.password1 == "") {
            this.$message({
              message: "请填写完整",
              type: "warning",
            });
            return false;
          } else if (this.formForgetPwd.password != this.formForgetPwd.password1) {
            this.$message({
              message: "两次输入的密码不一样",
              type: "warning",
            });
            return false;
          }
          let time = Date.parse(new Date());
          let api = port.amendpwd + "?time=" + time;
          Axios.post(
            api,
            Encrypt(
              JSON.stringify({
                useremail: this.formForgetPwd.useremail,
                password: this.formForgetPwd.password,
              }),
              time.toString()
            ),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
            }
          )
            .then((res) => {
              let resData = Decrypt(res.data, time.toString());
              // 成功，返回数据
              if (resData.statuscode == 200) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.dialogFormVisible = false;
                this.formForgetPwd.useremail = "";
                this.formForgetPwd.emailcode = "";
                this.formForgetPwd.password = "";
                this.formForgetPwd.password1 = "";
              } else {
                this.$message({
                  message: "修改失败，请稍后再试",
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              // 失败
              this.$message({
                message: "网络异常，请稍后再试",
                type: "warning",
              });
            });
        })

        .catch(() => {});
    },
    //提交注册表单
    submitRegisterForm() {
      //判断用户名格式
      var s = this.formRegister.username.substring(0, 1);
      var reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(this.formRegister.username) || ("0" <= s && s <= "9")) {
        this.$message({
          message: "注册失败，用户名只能是英文开头加数字",
          type: "warning",
        });
        this.formRegister.username = "";
        return false;
      }

      //判断注册信息是否完整
      if (
        this.formRegister.nickname == "" ||
        this.formRegister.username == "" ||
        this.formRegister.password == "" ||
        this.formRegister.useremail == "" ||
        this.formRegister.emailcode == ""
      ) {
        this.$message({
          message: "请把注册信息填写完整",
          type: "warning",
        });
        return false;
      } else if (this.formRegister.password != this.formRegister.password1) {
        //判断两次密码是否正确
        this.$message({
          message: "注册失败，输入的两次密码不一致",
          type: "warning",
        });
        this.formRegister.password = "";
        this.formRegister.password1 = "";
        return false;
      }

      let time = Date.parse(new Date());
      var api = port.register + "?time=" + time;
      Axios.post(
        api,
        Encrypt(
          JSON.stringify({
            username: this.formRegister.username,
            nickname: this.formRegister.nickname,
            password: this.formRegister.password,
            useremail: this.formRegister.useremail,
            emailcode: this.formRegister.emailcode,
          }),
          time.toString()
        ),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )

        .then((res) => {
          let resData = Decrypt(res.data, time.toString());
          // 成功，返回数据
          if (resData.statuscode == 200) {
            this.$message({
              message: "注册成功",
              type: "success",
            });
            this.formLogin.userNameEmail = this.formRegister.username;
            this.formLogin.password = this.formRegister.password;
            this.formRegister.username = "";
            this.formRegister.nickname = "";
            this.formRegister.password = "";
            this.formRegister.password1 = "";
            this.formRegister.useremail = "";
            this.formRegister.emailcode = "";
            // 返回登录页面
            this.isShow = !this.isShow;
            this.isTrue = !this.isTrue;
            return false;
          } else if (resData.statuscode == 210) {
            this.$message({
              message: "邮箱验证码错误",
              type: "warning",
            });
            return false;
          } else if (resData.statuscode == 211) {
            this.$message({
              message: "用户名已存在",
              type: "warning",
            });
            return false;
          } else if (resData.statuscode == 212) {
            this.$message({
              message: "邮箱已存在",
              type: "warning",
            });
            return false;
          } else {
            this.$message({
              message: "注册失败，请稍后再试",
              type: "warning",
            });
            this.formRegister.nickname = "";
            this.formRegister.username = "";
            this.formRegister.password = "";
            this.formRegister.password1 = "";
            this.formRegister.userphone = "";
            this.formRegister.useremail = "";
            this.formRegister.emailcode = "";
            return false;
          }
          Object.assign(this.$data.formRegister, this.$options.data().formRegister);
        })
        .catch((err) => {
          // 失败
          this.$message({
            message: "网络异常，请稍后再试",
            type: "warning",
          });
        });
    },
    //获得邮箱验证码
    sendEmailCode(userEmail) {
      if (userEmail == "") {
        this.$message({
          message: "请先填写邮箱",
          type: "warning",
        });
        return false;
      }
      this.emailCodeLoad = true;
      let time = Date.parse(new Date());

      let api = port.sendemailcode + "?time=" + time;
      Axios.post(
        api,
        Encrypt(
          JSON.stringify({
            useremail: userEmail,
          }),
          time.toString()
        ),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          this.emailCodeLoad = false;
          let resData = Decrypt(res.data, time.toString());
          // 成功，返回数据
          if (resData.statuscode == 200) {
            this.content = this.totalTime + "s后重新发送"; //这里解决60秒不见了的问题
            this.canClick = true;
            // let clock = window.setInterval(() => {
            this.clock = window.setInterval(() => {
              this.totalTime--;
              this.content = this.totalTime + "s后重新发送";
              if (this.totalTime < 0) {
                //当倒计时小于0时清除定时器
                this.initClock();
              }
            }, 1000);

            this.$message({
              message: "验证码已发送",
              type: "success",
            });
          } else if (resData.statuscode == 210) {
            this.$message({
              message: "邮箱格式错误或邮箱不存在",
              type: "warning",
            });
          } else {
            this.$message({
              message: "发送失败，请稍后再试",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          this.emailCodeLoad = false;
          this.content = "重新发送验证码";
          // 失败
          this.$message({
            message: "网络异常，请稍后再试",
            type: "warning",
          });
        });
    },
    //验证邮箱验证码
    checkEmailCode() {
      if (this.formForgetPwd.useremail == "" || this.formForgetPwd.emailcode == "") {
        this.$message({
          message: "请填写完整数据",
          type: "warning",
        });
        return false;
      }
      let time = Date.parse(new Date());

      let api = port.checkemailcode + "?time=" + time;
      Axios.post(
        api,
        Encrypt(
          JSON.stringify({
            useremail: this.formForgetPwd.useremail,
            emailcode: this.formForgetPwd.emailcode,
          }),
          time.toString()
        ),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          let resData = Decrypt(res.data, time.toString());
          // 成功，返回数据
          if (resData.statuscode == 200) {
            //  this.$message({
            //   message: "验证成功",
            //   type: "success",
            // });
            this.isTrue = true;
            this.isForgetShow = false;
            this.openForgetPwdWin();
          } else if (resData.statuscode == 210) {
            this.$message({
              message: "邮箱验证码错误",
              type: "warning",
            });
            return false;
          } else {
            this.$message({
              message: "验证失败，请稍后再试",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          // 失败
          this.$message({
            message: "网络异常，请稍后再试",
            type: "warning",
          });
        });
    },
  },
};
</script>

<style lang="scss">
.login-code {
  cursor: pointer;
}
//爱心
#login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
//不知名特效
canvas {
  background: rgb(226, 225, 225);
  opacity: 0.3;
}
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  .register-form-style {
    font-size: 30px;
    margin-left: 18%;
  }
  .forget-form-style {
    font-size: 30px;
    margin-left: 25%;
  }
  // 时间
  .page-login--layer-time {
    font-size: 22em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // 注册页面表单
  .page-register--form {
    width: 300px;
    margin-left: 28%;
    .button-login-create-back {
      background-color: #409eff;
      width: 100%;
    }
  }
  // 忘记密码页面表单
  .page-forget--form {
    width: 300px;
    margin-left: 28%;
    .button-login-create-back {
      background-color: #409eff;
      width: 100%;
    }
  }
  .page-saoma {
    width: 280px;
    .button-login-create-back {
      background-color: #409eff;
      width: 100%;
    }
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 15px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 300px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
