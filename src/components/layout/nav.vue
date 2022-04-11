<template>
  <div :class="bem('nav')">
    <fe-card :class="bem('user')">
      <fe-avatar :src="userInfo.avatar" size="large" />
      <div class="summary">
        <p>{{ userInfo.author }}</p>
        <p>{{ userInfo.introduce }}</p>
      </div>
    </fe-card>
    <fe-spacer :y="1" />
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
import { menus } from './menu'

const bem = createBem('kanno-desktop')

export default defineComponent({
  name: 'LayoutNav',
  props: {
    userInfo: {
      type: Object
    }
  },
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
  }
  &__user {
    background-color: var(--primary-background);
    height: 250px;
    width: 100%;
    :deep(.fect-card__content) {
      padding: var(--fect-gap-half);
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    :deep(.fect-avatar) {
      --avatar-large-size: 80px;
    }
    .summary {
      p {
        text-align: center;
        margin: 0;
        margin-bottom: 5px;
        font-size: 18px;
        &:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }
  &__list {
    width: 100%;
    background-color: var(--primary-background);
    border-radius: var(--fect-radius);
    border: 1px solid var(--accents-2);
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
