import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, createPage, createBrowser, getBrowser } from '@nuxt/test-utils'
import { BrowserContext } from 'playwright'

async function setCookies(context: BrowserContext, cookieValue: string[]) {
  await context.clearCookies()
  await context.addCookies([
    {
      name: 'roles',
      value: JSON.stringify(cookieValue),
      path: '/',
      domain: 'localhost'
    }
  ])
  return await context.cookies()
}

describe('roles', async () => {
  await setup({
    server: true,
    browser: true,
    rootDir: fileURLToPath(new URL('../playground', import.meta.url))
  })

  await createBrowser()
  const browser = await getBrowser()

  it('renders index page', async () => {
    const page = await createPage('/')
    expect(await page.innerHTML('body')).toContain('index page')
  })

  it('renders admin role', async () => {
    const context = await browser.newContext()
    await setCookies(context, ['admin'])

    const page = await createPage('/')

    expect(await page.innerHTML('body')).toContain('index page')
    await context.close()
  })

  it('not renders admin role when admin not set', async () => {
    const context = await browser.newContext()

    const page = await createPage('/')

    expect(await page.innerHTML('body')).not.toContain('admin')
    await context.close()
  })

  it('renders admin page when is admin', async () => {
    const context = await browser.newContext()
    const cookies = await setCookies(context, ['admin'])

    const rolesPage = await createPage('/roles')
    const page = await createPage('/')
    page.goto('/roles')

    expect(await page.innerHTML('body')).toContain('admin page')
    await context.close()

    // const page = await createPage('/roles', {
    //   storageState: {
    //     cookies: cookies.map((cookie) => {
    //       return {
    //         ...cookie,
    //         expires: cookie.expires ? cookie.expires : -1,
    //         sameSite: cookie.sameSite ? cookie.sameSite : 'None',
    //         httpOnly: cookie.httpOnly ? cookie.httpOnly : false,
    //         secure: cookie.secure ? cookie.secure : false
    //       }
    //     }),
    //     origins: []
    //   }
    // })

    // expect(await page.innerHTML('body')).toContain('admin page')
    // await context.close()
  })
})
