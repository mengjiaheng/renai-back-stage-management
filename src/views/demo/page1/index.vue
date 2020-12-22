<template>
  <d2-container>
    <template slot="header">Header</template>
    <VueMarkdown :source="doc"></VueMarkdown>
    <template slot="footer">Footer</template>
  </d2-container>
</template>

<script>
import VueMarkdown from "vue-markdown";
import doc from "../page1/doc.md";

export default {
  components: {
    VueMarkdown, // 注入组件
  },
  data() {
    return {
      doc,
    };
  },
};
</script>
