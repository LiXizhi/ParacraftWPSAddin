<template>
  <div class="code-block">
    <div class="global" style="display: flex;flex-wrap: wrap;">
      <div style="flex: 1 1 100%;">
        <div class="divItem">
          模组存储路径：
          <input type="text"
                 placeholder="用户名"
                 v-model="username"
                 title="用户名为可计算文档注册用户的名字。如果没有请到keepwork.com注册"/>
          /
          <input type="text"
                 placeholder="章节名"
                 v-model="sectionName"
                 title="文档中所有内容共用同一个计算环境，但是通过章节名分成了不同的页面" />
        </div>
      </div>
      <div v-if="mod === 'ModCodeBlock'" style="flex: 1 1 50%;">
        <div class="divItem">
          请选择语言：
        </div>
        <div class="divItem" style="display: flex;justify-content: space-between">
          <div>
            <input type="radio" name="lang" id="lang-python" v-model="selectedLanguage" value="python_wasm" checked />
            <label class="lang-label" for="lang-python">python</label>
          </div>
          <div>
            <input type="radio" name="lang" id="lang-python_npl" v-model="selectedLanguage" value="python" />
            <label class="lang-label" for="lang-python_npl">python(NPL)</label>
          </div>
          <div>
            <input type="radio" name="lang" id="lang-npl" v-model="selectedLanguage" value="npl" />
            <label class="lang-label" for="lang-npl">npl</label>
          </div>
          <div>
            <input type="radio" name="lang" id="lang-codeblock" v-model="selectedLanguage" value="codeblock" />
            <label class="lang-label" for="lang-codeblock">codeblock(3D)</label>
          </div>
          <div>
            <input type="radio" name="lang" id="lang-cpp" v-model="selectedLanguage" value="clang" />
            <label class="lang-label" for="lang-cpp">C/C++</label>
          </div>
        </div>
      </div>
      <div v-if="mod === 'ModProject'" style="flex: 1 1 50%">
        <div class="divItem">
          请输入Project ID：<input type="text" v-model="pid" />
        </div>
      </div>
      <div v-if="mod === 'ModAI'" style="flex: 1 1 50%;display: flex;align-content: space-between">
        <div style="flex: 1 1 50%;text-align: center;">
          <input type="radio" name="lang" id="AI-mode-single" v-model="AIMode" value="1" />
          <label class="lang-label" for="AI-mode-single">单次</label>
        </div>
        <div style="flex: 1 1 50%;text-align: center;">
          <input type="radio" name="lang" id="AI-mode-multiple" v-model="AIMode" value="0" />
          <label class="lang-label" for="AI-mode-multiple">多次</label>
        </div>
      </div>
      <div class="divItem" style="flex: 1 1 100%;text-align: right;">
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
      sectionName: Util.getCurrentFormattedTime(),
      mod: '',
      selectedLanguage: 'python_wasm',
      pid: '',
      AIMode: 1,
    }
  },
  mounted() {
    this.username = Util.GetKeepworkUsername() || ''
    const urlParams = new URLSearchParams(window.location.search)
    this.mod = urlParams.get('mod')

    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    handleKeyUp(e) {
      if (e.key === 'Enter') {
        this.onClickCreateWebview()
      }
    },
    onClickCreateWebview() {
      if (this.mod === 'ModProject' && !!isNaN(this.pid)) {
        alert("请输入正确的Project ID")
        return
      }
      if (this.username == "") {
        alert("请输入用户名")
        return
      }
      if (this.sectionName == "") {
        alert("请输入章节名")
        return
      }

      dlgFunc.updateWebviews(this.username)
      dlgFunc.removeCurrentPageWebview()

      let url = dlgFunc.getModUrl(this.username, this.sectionName, this.mod)

      if (this.mod === 'ModCodeBlock') {
        let urlObj = new URL(url)
        let modParams = { language: this.selectedLanguage }
        modParams = JSON.stringify(modParams)
        urlObj.searchParams.append("modParams", modParams)
        url = urlObj.toString()
      }

      if (this.mod === 'ModProject') {
        let urlObj = new URL(url)
        let modParams = { projectId: this.pid }
        modParams = JSON.stringify(modParams)
        urlObj.searchParams.append("modParams", modParams)
        url = urlObj.toString()
      }

      if (this.mod == 'ModAI') {
        let urlObj = new URL(url)
        let modParams = { styleID: this.AIMode }
        modParams = JSON.stringify(modParams)
        urlObj.searchParams.append("modParams", modParams)
        url = urlObj.toString()
      }

      dlgFunc.onClickCreateWebview(url)
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

.lang-label {
  margin-left: 5px;
  position: relative;
  top: -4px;
}
</style>