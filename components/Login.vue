<template>
  <div ref="container">
    <iframe ref="iframe" class="w-full block" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
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
      // if (event.origin !== 'https://keepwork.com') return;
      const data = event.data;
      this.$emit('message', data);
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
    // window.addEventListener('message', this.handleMessage);
    console.log(111111)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    // window.removeEventListener('message', this.handleMessage);
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
}
</style>