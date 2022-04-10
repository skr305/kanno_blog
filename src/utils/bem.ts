import { createBem as _createBem } from '@fect-ui/vue/lib/utils/create/create-bem'

import { Mods } from '@fect-ui/vue/types/utils/create/create-bem'

export const createBem = _createBem as (
  base: string
) => (el?: string | null | undefined, mods?: Mods | undefined) => string
