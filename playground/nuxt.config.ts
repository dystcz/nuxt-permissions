export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtPermissions: {
    redirectIfNotAllowed: '/not-allowed' // default: '/'
  }
})
