import { updateSession } from './lib/supabase/middleware'
import { NextResponse } from 'next/server'

export async function proxy(request) {
  const { supabaseResponse, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Let the public home page and projects explore pages load instantly without database checks
  if (pathname === '/' || pathname === '/projects') {
    return supabaseResponse
  }

  // Only protect routes that explicitly step into the admin management folders
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login'

  if (isAdminRoute && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/login'
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === '/admin/login' && user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/', '/projects', '/admin/:path*'],
}
