<template>
  <header :class="bem('header')">
    <div :class="bem('container')">
      <div :class="bem('aside')">
        <h1 :class="bem('aside', 'sub-title')">
          <activity :size="35" />
          {{ subTitle }}
        </h1>
      </div>
      <div :class="bem('nav')">
        <theme-icon />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Activity } from '@fect-ui/vue-icons'
import { createBem } from '@/utils/bem'
import ThemeIcon from '@/components/theme-icon/index.vue'

const bem = createBem('kanno-desktop')

export default defineComponent({
  name: 'LayoutHeader',
  components: { ThemeIcon, Activity },
  props: {
    subTitle: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      bem
    }
  }
})
</script>

<style lang="less" scoped>
.kanno-desktop {
  &__header {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 4rem;
    background-color: var(--primary-background);
    border-bottom: 1px solid var(--accents-2);
  }
  &__container {
    display: flex;
    width: 1080px;
    margin: 0 auto;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
  &__aside {
    cursor: pointer;
    &--sub-title {
      display: flex;
      align-items: center;
      height: inherit;
      font-weight: normal;
      margin: 0;
      padding: 0;
      font-size: 1.5rem;
      svg {
        margin-right: var(--fect-gap);
      }
    }
  }
}
</style>
