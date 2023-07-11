import { useStorage } from '@vueuse/core'
import type { Roles, Permissions } from '../types'

export function useRoles() {
  return useStorage<Roles>('roles', [])
}

export function usePermissions() {
  return useStorage<Permissions>('permissions', [])
}
