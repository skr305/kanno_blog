<template>
  <div :class="bem('main')">
    <desk-top-header :sub-title="title" />
    <main :class="bem('container')">
      <fe-grid-group :gap="2">
        <fe-grid :sm="4" :xs="4">
          <desk-top-nav />
        </fe-grid>
        <fe-grid :sm="14" :xs="14">
          <div :class="bem('articles')"></div>
        </fe-grid>
        <fe-grid :sm="6" :xs="6">
          <desk-top-aside :user-info="userInfo" />
        </fe-grid>
      </fe-grid-group>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createBem } from '@/utils/bem'
import { useGlobalState } from '@/app/state'
import DeskTopHeader from './header.vue'
import DeskTopNav from './nav.vue'
import DeskTopAside from './aside.vue'

const bem = createBem('kanno-desktop')

export default defineComponent({
  components: { DeskTopHeader, DeskTopNav, DeskTopAside },
  name: 'DeskTopMain',
  setup() {
    const { title, avatar, author, introduce } = useGlobalState()

    const userInfo = {
      avatar,
      author,
      introduce
    }

    return {
      bem,
      title,
      userInfo
    }
  }
})
</script>

<style lang="less" scoped>
.kanno-desktop {
  &__main {
    background-color: var(--accents-2);
  }
  &__container {
    max-width: 960px;
    margin: 0 auto;
    margin-top: 4.5rem;
    width: 100%;
  }
  &__articles {
  }
}
</style>
