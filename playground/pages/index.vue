<script setup lang="ts">
// @ts-ignore
import { ref, useNuxtApp, useRoles, usePermissions } from '#imports'

const userRoles = useRoles()
const userPermissions = usePermissions()

const role = ref('')
const setRole = () => {
  if (!role.value) return
  userRoles.value.push(role.value)
  role.value = ''
}

const permission = ref('')
const setPermission = () => {
  if (!permission.value) return
  userPermissions.value.push(permission.value)
  permission.value = ''
}

const { $hasPermission, $hasRole } = useNuxtApp()
</script>

<template>
  <div>
    <div>index page</div>

    <h2>User roles</h2>
    {{ userRoles }}
    <ul>
      <li v-for="(role, r) in userRoles">
        <span>
          {{ role }}
        </span>
        <button @click="userRoles.splice(r, 1)">x</button>
      </li>
    </ul>

    <form @submit.prevent="setRole">
      <input placeholder="role" type="text" v-model="role" />
      <button tupe="submit">setRole</button>
    </form>

    <h2>User permissions</h2>

    <ul>
      <li v-for="(permission, p) in userPermissions">
        <span>
          {{ permission }}
        </span>
        <button @click="userPermissions.splice(p, 1)">x</button>
      </li>
    </ul>

    <form @submit.prevent="setPermission">
      <input placeholder="permission" type="text" v-model="permission" />
      <button tupe="submit">setPermission</button>
    </form>

    <div style="margin-top: 3rem" v-if="$hasRole('admin')">
      This section is visible to admins only
    </div>

    <div v-role="undefined">asdfasdfsdf</div>

    <div style="margin-top: 3rem" v-if="$hasPermission('edit')">
      This section is visible to user with permission "edit"
    </div>
  </div>
</template>
