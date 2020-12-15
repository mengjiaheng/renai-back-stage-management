/*
 * @Author: your name
 * @Date: 2020-12-07 20:57:15
 * @LastEditTime: 2020-12-11 15:32:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \d2-admin-start-kit\src\apiconf.js
 */

let url = "http://127.0.0.1:9001/"

//注册模块
let register = url + "register"   //用户注册
let login = url + "login"   //用户登录
let sendemailcode = url + "sendemailcode"  //获得邮箱验证码
let checkemailcode = url + "checkemailcode"  //验证邮箱验证码
let amendpwd = url + "amendpwd"  //修改密码

export {
    register,
    login,
    sendemailcode,
    checkemailcode,
    amendpwd
}