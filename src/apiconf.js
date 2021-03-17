/*
 * @Author: your name
 * @Date: 2020-12-07 20:57:15
 * @LastEditTime: 2020-12-11 15:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \d2-admin-start-kit\src\apiconf.js
 */

let loginRegisterUrl = "http://47.94.155.154:9001/"
let userMessageUrl = "http://47.94.155.154:9002/"
let sendEmailCodeUrl = "http://127.0.0.1:9005/"

//登陆注册服务模块
let register = loginRegisterUrl + "bgr"   //用户注册
let login = loginRegisterUrl + "bgl"   //用户登录
let amendpwd = loginRegisterUrl + "bgap"  //修改密码
let readAllRegisAppFor =loginRegisterUrl+ "bgraraf" //读取全部待审核用户
let readUserNameRegisAppFor =loginRegisterUrl+ "bgrnraf" //根据用户名读取待审核用户
let readUserEmailRegisAppFor =loginRegisterUrl+ "bgreraf" //根据用户邮箱读取待审核用户
let checkRegisApplyFor =loginRegisterUrl+ "bgcraf" //审核用户注册申请
let readUserEmailAmendApplyFor =loginRegisterUrl+ "bgreaaf" //读取用户修改邮箱注册申请
let checkEmailAmendApplyFor =loginRegisterUrl+ "bgceaaf" //审核用户注册申请
let readLogoutApplyFor =loginRegisterUrl+ "bgloaf" //读取用户注销申请
let checkLogoutApplyFor =loginRegisterUrl+ "bgcloaf" //审核用户注销申请
let deleteUser =loginRegisterUrl+ "bgdfu" //删除前台用户

//用户信息管理服务
let readAllUsersMessage = userMessageUrl + "bgraum"   //读取全部成员信息
let readCompelationUsersMessage = userMessageUrl + "bgrnum"   //根据姓名读取成员信息
let readGradeUsersMessage = userMessageUrl + "bgrgum"   //根据年级读取成员信息
let readStudyDirectionUsersMessage = userMessageUrl + "bgrsdum"   //根据年级读取成员信息
let SetStudioPostAndIsShow = userMessageUrl + "bgssp"   //设置成员是否显示在前台及设置社团职位
let amendusermessage = userMessageUrl + "bgfgaum"   //修改基础信息


let sendemailcode = sendEmailCodeUrl + "sendemailcode"  //获得邮箱验证码
let checkemailcode = sendEmailCodeUrl + "checkemailcode"  //验证邮箱验证码

export {
    //登陆注册
    register,
    login,
    amendpwd,
    readAllRegisAppFor,
    readUserNameRegisAppFor,
    readUserEmailRegisAppFor,
    checkRegisApplyFor,
    readUserEmailAmendApplyFor,
    checkEmailAmendApplyFor,
    readLogoutApplyFor,
    checkLogoutApplyFor,
    deleteUser,

    //用户信息管理
    readAllUsersMessage,
    readCompelationUsersMessage,
    readGradeUsersMessage,
    readStudyDirectionUsersMessage,
    SetStudioPostAndIsShow,
    amendusermessage,
    //消息推送服务
    sendemailcode,
    checkemailcode,
}