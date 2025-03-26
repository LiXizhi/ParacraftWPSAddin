<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="p-4 bg-white rounded-lg shadow-md relative overflow-visible">
      <div class="space-y-4">
        <div class="text-gray-700">
          输入以<span class="font-bold">https://</span>开头的网址：
        </div>
        <div class="pr-2">
          <input
            type="text"
            v-model="url"
            class="w-full h-8 px-2 border rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="https://webparacraft.keepwork.com/?pid="
            title="使用keepwork.com创建网页获得最佳体验"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end pr-2 absolute right-0 z-10 mt-8">
      <button
        @click="onClickCreateWebview"
        class="bg-black px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
      >
        创建
      </button>
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
