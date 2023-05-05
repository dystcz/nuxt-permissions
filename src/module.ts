import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript inteface definition
export interface ModuleOptions {
  redirectIfNotAllowed: string
}

const defaults: ModuleOptions = {
  redirectIfNotAllowed: '/'
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
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})
