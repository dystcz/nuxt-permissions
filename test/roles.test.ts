import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createPage } from '@nuxt/test-utils'

describe('roles on client', async () => {
  await setup({
    browser: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url))
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('index page')
  })

  it('renders the admin page when user is admin', async () => {
    const page = await createPage('/roles?roles=admin')
    const html = await page.innerHTML('body')
    expect(html).toContain('admin page')
  })

  it('renders the admin page when user is admin and guest', async () => {
    const page = await createPage('/roles?roles=admin&role=guest')
    const html = await page.innerHTML('body')
    expect(html).toContain('admin page')
  })

  it('renders the index page when user is not admin', async () => {
    const page = await createPage('/roles?roles=guest')
    const html = await page.innerHTML('body')
    expect(html).toContain('index page')
  })

  it('renders the admin only section if role is admin', async () => {
    const page = await createPage('/roles?roles=admin')
    const html = await page.innerHTML('body')
    expect(html).toContain('admin only')
  })

  it('renders the admin or user section if role is admin', async () => {
    const page = await createPage('/roles?roles=admin')
    const html = await page.innerHTML('body')
    expect(html).toContain('admin or user')
  })

  it('does not render the admin section if role is not admin', async () => {
    const page = await createPage('/roles?roles=user')
    const html = await page.innerHTML('body')
    expect(html).not.toContain('admin only')
  })

  it('does not render the admin or user section if role is not admin nor user', async () => {
    const page = await createPage('/roles?roles=editor')
    const html = await page.innerHTML('body')
    expect(html).not.toContain('admin or user')
  })

  it('renders the admin or user section if role is user', async () => {
    const page = await createPage('/roles?roles=user')
    const html = await page.innerHTML('body')
    expect(html).toContain('admin or user')
  })
})
