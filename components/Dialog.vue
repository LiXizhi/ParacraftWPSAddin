<template>
  <div class="dialog">
    <div class="global">
      <div class="divItem">
        输入以<span style="font-weight: bolder;">https://</span>开头的网址:
      </div>
      <div class="divItem" style="padding-right: 10px;">
        <input type="text"
               v-model="url"
               style="width: 100%;height: 30px;"
               title="使用keepwork.com创建网页获得最佳体验" />
      </div>
      <div class="divItem">
        <button style="margin:3px;" @click="onClickCreateWebview()">创建</button>
      </div>
    </div>
  </div>
</template>

<script>
import dlgFunc from './js/dialog.js'

export default {
  name: 'Dialog',
  data() {
    return {
      url: '' // such as: https://webparacraft.keepwork.com/?pid=
    }
  },
  methods: {
    onClickCreateWebview() {
      dlgFunc.onClickCreateWebview(this.url)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.global {
  font-size: 15px;
  min-height: 95%;
}

.divItem {
  margin-left: 5px;
  margin-bottom: 18px;
  font-size: 15px;
  word-wrap: break-word;
}
</style>
