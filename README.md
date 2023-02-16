# Nuxt Permissions

[![npm version](https://badge.fury.io/js/nuxt-permissions.svg)](https://badge.fury.io/js/nuxt-permissions)

This is a simple package for integration of roles and permissions.
This package **should not be used as only solution**, it's designed to complement backend permissions.

## Installation

```bash
yarn add nuxt-permissions
# or
npm i nuxt-permissions
```

Introduce the module into the `nuxt.config.[js,ts]`.

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-permissions'
    // ...
  ]
})
```

## Usage

### Setting user's permissions or roles

To set user's permissions you must set a cookie named `permissions` or `roles` containing array of permissions or roles as `string[]`.

```ts
const userPermissions = useCookie('permissions')
const userRoles = useCookie('roles')

const user = await login() // your login functionality
userPermissions.value = user.permissions // ['read posts', ..., 'delete posts']
userRoles.value = user.roles // ['admin', 'editor']
```

### middleware usage

To use predefined middleware you must set `permissions` or `roles` in `definePageMeta`. For example for admin dashboard you would set `roles` to `['admin']` and/or `permissions` to `['access dashboard']`, of course depending on your backend settings.

You can use combination of both, **permissions have higher priority then roles**

If roles or permissions are not set, access to that page is unrestricted.

```ts
// ~/pages/admin/dashboard
definePageMeta({
  roles: ['admin'],
  permissions: ['access dashboard']
})
```

### Directives

Directives can be `string` or `string[]`. If array is passed, it is enough for only one item to apply and the condition will be fulfilled.

#### v-can

Works as `v-if` but for permissions

```vue
<button v-can="'edit posts'">
  Edit
</button>
```

#### v-can:not

Works as negated `v-if` but for permissions

```vue
<div v-can:not="'edit posts'">
  You do not have permissions to edit this post
</div>
```

#### v-role

Works as `v-if` but for roles

```vue
<div v-role="'admin'">
  You are admin
</div>
```

#### v-role:not

Works as negated `v-if` but for roles

```vue
<div v-role:not="'admin'">
  You are not admin
</div>
```
