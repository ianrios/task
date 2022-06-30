import { getSession } from 'next-auth/react'
import prisma from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body

  const session = await getSession({ req })
  if (session?.user?.email) {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: { email: session.user.email },
        },
      },
    })
    res.json(result)
  }
}

export default handle
