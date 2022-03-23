<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { traverseElementTree, SKELETON } from './utils/skeleton'
import Layout from './components/layout/index.vue'

export default defineComponent({
  components: {
    Layout
  },
  setup(props) {
    // onMounted(() => {
    //   const doms = traverseElementTree(document.querySelector('.layout__container'))
    //   const skeletonDoms = doms
    //     .filter((item) => SKELETON.includes(item.className))
    //     .map((dom) => {
    //       const { width, height } = window.getComputedStyle(dom)
    //       return {
    //         name: dom.className,
    //         type: dom.nodeName,
    //         width,
    //         height
    //       }
    //     })
    // })
  }
})
</script>
