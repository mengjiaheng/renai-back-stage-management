<!--
 * @Author: your name
 * @Date: 2020-12-15 16:27:11
 * @LastEditTime: 2020-12-22 21:09:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \renai-back-stage-management\src\views\demo\page3\index.vue
-->
<template>
  <div>
    <d2-container>
    <!-- <template slot="header">
      <el-button type="primary" plain>主要按钮</el-button>
    </template> -->
    <mavon-editor
      v-model="content"
      scrollStyle
      :ishljs = "true"
      ref="md"
      placeholder=" "
      @save="ctrls"
      @change="change"
      @imgAdd="$imgAdd"
      style="height: 100%"
    />
    <template slot="footer">Footer</template>
  </d2-container>
  <!-- <el-container style="height: 500px; border: 1px solid #eee">
  <el-header>Header</el-header>
  <el-main><mavon-editor
      v-model="content"
      scrollStyle
      :ishljs = "true"
      ref="md"
      placeholder=" "
      @save="ctrls"
      @change="change"
      @imgAdd="$imgAdd"
      style="height: 100%"
    /></el-main>
  <el-footer>Footer</el-footer>
</el-container> -->
  </div>
</template>
<script type="text/ecmascript-6">
// 导入组件 及 组件样式
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import content from "../page1/doc.md";

export default {
  components: {
    mavonEditor, //mavon-editor组件
  },
  data() {
    return {
      content, // 输入的markdown
      html: "", // 转成的html
    };
  },
  methods: {
    ctrls(){
      console.log("测试保存功能")
    },
    change(value, render) {
      //实时获取转成html的数据
      this.html = render;
      // console.log(this.html);
    }, 
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("image", $file);
      this.$ajax({
        url: "http://local.basic.com/index.php?r=markdown/upload",
        method: "post",
        data: formdata,
      })
      .then((data) => {
        //将返回的url替换到文本原位置
        if (data.data.success == 1) {
          this.$refs.md.$img2Url(pos, data.data.url);
          // console.log(data.data.url);
        }
      });
    },
  },
};
</script>
