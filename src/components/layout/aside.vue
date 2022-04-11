<template>
  <div :class="bem('aside')">
    <fe-card :class="bem('user')"> 1 </fe-card>
    <fe-spacer :y="1" />
    <p :class="bem('widgets')">Powered by Fect</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createBem } from '@/utils/bem'

const bem = createBem('kanno-desktop')

export default defineComponent({
  name: 'LayoutAside',
  props: {
    userInfo: {
      type: Object
    }
  },
  setup(props) {
    return {
      bem
    }
  }
})
</script>

<style lang="less" scoped>
.kanno-desktop {
  &__aside {
    height: 100%;
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
  &__widgets {
    margin: 0;
  }
}
</style>
