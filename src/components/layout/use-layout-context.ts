import { createProvider, useProvider } from '@fect-ui/vue-hooks'
import { LayoutProvide } from './interface'
export const LAYOUT_KEY = Symbol('layoutKey')

export const createLayoutContext = () => createProvider(LAYOUT_KEY)

export const useLayoutContext = () => useProvider<LayoutProvide>(LAYOUT_KEY)
