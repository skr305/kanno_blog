<template>
  <div :class="bem('main')">
    <layout-header :sub-title="title" />
    <main :class="bem('container')">
      <fe-grid-group :gap="1">
        <fe-grid :class="bem('nav')" :sm="6" :xs="6">
          <layout-nav :user-info="userInfo" />
        </fe-grid>
        <fe-grid :class="bem('content')" :sm="12" :xs="24">
          <router-view />
        </fe-grid>
        <fe-grid :class="bem('aside')" :sm="6" :xs="6">
          <layout-aside :user-info="userInfo" />
        </fe-grid>
      </fe-grid-group>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createBem } from '@/utils/bem'
import { useGlobalState } from '@/app/state'
import LayoutHeader from './header.vue'
import LayoutNav from './nav.vue'
import ArticleList from '../articles/list.vue'
import LayoutAside from './aside.vue'

const bem = createBem('kanno-main')

export default defineComponent({
  components: { LayoutHeader, LayoutNav, LayoutAside, ArticleList },
  name: 'LayoutMain',
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
.kanno-main {
  &__main {
    background-color: var(--accents-2);
    height: auto;
    position: relative;
  }
  &__container {
    max-width: 960px;
    margin: 0 auto;
    margin-top: 4.5rem;
    width: 100%;
  }
  &__articles {
    width: 100%;
  }

  @media only screen and (max-width: 650px) {
    &__nav,
    &__aside {
      width: 0;
      display: none;
    }
  }
}
</style>
