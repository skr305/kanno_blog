<template>
  <div class="concat">
    <fe-grid-group :gap="0.5">
      <fe-grid>
        <fe-link class="link" aria-label="bio" taget="_blank" href="/"> Blog </fe-link>
      </fe-grid>
      <fe-grid>
        <fe-link class="link" :href="email" aria-label="email">Email</fe-link>
      </fe-grid>
      <fe-grid>
        <fe-link class="link" :href="github" target="_blank" aria-label="github"> Github </fe-link>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGlobalState } from '@/app/state'
export default defineComponent({
  name: 'Concat',
  setup() {
    const { email, github } = useGlobalState()

    return { email, github }
  }
})
</script>

<style scoped>
.concat {
  border-top: 1px solid var(--accents-2);
  width: 100%;
  box-sizing: border-box;
  padding: var(--fect-gap-quarter);
  z-index: 1;
  margin-top: auto;
  position: relative;
  bottom: var(--fect-gap);
  left: 50%;
  transform: translateX(-50%);
}

.concat .link {
  font-size: 0.75rem;
  color: var(--accents-5);
  text-transform: uppercase;
}

.concat .link:hover {
  transition: all 150ms ease;
  color: var(--fect-link-color);
  text-decoration: underline dashed;
}
</style>
