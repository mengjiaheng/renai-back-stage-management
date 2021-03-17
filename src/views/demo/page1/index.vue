<template>
  <div>
    <d2-container>
      <el-carousel :interval="4000" type="card" style="width: 100%" :height="screeHeight">
        <el-carousel-item v-for="item in 4" :key="item" name="测试" @change="clo(1)">
          <a href="https://element.eleme.cn/#/zh-CN/component/carousel" target="_blank">
            <el-image :src="image[item - 1]" class="image"></el-image>
          </a>
        </el-carousel-item>
      </el-carousel>
      <template slot="footer">Footer <button @click="clo(item)">dianji</button></template>
    </d2-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: [
        "https://i.postimg.cc/NFLNty8V/60554166-D31-B1651-BF056-A6-F7-FBE4485.jpg",
        "https://i.postimg.cc/cLVkFYCD/xmhyj.png",
        "https://i.postimg.cc/mgCMZ3kf/gsdx.png",
        "https://i.postimg.cc/vBwWLgVw/cnlzd.png",
      ],
      screeHeight: "",
    };
  },
  // 加载即执行
  mounted() {
    this.getScreenHeight();
    window.onresize = () => {
      this.getScreenHeight();
    };
  },
  methods: {
    getScreenHeight() {
      let screenheight = String(document.body.clientWidth / 2 - 270) + "px";
      this.screeHeight = screenheight;
    },
    clo(item) {
      console.log(this.screeHeight,item);
    },
  },
};
</script>

<style>
.image {
  width: 100%;
  height: 100%;
  display: block;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
