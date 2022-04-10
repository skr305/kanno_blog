<template>
  <div v-cloak class="application">
    <captured>
      <layout />
    </captured>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Captured from '@/components/universal/captured.vue'
import DeskTopMain from '@/components/layout/desktop/main.vue'

export default defineComponent({
  components: {
    Captured,
    DeskTopMain
  },
  setup(props) {}
})
</script>

<style lang="css">
html {
  background-color: var(--accents-2);
}
.application[v-cloak] {
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.application {
  --font-sans: 'LXGW WenKai', sans-serif;
  font-family: var(--font-sans);
}
</style>
