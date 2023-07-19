import { defineNuxtPlugin, addRouteMiddleware, useRuntimeConfig } from '#app'
import type { ModuleOptions, Roles, Permissions } from '../types'
import { useRoles, usePermissions } from './composables'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.nuxtPermissions as ModuleOptions

  const userRoles = useRoles()
  const userPermissions = usePermissions()

  function hasRequiredPermissions(permissions: string | string[] | undefined) {
    if (!permissions) return

    const routePermissions =
      typeof permissions === 'string' ? [permissions] : permissions

    return routePermissions.some((permission: string) => {
      return userPermissions.value.includes(permission)
    })
  }

  function hasRequiredRoles(roles: string | string[] | undefined) {
    if (!roles) return

    const fullAccessRoles =
      typeof config.fullAccessRoles === 'string'
        ? [config.fullAccessRoles]
        : config.fullAccessRoles
    const myRoles = typeof roles === 'string' ? [roles] : roles

    if (
      fullAccessRoles &&
      fullAccessRoles.some((role) => userRoles.value.includes(role))
    ) {
      return true
    }
    return myRoles.some((role) => userRoles.value.includes(role))
  }

  addRouteMiddleware('nuxt-permissions', (to, from) => {
    const routePermissions = to.meta?.permissions as
      | string
      | string[]
      | undefined
    const routeRoles = to.meta?.roles as string | string[] | undefined

    if (!routePermissions && !routeRoles) {
      return true
    }

    if (routePermissions && hasRequiredPermissions(routePermissions)) {
      return true
    }

    if (routeRoles && hasRequiredRoles(routeRoles)) {
      return true
    }

    if (!config.redirectIfNotAllowed) {
      if (from.fullPath !== to.fullPath) {
        return from.fullPath
      }
      return false
    }

    return config.redirectIfNotAllowed || '/'
  })

  function hasNotPermission(binding: string | string[] | undefined) {
    if (!binding) return true
    const activePermissions = typeof binding === 'string' ? [binding] : binding
    return !activePermissions.some((permission) =>
      userPermissions.value.includes(permission)
    )
  }

  function hasPermission(binding: string | string[]) {
    if (!binding) return true
    return !hasNotPermission(binding)
  }

  nuxtApp.vueApp.directive('can', {
    mounted(el, binding) {
      if (binding.arg === 'not') {
        if (hasPermission(binding.value)) {
          el.remove()
        }
        return
      }
      if (!hasPermission(binding.value)) {
        el.remove()
      }
    }
  })

  function hasNotRole(binding: string | string[] | undefined) {
    if (!binding) return true
    const activeRoles = typeof binding === 'string' ? [binding] : binding
    return !activeRoles.some((role) => userRoles.value.includes(role))
  }

  function hasRole(binding: string | string[]) {
    if (!binding) return true
    const fullAccessRoles =
      typeof config.fullAccessRoles === 'string'
        ? [config.fullAccessRoles]
        : config.fullAccessRoles
    if (
      fullAccessRoles &&
      fullAccessRoles.some((role) => userRoles.value.includes(role))
    ) {
      return true
    }
    return !hasNotRole(binding)
  }

  nuxtApp.vueApp.directive('role', {
    mounted(el, binding) {
      if (binding.arg === 'not') {
        if (hasRole(binding.value)) {
          el.remove()
        }
        return
      }
      if (!hasRole(binding.value)) {
        el.remove()
      }
    }
  })

  return {
    provide: {
      hasRole,
      hasPermission
    }
  }
})
