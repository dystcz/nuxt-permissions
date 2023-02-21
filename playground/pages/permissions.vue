<script setup>
import { definePageMeta, useCookie, useRoute } from '#imports'
const route = useRoute()
const userPermissions = useCookie('permissions')
userPermissions.value =
  typeof route.query.permissions === 'string'
    ? [route.query.permissions]
    : route.query.permissions

definePageMeta({
  middleware: ['nuxt-permissions'],
  permissions: ['view_page', 'edit_page', 'test_page']
})
</script>

<template>
  <div>permissions page</div>

  <div v-can="'edit_page'">edit page</div>
  <div v-can="['edit_page', 'view_page']">edit or view</div>
  <div v-can:not="'edit_page'">edit not page</div>
  <div v-can:not="['edit_page', 'view_page']">edit nor view page</div>
</template>
