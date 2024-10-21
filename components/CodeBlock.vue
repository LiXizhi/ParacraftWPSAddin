<template>
  <div class="code-block">
    <div class="global">
      <div class="divItem">
        请输入username：
      </div>
      <div class="divItem">
        <input type="text" v-model="username" />
      </div>
      <div class="divItem">
        请输入section name：
      </div>
      <div class="divItem">
        <input type="text" v-model="sectionName" />
      </div>
      <div class="divItem">
        <button @click="onClickCreateWebview">生成</button>
      </div>
    </div>
  </div>
</template>

<script>
import dlgFunc from './js/dialog'
import Util from './js/util'

export default {
  name: 'CodeBlock',
  data() {
    return {
      username: "",
      sectionName: ""
    }
  },
  mounted() {
    this.username = Util.GetKeepworkUsername() || "";
  },
  methods: {
    onClickCreateWebview() {
      dlgFunc.updateWebviews(this.username)
      //dlgFunc.removeCurrentPageWebview()
      //dlgFunc.onClickCreateWebview(dlgFunc.getCodeBlockUrl(this.username, this.sectionName))
    },
  }
}
</script>

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