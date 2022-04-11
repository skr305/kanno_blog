<template>
  <li class="kanno-article" @click="clickHandler">
    <fe-row>
      <fe-col :span="16">
        <h5>
          <p>
            {{ articleData.meta.title }}
          </p>
        </h5>
        <div class="introduce">
          <span>
            {{ dateTransfer(articleData.meta.date) }}
          </span>
        </div>
      </fe-col>
      <fe-col :span="6">
        <!-- <fe-img src="https://avatars.githubusercontent.com/u/52351095?s=100&v=4" width="100%" height="100%" /> -->
      </fe-col>
    </fe-row>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { dateString } from '@/utils'

export default defineComponent({
  name: 'ArticleItem',
  props: {
    articleData: Object
  },
  emits: ['click'],
  setup(props, { emit }) {
    const dateTransfer = (stamp: string) => dateString(stamp)

    const clickHandler = () => emit('click', props.articleData)

    return { dateTransfer, clickHandler }
  }
})
</script>

<style lang="less" scoped>
.kanno-article {
  display: block;
  cursor: pointer;
  width: 100%;
  height: 6.5rem;
  overflow: hidden;
  box-sizing: border-box;
  padding: var(--fect-gap-quarter);
  border-radius: var(--fect-radius);
  background-color: var(--primary-background);
  &::before {
    display: none;
    content: '';
  }
  p {
    margin: 0;
    padding: 0;
  }
  h5 {
    margin: 0;
  }
  h5 > p {
    font-size: 18px;
    margin: 0;
    padding: 0;
  }
  :deep(.fect-row) {
    height: 100%;
    justify-content: space-between;
  }
  .introduce {
    font-size: 14px;
    span {
      color: var(--accents-3);
    }
  }
}
</style>
