<!--
 * @Author: your name
 * @Date: 2020-12-15 16:27:10
 * @LastEditTime: 2020-12-17 21:46:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \renai-back-stage-management\src\App.vue
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'


export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
</style>
