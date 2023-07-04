import { useStorage } from '@vueuse/core'

export function useRoles() {
  return useStorage<string[]>('roles', [])
}

export function usePermissions() {
  return useStorage<string[]>('permissions', [])
}
