<script setup lang="ts">
import { definePageMeta } from '#imports'
definePageMeta({
  middleware: ['nuxt-permissions'],
  roles: 'user'
})
</script>

<template>
  <div>test page</div>
</template>
