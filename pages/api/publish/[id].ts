// pages/api/publish/[id].ts

import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

// PUT /api/publish/:id
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const postId = req.query.id
  if (typeof postId === 'string') {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    })
    res.json(post)
  }
}
export default handle
