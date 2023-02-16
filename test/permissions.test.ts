import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch, createPage } from '@nuxt/test-utils'

describe('permissions on client', async () => {
  await setup({
    browser: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url))
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('index page')
  })

  it('renders permissions page when user has permission to view_page', async () => {
    const page = await createPage('/permissions?permissions=view_page')
    const html = await page.innerHTML('body')
    expect(html).toContain('permissions page')
  })

  it('renders permissions page when user has permission to view_page and edit_page', async () => {
    const page = await createPage(
      '/permissions?permissions=view_page&permissions=edit_page'
    )
    const html = await page.innerHTML('body')
    expect(html).toContain('permissions page')
  })

  it('renders the index page when user does not have permission to view_page', async () => {
    const page = await createPage('/permissions?permissions=forbidden')
    const html = await page.innerHTML('body')
    expect(html).not.toContain('admin page')
  })

  it('renders the edit section if user has permission to edit_page', async () => {
    const page = await createPage('/permissions?permissions=edit_page')
    const html = await page.innerHTML('body')
    expect(html).toContain('edit page')
  })

  it('renders the edit or view section if user has permission to edit_page', async () => {
    const page = await createPage('/permissions?permissions=edit_page')
    const html = await page.innerHTML('body')
    expect(html).toContain('edit or view')
  })

  it('does not render the edit section if user does not have permission to edit_page', async () => {
    const page = await createPage('/permissions?permissions=view_page')
    const html = await page.innerHTML('body')
    expect(html).not.toContain('edit page')
  })

  it('does not render the edit or view section if user does not have permission to edit_page nor view_page', async () => {
    const page = await createPage('/permissions?permissions=test_page')
    const html = await page.innerHTML('body')
    expect(html).not.toContain('edit or view')
  })

  it('renders not edit section if user has not permission to edit_page', async () => {
    const page = await createPage('/permissions?permissions=view_page')
    const html = await page.innerHTML('body')
    expect(html).toContain('edit not page')
  })

  it('does not render not edit section if user has permission to edit_page', async () => {
    const page = await createPage('/permissions?permissions=edit_page')
    const html = await page.innerHTML('body')
    expect(html).not.toContain('edit not page')
  })

  it('renders the edit nor view section if user has not permission to edit_page nor view_page', async () => {
    const page = await createPage('/permissions?permissions=test_page')
    const html = await page.innerHTML('body')
    expect(html).toContain('edit nor view page')
  })
})
