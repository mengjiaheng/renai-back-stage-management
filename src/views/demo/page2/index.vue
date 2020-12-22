<!--
 * @Author: your name
 * @Date: 2020-12-15 16:27:11
 * @LastEditTime: 2020-12-22 21:07:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \renai-back-stage-management\src\views\demo\page2\index.vue
-->
<template>
  <d2-container>
    <template slot="header">Header</template>
    <VueMarkdown :source="zhh"></VueMarkdown>
    <template slot="footer">Footer</template>
  </d2-container>
</template>

<script>
import VueMarkdown from "vue-markdown";
import zhh from "../page1/zhh.md";

export default {
  components: {
    VueMarkdown, // 注入组件
  },
  data() {
    return {
      zhh,
    };
  },
};
</script>
