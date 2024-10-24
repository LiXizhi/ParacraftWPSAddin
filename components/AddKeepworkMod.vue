<template>
  <div class="code-block">
    <div class="global" style="display: flex;flex-wrap: wrap;">
      <div style="flex: 1 1 50%;">
        <div class="divItem">
          请输入username：
        </div>
        <div class="divItem">
          <input type="text" v-model="username" />
        </div>
      </div>
      <div style="flex: 1 1 50%;">
        <div class="divItem">
        请输入section name：
        </div>
        <div class="divItem">
          <input type="text" v-model="sectionName" />
        </div>
      </div>
      <div class="divItem" style="flex: 1 1 50%;">
        <button @click="onClickCreateWebview">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import dlgFunc from './js/dialog'
import Util from './js/util'

export default {
  name: 'AddKeepworkMod',
  data() {
    return {
      username: '',
      sectionName: '',
      mod: ''
    }
  },
  mounted() {
    this.username = Util.GetKeepworkUsername() || ''
    const urlParams = new URLSearchParams(window.location.search)
    this.mod = urlParams.get('mod')

    Util.checkDocumentSaved()
  },
  methods: {
    onClickCreateWebview() {
      dlgFunc.updateWebviews(this.username)
      dlgFunc.removeCurrentPageWebview()
      dlgFunc.onClickCreateWebview(dlgFunc.getModUrl(this.username, this.sectionName, this.mod))
    }
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