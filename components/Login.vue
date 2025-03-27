<template>
  <div ref="container">
    <iframe ref="iframe" class="w-full block" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import StorageManager from './js/storage';

export default {
  name: 'Dialog',
  data() {
    return {
      url: ''
    }
  },
  methods: {
    handleResize() {
      this.$refs.container.style.height = `${window.innerHeight}px`;
    },
    handleMessage(event) {
      let origin = 'https://keepwork.com';
      if (isDev()) {
       origin = 'https://keepwork-dev.kp-para.cn';
      }

      if (event.origin !== origin) return;
      const data = event.data || {};
      if (data.type == 'login') {
        const content = data.content || {};
        StorageManager.set('userSessionData', content);
        window.close();
      } else if (data.type == 'logout') {
        StorageManager.remove('userSessionData');
      }
    },
    postMessage(message) {
      const iframe = this.$refs.iframe;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(message, 'https://keepwork.com');
      }
    }
  },
  mounted() {
    if (isDev()) {
      this.url = "https://keepwork-dev.kp-para.cn/login";
    } else {
      this.url = "https://keepwork.com/login";
    }

    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('message', this.handleMessage);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('message', this.handleMessage);
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
}
</style>