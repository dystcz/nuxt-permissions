<script setup lang="ts"></script>

<template>
  <div>
    <h1>Nuxt permission</h1>
    <ul>
      <li>
        <nuxt-link :to="{name: 'index'}">index</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'roles'}">roles</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name: 'permissions'}">permissions</nuxt-link>
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>
