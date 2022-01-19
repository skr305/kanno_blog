<template>
  <div class="layout">
    <div class="layout__container">
      <fe-spacer />
      <theme-icon :theme="theme" @click="themeChange" />
      <profile />
      <fe-spacer />
      <slot />
      <fe-spacer :y="4" />
      <concat />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTheme } from "@fect-ui/vue";
import { createLayoutContext } from "./use-layout-context";
import ThemeIcon from "../theme-icon/index.vue";
import Concat from "../concat/index.vue";
import Profile from "../profile/index.vue";
import BLOGCONFIG from "../../../blog.config";
export default defineComponent({
  name: "Layout",
  components: {
    ThemeIcon,
    Profile,
    Concat,
  },
  setup() {
    const { theme, themeChange } = useTheme();
    const { provider } = createLayoutContext();
    provider(BLOGCONFIG);
    return { theme, themeChange };
  },
});
</script>

<style lang="css" scoped>
.layout {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.layout__container {
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}
@media only screen and (max-width: 767px) {
  .layout__container {
    max-width: 88vw;
    min-height: 100vh;
  }
}
</style>
