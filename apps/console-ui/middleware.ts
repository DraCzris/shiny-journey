import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

// Step 1. HTTP Basic Auth Middleware for Challenge
export function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }
  const response = NextResponse.next()
  const auth = `${AUTH_USER}:${AUTH_PASS}`

  const encoded = btoa(auth)

  response.cookies.set('authData', `${encoded}`, {
    httpOnly: false,
  })

  return response
}

// Step 2. Check HTTP Basic Auth header if present
function isAuthenticated(req: NextRequest) {
  const authheader =
    req.headers.get('authorization') || req.headers.get('Authorization')

  if (!authheader) {
    return false
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64')
    .toString()
    .split(':')
  const user = auth[0]
  const pass = auth[1]

  if (user === AUTH_USER && pass === AUTH_PASS) {
    return true
  }

  return false
}
