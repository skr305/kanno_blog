<template>
  <div class="posts">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Posts'
})
</script>

<style>
.posts ul {
  padding: 0;
  list-style-type: none;
  margin: 8pt 8pt 8pt 16pt;
}

.posts ul > li {
  margin-bottom: 0.625rem;
  font-size: 1em;
  line-height: 1.625em;
}

.posts ul li::before {
  content: '–';
  display: inline-block;
  color: var(--accents-5);
  position: absolute;
  margin-left: -0.9375rem;
}
</style>
