import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withApiAuthRequired(async function linkAccountToVoucher(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res)
  const accessToken = session?.accessToken

  if (!accessToken) {
    res.status(401).json({ error: 'Unauthorized' })

    return
  }

  const url = req.url?.replace('/api/proxy/', '')

  const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}/`

  return axios({
    method: req.method,
    url: finalUrl,
    data: req.body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      res.status(response.status).json(response.data)
    })
    .catch((error) => {
      // get status from error
      res.status(error.response.status).json(error.response.data)
    })
})
