export default defineNuxtConfig({
  ssr: false,
  modules: ['../src/module'],
  nuxtPermissions: {
    redirectIfNotAllowed: '/not-allowed' // default: null
  }
})
