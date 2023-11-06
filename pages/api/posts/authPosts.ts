import { PrismaClient } from "@prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: "Please signin to create a post." })
    }
    // Get Auth Users Posts
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email || ""
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      })

      return res.status(200).json(data)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a post" })
    }
  }
}
