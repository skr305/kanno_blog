<template>
  <div class="theme-icon" title="change theme" role="button" @click="themeChange">
    <Sun size="20" v-if="theme === 'light-theme'" />
    <Moon size="20" v-else-if="theme === 'dark-theme'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Sun, Moon } from '@fect-ui/vue-icons'
import { useTheme } from '@/un/theme'
export default defineComponent({
  name: 'ThemeIcon',
  components: {
    Sun,
    Moon
  },
  props: {
    theme: String
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { theme, toggle } = useTheme()

    return {
      theme,
      themeChange: () => {
        toggle()
        document.querySelector('html').setAttribute('class', theme.value)
      }
    }
  }
})
</script>

<style scoped>
.theme-icon {
  margin-left: auto;
  height: 20px;
  width: 20px;
}
</style>
