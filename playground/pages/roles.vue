<script setup>
import { definePageMeta, useCookie, useRoute } from '#imports'
const route = useRoute()
const userRoles = useCookie('roles')

console.log(userRoles.value)

definePageMeta({
  middleware: ['nuxt-permissions'],
  roles: ['admin', 'user', 'editor']
})
</script>

<template>
  <div>admin page</div>

  <div v-role="'admin'">admin only</div>
  <div v-role="['admin', 'user']">admin or user</div>
</template>
