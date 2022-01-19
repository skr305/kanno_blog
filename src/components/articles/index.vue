<template>
  <section class="article">
    <h2>Recent</h2>
    <fe-grid-group class="article-content" :gap="2" :col="1" :count="mockData">
      <template #grid="item">
        <div class="article-item">{{ item }}</div>
      </template>
    </fe-grid-group>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BlogArticle",
  setup() {
    const mockData = [
      "This is My Blog Built on Nuxt and Fect",
      "Next ux framework - Behavior is above everything",
    ];
    return { mockData };
  },
});
</script>

<style scoped>
.article h2 {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  margin: 0;
  color: var(--accents-6);
  padding: 2 var(--fect-gap-quarter) 0 0;
  border-bottom: 2px solid var(--accents-5);
}

.article .article-content {
  margin-top: var(--fect-gap);
}

.article .article-item {
  height: 40px;
}
</style>
