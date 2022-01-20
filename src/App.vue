<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import Layout from './components/layout/index.vue'
import Articles from './components/articles/index.vue'

export default {
  components: {
    Layout,
    Articles,
  },
}
</script>
