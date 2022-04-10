<template>
  <div :class="bem('nav')">
    <nav :class="bem('list')">
      <fe-link v-for="menu in menus" :key="menu.id" :to="menu.id">
        <span>{{ menu.name }}</span>
      </fe-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createBem } from '@/utils/bem'
import { menus } from '../menu'

const bem = createBem('kanno-desktop')

export default defineComponent({
  name: 'DeskTopNav',
  setup() {
    return {
      bem,
      menus
    }
  }
})
</script>

<style lang="less" scoped>
.kanno-desktop {
  &__nav {
    width: 100%;
    background-color: var(--primary-background);
    box-shadow: var(--fect-shadowSmall);
    border-radius: var(--fect-radius);
    border: 1px solid var(--accents-2);
  }
  &__list {
    width: 100%;
    background-color: var(--primary-background);
    :deep(.fect-link) {
      width: 100%;
      height: 2.5rem;
      display: block;
      line-height: 2.5rem;
      box-sizing: border-box;
      padding: 0 var(--fect-gap);
      margin-bottom: var(--fect-gap-half);
    }
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: left;
    }
  }
}
</style>
