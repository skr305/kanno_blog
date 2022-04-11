<template>
  <div :class="bem('main')">
    <layout-header :sub-title="title" />
    <main :class="bem('container')">
      <div :class="bem('nav')">
        <layout-nav :user-info="userInfo" />
      </div>
      <div :class="bem('content')">
        <div :class="bem('inner')">
          <router-view />
        </div>
        <div :class="bem('aside')">
          <layout-aside :user-info="userInfo" />
        </div>
      </div>
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
    display: flex;
  }
  &__nav {
    z-index: 100;
    position: fixed;
    width: 210px;
  }
  &__content {
    width: calc(100% - 211px);
    margin-left: 211px;
    padding: 0 5px;
    height: auto;
    display: flex;
  }
  &__inner {
    width: calc(100% - 352px);
    min-width: 500px;
    overflow: hidden;
  }
  &__aside {
    width: 300px;
    margin-left: 5px;
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
    &__content {
      width: 95vw;
      margin: 0 auto;
    }
    &__inner {
      min-width: 100%;
      width: 100%;
    }
  }
}
</style>
