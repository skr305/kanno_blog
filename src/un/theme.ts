/**
 * control ssr theme
 */

import Storage from '@/utils/storage'
import cookies from 'js-cookie'
import { ref, readonly, App, inject } from 'vue'

export enum Theme {
  Light = 'light-theme',
  Dark = 'dark-theme'
}

export const THEME_STORAGE_KEY = 'theme'

const DARK_THEME_QUERY = '(prefers-color-scheme: dark)'
const LIGHT_THEME_QUERY = '(prefers-color-scheme: light)'

export const getClientLocalTheme = () => {
  // local theme
  const historyTheme = Storage.get(THEME_STORAGE_KEY)
  if (historyTheme) {
    return historyTheme === Theme.Dark ? Theme.Dark : Theme.Light
  }
  if (window.matchMedia(DARK_THEME_QUERY).matches) return Theme.Dark

  if (window.matchMedia(LIGHT_THEME_QUERY).matches) return Theme.Light

  return Theme.Light
}

const ThemeSymbol = Symbol('theme')
const themes = [Theme.Light, Theme.Dark]

export const createTheme = (initTheme: Theme) => {
  const theme = ref<Theme>(initTheme === Theme.Dark ? Theme.Dark : Theme.Light)

  const set = (newTheme: Theme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme
      cookies.set(THEME_STORAGE_KEY, newTheme)
      Storage.set(THEME_STORAGE_KEY, newTheme)
    }
  }
  const toggle = () => set(theme.value === Theme.Dark ? Theme.Light : Theme.Dark)
  const bindClientSystem = () => {
    window.matchMedia(DARK_THEME_QUERY).addEventListener('change', ({ matches }) => matches && set(Theme.Dark))
    window.matchMedia(LIGHT_THEME_QUERY).addEventListener('change', ({ matches }) => matches && set(Theme.Light))
  }
  const themeState = {
    theme: readonly(theme),
    set,
    toggle,
    bindClientSystem
  }

  return {
    ...themeState,
    install(app: App) {
      app.provide(ThemeSymbol, themeState)
    }
  }
}

export const useTheme = () => {
  return inject(ThemeSymbol) as Omit<ReturnType<typeof createTheme>, 'install'>
}
