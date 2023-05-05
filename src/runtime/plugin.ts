import { defineNuxtPlugin, useCookie, addRouteMiddleware, useRuntimeConfig } from '#app'
import { ModuleOptions } from '../module';

export default defineNuxtPlugin((nuxtApp) => {
  const config: ModuleOptions = useRuntimeConfig().public.nuxtPermissions

  const userRoles = useCookie<string | string[]>('roles')
  const userPermissions = useCookie<string | string[]>('permissions')

  if (typeof userRoles.value === 'string') {
    userRoles.value = [userRoles.value]
  }
  if (typeof userPermissions.value === 'string') {
    userPermissions.value = [userPermissions.value]
  }

  function hasRequiredPermissions(permissions: string | string[] | undefined) {
    if (!permissions) return

    const routePermissions =
      typeof permissions === 'string' ? [permissions] : permissions

    return routePermissions.some((permission) => {
      return (userPermissions.value || []).includes(permission)
    })
  }

  function hasRequiredRoles(roles: string | string[] | undefined) {
    if (!roles) return

    const myRoles = typeof roles === 'string' ? [roles] : roles

    return myRoles.some((role) => (userRoles.value || []).includes(role))
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

    if (from.fullPath !== to.fullPath) {
      return from.fullPath
    }

    return config.redirectIfNotAllowed
  })

  function hasNotPermission(binding: string | string[] | undefined) {
    if (!binding) return true
    const activePermissions = typeof binding === 'string' ? [binding] : binding
    return !activePermissions.some((permission) =>
      (userPermissions.value || []).includes(permission)
    )
  }

  function hasPermission(binding: string | string[]) {
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
    },
    getSSRProps(binding) {
      if (!hasPermission(binding.value)) {
        return {
          style: 'display: none'
        }
      }
      return {}
    }
  })

  function hasNotRole(binding: string | string[] | undefined) {
    if (!binding) return true
    const activeRoles = typeof binding === 'string' ? [binding] : binding
    return !activeRoles.some((role) => (userRoles.value || []).includes(role))
  }

  function hasRole(binding: string | string[]) {
    return !hasNotRole(binding)
  }

  nuxtApp.vueApp.directive('role', {
    mounted(el, binding) {
      if (!hasRole(binding.value)) {
        el.remove()
      }
    },
    getSSRProps(binding) {
      if (!hasRole(binding.value)) {
        return {
          style: 'display: none'
        }
      }

      return {}
    }
  })

  return {
    provide: {
      hasRole,
      hasPermission
    }
  }
})
