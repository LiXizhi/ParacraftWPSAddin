<template>
  <div ref="container">
    <iframe class="w-full block" src="https://keepwork.com" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {
      url: '' // such as: https://webparacraft.keepwork.com/?pid=
    }
  },
  methods: {
    handleResize() {
      this.$refs.container.style.height = `${window.innerHeight}px`;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
}
</style>