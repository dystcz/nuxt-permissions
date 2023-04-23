<script setup lang="ts">
import { ref, useCookie } from '#imports'
const test = useCookie<string>('test')
const userRoles = useCookie<string[]>('roles')
const userPermissions = useCookie<string[]>('permissions')

const role = ref('')
const setRole = () => {
  if (!role.value) return
  if (!userRoles.value) userRoles.value = []
  userRoles.value.push(role.value)
  role.value = ''
}

const permission = ref('')
const setPermission = () => {
  if (!permission.value) return
  if (!userPermissions.value) userPermissions.value = []
  userPermissions.value.push(permission.value)
  permission.value = ''
}
</script>

<template>
  <div>
    <div>index page</div>
    {{ test }}

    <h2>User roles</h2>
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
  </div>
</template>
