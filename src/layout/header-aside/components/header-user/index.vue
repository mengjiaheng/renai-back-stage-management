<!--
 * @Author: your name
 * @Date: 2020-12-15 16:27:10
 * @LastEditTime: 2020-12-18 18:19:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \renai-back-stage-management\src\layout\header-aside\components\header-user\index.vue
-->
<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{`${this.AdminEmail}`}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        退出
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import md5 from 'crypto-js/md5';

export default {
  data(){
    return{
      AdminEmail:""
    }
  },
  mounted() {
    this.AdminEmail=sessionStorage.getItem(md5("adminEmail"))
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>
