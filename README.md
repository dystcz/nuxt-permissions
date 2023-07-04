# Nuxt Permissions

[![npm version](https://badge.fury.io/js/nuxt-permissions.svg)](https://badge.fury.io/js/nuxt-permissions)

This is a simple package for integrating roles and permissions with a Nuxt application.
It is designed to complement backend permissions, and should not be used as the sole solution.

Please note that this is alpha quality software and **should not be used in production**.
This package is a work in progress and is subject to change.

## Installation

```bash
yarn add nuxt-permissions
# or
npm i nuxt-permissions
```

Introduce the module into the `nuxt.config.[js,ts]`. and set `ssr` to `false`

```js
export default defineNuxtConfig({
  ssr: false,
  modules: [
    'nuxt-permissions'
    // ...
  ]
})
```

## Usage

### Setting user permissions or roles

To set user permissions or roles, you must use a `usePermissions` or `useRoles` composable, that contains an array of strings for permissions or roles.

```ts
const userPermissions = usePermissions()
const userRoles = useRoles()

const user = await login() // your login functionality
userPermissions.value = user.permissions // ['read posts', ..., 'delete posts']
userRoles.value = user.roles // ['admin', 'editor']
```

### Middleware usage

To use the module, you must set `nuxt-permissions` as middleware and add `permissions` or `roles` in `definePageMeta`. For example, for the admin dashboard, you would set `roles` to `['admin']` and/or `permissions` to `['access dashboard']`, depending on your backend settings.

You can use a combination of both, but permissions have higher priority than roles.

If roles or permissions are not set, access to that page is unrestricted.

```ts
// ~/pages/admin/dashboard
definePageMeta({
  middleware: [
    'auth', // your auth middleware
    'nuxt-permissions'
  ],
  roles: ['admin'],
  permissions: ['access dashboard']
})
```

### Directives

Directives can be a string or an array of strings. If an array is passed, only one item needs to apply for the condition to be fulfilled.

#### v-can

Works as `v-if` but for permissions

```vue
<button v-can="'edit posts'">
  Edit
</button>
<!-- or -->
<button v-can="['edit posts', 'view posts']">
  View or edit
</button>
```

#### v-can:not

Works as negated `v-if` but for permissions

```vue
<div v-can:not="'edit posts'">
  You do not have permissions to edit this post
</div>
<!-- or -->
<div v-can:not="['edit posts', 'view posts']">
  You do not have permissions to edit nor view this post
</div>
```

#### v-role

Works as `v-if` but for roles

```vue
<div v-role="'admin'">
  You are admin
</div>
<!-- or -->
<div v-role="['admin', 'editor']">
  You are admin or editor
</div>
```

#### v-role:not

Works as negated `v-if` but for roles

```vue
<div v-role:not="'admin'">
  You are not admin
</div>
<!--  -->
<div v-role:not="['admin', 'editor']">
  You are not admin nor editor
</div>
```

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start playground in development mode.
- Use `npm run test` to run tests.
