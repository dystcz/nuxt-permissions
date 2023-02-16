<script setup>
const route = useRoute()
const userRoles = useCookie('roles')
userRoles.value =
  typeof route.query.roles === 'string'
    ? [route.query.roles]
    : route.query.roles

definePageMeta({
  roles: ['admin', 'user', 'editor']
})
</script>

<template>
  <div>admin page</div>

  <div v-role="'admin'">admin only</div>
  <div v-role="['admin', 'user']">admin or user</div>
</template>
