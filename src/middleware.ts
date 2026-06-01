import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const locales = ['en', 'ar']
const defaultLocale = 'en'

// The same secret used to sign sessions in src/utils/auth.ts
function getSecret() {
  const secret = process.env.ADMIN_PASSWORD || 'fallback_secret_dont_use'
  return new TextEncoder().encode(secret)
}

async function verifyAdminSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_session')?.value
  if (!token) return false

  try {
    await jwtVerify(token, getSecret(), { algorithms: ['HS256'] })
    return true
  } catch {
    // Token is expired, tampered with, or invalid
    return false
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // --- Static assets & API: always pass through ---
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // --- Admin login page: always accessible (it's in the (auth) route group) ---
  if (pathname === '/admin/login') {
    // If already authenticated, redirect to dashboard
    const authenticated = await verifyAdminSession(request)
    if (authenticated) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  // --- All other /admin routes: require valid JWT ---
  if (pathname.startsWith('/admin')) {
    const authenticated = await verifyAdminSession(request)
    if (!authenticated) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname) // preserve intended destination
      const response = NextResponse.redirect(loginUrl)
      // Clear any stale/invalid cookie
      response.cookies.delete('admin_session')
      return response
    }
    return NextResponse.next()
  }

  // --- Locale redirect for public routes ---
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
