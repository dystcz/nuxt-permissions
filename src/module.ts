import {
  defineNuxtModule,
  addPlugin,
  addImports,
  createResolver
} from '@nuxt/kit'
import type { ModuleOptions } from './types'

const defaults: ModuleOptions = {
  redirectIfNotAllowed: null,
  fullAccessRoles: null
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-permissions',
    configKey: 'nuxtPermissions'
  },
  // Default configuration options of the Nuxt module
  defaults,
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.nuxtPermissions = options
    const { resolve } = createResolver(import.meta.url)
    addPlugin(resolve('./runtime/plugin'))

    addImports({
      name: 'useRoles',
      as: 'useRoles',
      from: resolve('runtime/composables')
    })

    addImports({
      name: 'usePermissions',
      as: 'usePermissions',
      from: resolve('runtime/composables')
    })
  }
})
