export interface ModuleOptions {
  redirectIfNotAllowed: string | null | false
  fullAccessRoles: string | string[] | null
}

export type Roles = string[]
export type Permissions = string[]
