<!--
 * @Author: your name
 * @Date: 2020-12-15 16:27:11
 * @LastEditTime: 2020-12-15 20:55:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \renai-back-stage-management\src\views\system\index\components\d2-page-cover\index.vue
-->
<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__logo">
      <slot/>
    </div>
    <!-- <p class="d2-page-cover__title">D2 Admin {{$version}}</p> -->
    <p class="d2-page-cover__sub-title">仁爱社团后台管理系统</p>
    <p class="d2-page-cover__build-time">Final Build Time {{$buildTime}}</p>
    <p class="d2-page-cover__build-time">技术支持：仁爱社团成员</p>
    <slot name="footer"/>

  </div>
</template>

<style lang="scss" scoped>
.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  // .d2-page-cover__title {
  //   margin: 0px;
  //   margin-bottom: 20px;
  //   font-weight: bold;
  //   color: $color-text-main;
  // }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 30px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
</style>
