import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()



export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
    try {
        console.log(req.query)
        const data = await prisma.post.findUnique({
            where: {
                id: req.query.details,
            },
            include: {
                user: true,
                comments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    include: {
                        user: true,
                    },
                },
            },
        })
        console.log(data)
        return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
}
