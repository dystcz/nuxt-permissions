<script setup>
import { definePageMeta } from '#imports'

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
