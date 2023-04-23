<script setup lang="ts">
import { useCookie } from '#imports'
const test = useCookie<string>('test')
</script>

<template>
  <div>
    <div>index page</div>
    <div>
      {{ test }}
    </div>
  </div>
</template>
