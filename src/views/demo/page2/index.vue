<!--
 * @Author: your name
 * @Date: 2020-12-15 16:27:11
 * @LastEditTime: 2020-12-22 21:34:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \renai-back-stage-management\src\views\demo\page2\index.vue
-->
<template>
  <div>
    <d2-container>
      <!-- <d2-icon name="github" style="font-size: 100px;"/> -->
      <template slot="header">Header</template>
      <VueMarkdown :source="zhh"></VueMarkdown>
      <template slot="footer">Footer</template>
    </d2-container>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import zhh from "../page2/zhh.md";

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
