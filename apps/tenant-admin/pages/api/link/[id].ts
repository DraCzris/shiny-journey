// create a get endpoint which will take paramater of id from the url
// and fetch "test.com/add-account-to-voucher/" with the id in body as voucher_code
// and redirect to overview page
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withApiAuthRequired(async function linkAccountToVoucher(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const session = await getSession(req, res)
  const accessToken = session?.accessToken

  if (!accessToken) {
    res.status(401).json({ error: 'Unauthorized' })

    return
  }

  const link = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL_INTERNAL}/internal/jira/add-account-to-voucher/`,
    {
      method: 'POST',
      body: JSON.stringify({ voucher_code: id, auth0_jwt: accessToken }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json())

  if (link.callback_url) {
    res.json({ url: `${link.callback_url}?id=${id}` })

    return
  }

  res.status(500).json({ error: 'Something went wrong' })
})
