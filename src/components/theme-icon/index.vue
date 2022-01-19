<template>
  <div class="theme-icon" title="change theme" role="button">
    <Sun size="18" @click="clickHandler" v-show="theme === 'light-theme'" />
    <Moon size="18" @click="clickHandler" v-show="theme === 'dark-theme'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Sun, Moon } from "@fect-ui/vue-icons";
export default defineComponent({
  name: "ThemeIcon",
  components: {
    Sun,
    Moon,
  },
  props: {
    theme: String,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const clickHandler = (e: MouseEvent) => emit("click", e);

    return {
      clickHandler,
    };
  },
});
</script>

<style scoped>
.theme-icon {
  margin-left: auto;
}
</style>
