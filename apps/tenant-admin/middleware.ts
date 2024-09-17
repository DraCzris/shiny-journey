import {
  getSession,
  withMiddlewareAuthRequired,
} from '@auth0/nextjs-auth0/edge'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { OnboardingStatus } from '@waypoint/api-tenant-admin'

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  // redirect /logout to /api/auth/logout
  if (req.nextUrl.pathname === `/logout`) {
    // eslint-disable-next-line no-param-reassign
    req.nextUrl.pathname = 'api/auth/logout'

    return NextResponse.redirect(req.nextUrl)
  }

  // API routes should just continue
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const res = NextResponse.next()

  const token = await getSession(req, res)

  // fetch tenant data
  // and check if user has accepted terms and conditions

  const data: OnboardingStatus = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/onboarding-status/`,
    {
      headers: {
        'CONTENT-TYPE': 'application/json',
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  ).then((res) => res.json())

  const redirectUrl = req.nextUrl.searchParams.get('redirect') ?? '/'

  // Check if user has accepted terms and conditions
  // Only redirect if user is not on the terms and conditions page
  if (
    data.has_accepted_terms === false &&
    req.nextUrl.pathname !== '/onboarding/consents-collection'
  ) {
    return NextResponse.redirect(
      new URL(`/onboarding/consents-collection?redirect=${req.url}`, req.url)
    )
  }

  // Prevent access to the terms and conditions page when the user has already accepted them
  if (
    data.has_accepted_terms === true &&
    req.nextUrl.pathname === '/onboarding/consents-collection'
  ) {
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  // Check if user has chosen account type and redirect to screen for setting account type if not
  if (
    data.account_type === null &&
    data.has_accepted_terms &&
    req.nextUrl.pathname !== '/onboarding/account-type'
  ) {
    return NextResponse.redirect(
      new URL(`/onboarding/account-type?redirect=${req.url}`, req.url)
    )
  }

  if (
    data.account_type &&
    req.nextUrl.pathname === '/onboarding/account-type'
  ) {
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  // Only if the user has a standard account and has not yet subscribed
  if (
    data.account_type === 'standard' &&
    data.has_subscription === false &&
    data.has_accepted_terms &&
    req.nextUrl.pathname !== '/onboarding/set-plan' &&
    req.nextUrl.pathname !== '/onboarding/set-plan/check'
  ) {
    return NextResponse.redirect(
      new URL(`/onboarding/set-plan?redirect=${req.url}`, req.url)
    )
  }

  // Prevent access to the set plan page when the user has already set a plan
  if (
    (data.has_subscription || data.account_type === 'showcase') &&
    req.nextUrl.pathname === '/onboarding/set-plan'
  ) {
    return NextResponse.redirect(new URL(redirectUrl, req.url))
  }

  if (
    data.account_type === 'showcase' &&
    (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/account')
  ) {
    return NextResponse.redirect(new URL(`/report`, req.url))
  }

  // Otherwise, continue to the page
  return NextResponse.next()
})

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/report',
    '/onboarding/:path*',
    '/link-account/:path*',
    '/integrations/:path*',
    '/plan-change',
    '/account',
    '/logout',
  ],
}
