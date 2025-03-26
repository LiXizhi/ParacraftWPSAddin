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
      url: 'https://keepwork.com/login'
    }
  },
  methods: {
    handleResize() {
      this.$refs.container.style.height = `${window.innerHeight}px`;
    },
    handleMessage(event) {
      if (event.origin !== 'https://keepwork.com') return;
      const data = event.data || {};
      if (data.type != 'login') return;
      const content = data.content || {};
      StorageManager.set('userSessionData', content);
      window.close();
    },
    postMessage(message) {
      const iframe = this.$refs.iframe;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(message, 'https://keepwork.com');
      }
    }
  },
  mounted() {
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