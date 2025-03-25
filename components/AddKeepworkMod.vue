<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-md px-6 py-4">
        <div class="flex items-center justify-between">
            <!-- 左侧标题改为"存储路径:" -->
            <div class="text-base text-gray-800">存储路径:</div>
            <!-- 用户路径部分 -->
            <div class="flex items-center text-gray-600 border border-gray-300 rounded-md overflow-hidden px-3 py-2 flex-grow mx-6 h-10">
                <!-- 标签改为"用户名:" -->
                <span class="text-gray-500 mr-2">用户名:</span>
                
                <!-- 修改登录状态区域添加 flex-grow 和 justify-end -->
                <div id="login-status-area" class="mr-2 flex items-center flex-grow justify-end">
                    <!-- 未登录状态 -->
                    <button 
                        class="bg-blue-500 text-white px-3 py-1 rounded text-sm h-8
                               hover:bg-blue-600 
                               active:bg-blue-700 
                               transition-colors 
                               duration-200
                               active:scale-95
                               transition-transform
                               disabled:opacity-75 
                               disabled:cursor-not-alloded"
                        @click="Login"
                        :disabled="isLoading"
                    >
                        <span v-if="isLoading" class="inline-flex items-center">
                            <svg class="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/>
                                <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
                            </svg>
                            登录中...
                        </span>
                        <span v-else>登录</span>
                    </button>
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
            </div>
            <!-- 分隔符 -->
            <span class="px-2 text-gray-500">/</span>
            <!-- 页面名称区域 - 标签和输入框分开 -->
            <div class="flex items-center text-gray-600 border border-gray-300 rounded-md overflow-hidden px-3 py-2 flex-grow mx-6 h-10">
                <label for="page-name" class="text-gray-500 whitespace-nowrap">页面名:</label>
                <input id="page-name" type="text" placeholder="输入页面名称" class="outline-none border-b border-dashed border-gray-300 focus:border-blue-500 px-1 ml-1 w-32 bg-transparent">
            </div>
        </div>
    </nav>
    <!-- 主内容区域 -->
    <div class="flex flex-col gap-6 p-6">
      <div v-if="mod === 'ModCodeBlock'" class="flex-1 space-y-4">
        <div class="text-gray-600 text-base">请选择语言：</div>
        <div class="flex justify-between gap-4 flex-wrap">
          <!-- 单选框部分保持原结构 -->
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
      <div v-if="mod === 'ModProject'" class="flex-1">
        <div class="space-y-2">
          <div class="flex flex-row items-center gap-x-4 max-w-xs w-full">
            <label class="text-gray-600 text-base whitespace-nowrap">Project ID：</label>
            <input type="text" v-model="pid" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
      </div>
      <div v-if="mod === 'ModAI'" class="flex-1 flex gap-4 justify-between">
        <!-- 单选框部分保持原结构 -->
      </div>
      <div class="mt-4 flex justify-end">
        <button @click="onClickCreateWebview" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          添加
        </button>
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
      isLoading: false,
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
    Login() {
      // 这里添加登录逻辑
      this.isLoading = true

      wps.ShowDialog(
        Util.GetUrlPath() + "/login",
        "登录Keepwork",
        348,
        492,
        true
      );
    },
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

.text-gray-600 {
  border-color: #d1d5db
}

.text-blue-500 {
  color: #3b82f6
}

.bg-blue-500 {
  background-color: #165DFF
}

.text-gray-500 {
  color: #86909C;
}

.border-gray-300 {
  border-color: #d1d5db;
}

</style>
