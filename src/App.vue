<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from './components/layout/index.vue'

export default {
  components: {
    Layout
  }
}
</script>

<style>
:root {
  --font-sans: 'LXGW WenKai', sans-serif !important;
}
</style>
