import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, createPage, url } from '@nuxt/test-utils'

describe('roles', async () => {
  await setup({
    server: true,
    browser: true,
    rootDir: fileURLToPath(new URL('./fixtures/roles', import.meta.url))
  })

  it('renders index page', async () => {
    const page = await createPage('/')
    expect(await page.innerHTML('body')).toContain('index page')
  })

  it('renders test cookie value', async () => {
    const page = await createPage('/', {
      storageState: {
        cookies: [
          {
            name: 'test',
            value: 'test-cookie',
            path: '/',
            domain: new URL(url('/')).host,
            expires: -1,
            httpOnly: false,
            secure: false,
            sameSite: 'None'
          }
        ],
        origins: []
      }
    })

    expect(await page.innerHTML('body')).toContain('test-cookie')
  })
})
