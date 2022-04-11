<template>
  <div class="notes">
    <article-list :articles="noteList" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { notes } from '@/app/router'
import ArticleList from '../components/articles/list.vue'

export default defineComponent({
  name: 'Notes',
  components: { ArticleList },
  setup() {
    const noteList = computed(() => notes.sort((pre, next) => +new Date(next.meta.date) - +new Date(pre.meta.date)))
    return {
      noteList
    }
  }
})
</script>

<style scoped>
.notes {
  width: 100%;
}
</style>
