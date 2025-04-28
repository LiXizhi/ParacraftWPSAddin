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
                      v-if="!isLoggedIn"
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
                    <div v-if="isLoggedIn" id="logged-in-area" class="flex items-center">
                        <span id="username-display" class="text-blue-600 font-medium">{{ username }}</span>
                        <button id="switch-user"
                                @click="Login"
                                class="ml-2 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded px-1.5 py-0.5 flex items-center">
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
                <input id="page-name"
                       type="text"
                       placeholder="输入页面名称"
                       v-model="sectionName"
                       class="outline-none border-b border-dashed border-gray-300 focus:border-blue-500 px-1 ml-1 flex-grow bg-transparent">
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
            <label class="text-gray-500 text-base whitespace-nowrap">Project ID：</label>
            <input type="text" v-model="pid" class="text-gray-600 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div class="text-gray-500 text-sm mt-1">输入Paracraft项目ID（留空将自动新建项目）</div>
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
    <!-- 对话框 -->
    <div v-if="isDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">提示</h3>
          <button @click="isDialogOpen = false" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
import dlgFunc from './js/dialog';
import Util from './js/util';
import StorageManager from './js/storage';

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
      timer: null,
      isDialogOpen: false,
      message: '',
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.username; 
    },
    token() {
      const userSessionData = StorageManager.get('userSessionData');
      return userSessionData?.token || '';
    }
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.mod = urlParams.get('mod');

    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('focus', this.handleFocus);
    const userSessionData = StorageManager.get('userSessionData');

    if (userSessionData) {
      this.username = userSessionData.username;
      
      // Check token expiration
      let profileApi = 'https://api.keepwork.com/core/v0/users/profile'
      if (isDev()) {
        profileApi = 'https://api-dev.kp-para.cn/core/v0/users/profile' 
      }
      
      fetch(profileApi, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          // Token is invalid, clear session data
          StorageManager.remove('userSessionData');
          this.username = '';
        }
      })
      .catch(() => {
        // Network error or invalid token, clear session data
        StorageManager.remove('userSessionData');
        this.username = '';
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    window.removeEventListener('focus', this.handleFocus);
  },
  methods: {
    handleFocus() {
      this.isLoading = false;
      clearInterval(this.timer);
    },
    showDialog(msg) {
      this.message = msg;
      this.isDialogOpen = true;
    },
    Login() {
      this.isLoading = true

      wps.ShowDialog(
        Util.GetUrlPath() + "/login",
        "登录Keepwork",
        400,
        660,
        true
      );

      this.timer = setInterval(() => {
        const userSessionData = StorageManager.get('userSessionData', true);
        const _username = userSessionData?.username || '';

        if (this.username != _username) {
          this.username = userSessionData?.username || '';
          this.isLoading = false;

          if (this.username) {
           clearInterval(this.timer);
           this.timer = null;
          }
        }
      }, 500);
    },
    handleKeyUp(e) {
      if (e.key === 'Enter') {
        this.onClickCreateWebview()
      }
    },
    onClickCreateWebview() {
      if (this.mod === 'ModProject' && !!isNaN(this.pid)) {
        this.showDialog("请输入正确的Project ID");
        return;
      }

      if (this.username == "") {
        this.showDialog("请先登录");
        return;
      }
      if (this.sectionName == "") {
        this.showDialog("请输入章节名");
        return;
      }

      // dlgFunc.updateWebviews(this.username);
      // dlgFunc.removeCurrentPageWebview();

      let mod = this.mod;
      if (this.mod === 'ModAgent') {
        mod = null;
      }

      let url = dlgFunc.getModUrl(this.username, this.sectionName, mod);
      let urlObj = new URL(url);

      if (this.mod === 'ModCodeBlock') {
        let modParams = { language: this.selectedLanguage };
        modParams = JSON.stringify(modParams);
        urlObj.searchParams.append("modParams", modParams);
      }else if (this.mod === 'ModProject') {
        let modParams = { projectId: this.pid };
        modParams = JSON.stringify(modParams);
        urlObj.searchParams.append("modParams", modParams);
      }else if (this.mod === 'ModAI') {
        let modParams = { styleID: this.AIMode };
        modParams = JSON.stringify(modParams);
        urlObj.searchParams.append("modParams", modParams);
      }

      url = urlObj.toString();
      dlgFunc.onClickCreateWebview(url);
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
