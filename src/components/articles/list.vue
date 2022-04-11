<template>
  <ul class="article-container">
    <article-item v-for="(item, idx) in articles" :key="item.name" :article-data="item" @click="changeRouteHandler" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import ArticleItem from './item.vue'

export default defineComponent({
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    articles: { type: Array as PropType<any[]>, default: () => [] }
  },
  setup() {
    const route = useRouter()

    const changeRouteHandler = (e) => {
      route.push({ name: e.name })
    }
    return { changeRouteHandler }
  }
})
</script>

<style lang="less" scoped>
.article-container {
  padding: 0;
  margin: 0;
}
</style>
