<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md px-6 py-4">
        <div class="flex items-center justify-between">
            <!-- 左侧标题改为"存储路径:" -->
            <div class="text-xl font-bold text-gray-800">存储路径:</div>
            
            <!-- 用户路径部分 -->
            <div class="flex items-center text-gray-600 border border-gray-300 rounded-md overflow-hidden px-3 py-2 flex-grow mx-6">
                <!-- 标签改为"用户名:" -->
                <span class="text-gray-500 mr-2">用户名:</span>
                
                <!-- 登录状态/用户名区域 -->
                <div id="login-status-area" class="mr-2 flex items-center">
                    <!-- 未登录状态 (默认显示) -->
                    <button id="login-button" class="text-blue-500 hover:text-blue-700 underline">登录</button>
                    
                    <!-- 已登录状态 (默认隐藏) -->
                    <div id="logged-in-area" class="hidden flex items-center">
                        <span id="username-display" class="text-blue-600 font-medium">当前用户</span>
                        <button id="switch-user" class="ml-2 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded px-1.5 py-0.5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            切换
                        </button>
                    </div>
                </div>
                
                <!-- 分隔符 -->
                <span class="px-2 text-gray-500">/</span>
                
                <!-- 页面名称区域 - 标签和输入框分开 -->
                <div class="flex items-center">
                    <label for="page-name" class="text-gray-500 whitespace-nowrap">页面名:</label>
                    <input id="page-name" type="text" placeholder="输入页面名称" class="outline-none border-b border-dashed border-gray-300 focus:border-blue-500 px-1 ml-1 w-32">
                </div>
            </div>
        </div>
    </nav>
    <!-- <div class="global" style="display: flex;flex-wrap: wrap;">
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
    </div> -->
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

<style>
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