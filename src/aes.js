/*
 * @Author: your name
 * @Date: 2020-12-09 19:13:02
 * @LastEditTime: 2020-12-09 20:31:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \d2-admin-start-kit\src\aes.js
 */
import CryptoJS from "crypto-js";
import cookie from "vue-cookie";
import md5 from "js-md5";

//加密
export function Encrypt(word, time) {
    let keyStr = md5(time).substring(0, 16)
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: CryptoJS.enc.Utf8.parse(keyStr),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
}

//解密
export function Decrypt(word, time) {
    let keyStr = md5(time).substring(0, 16)
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypted = CryptoJS.AES.decrypt(word, key, {
        iv: CryptoJS.enc.Utf8.parse(keyStr),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

// 上面这种加解密方式有局限性，只能加密8的整数倍的数据
// 否则会报错：Malformed UTF-8 data
// 加密之后转为base64数据，解密时先还原base64，再解密
export function EncryptPK(text, key) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(CryptoJS.AES.encrypt(text, key).toString()))
}

export function DecryptPK(encText, key) {
    return CryptoJS.AES.decrypt(CryptoJS.enc.Base64.parse(encText).toString(CryptoJS.enc.Utf8), key).toString(CryptoJS.enc.Utf8)
}

// AES ECB模式解密
export function ECBDecrypt(data) {
    // key就是token的前16位
    let keyStr = cookie.get(md5("Token_login_user"))
    if (keyStr == null) {
        return
    }
    var key = CryptoJS.enc.Utf8.parse(keyStr.substring(0, 16));
    var decrypted = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
}