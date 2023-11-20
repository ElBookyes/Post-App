import { PrismaClient } from "@prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import type { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "../auth/[...nextauth]"

const prisma = new PrismaClient()


export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
  ) {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: "Please signin to create a post." })
    }
    //Get User
    const prismaUser = await prisma.user.findUnique({
        where: {email: session?.user?.email || ''},
    })
    try {
      const { title, postId } = req.body.data
      console.log(title, postId)
      if(!title.length){
        return res.status(401).json({message: 'Please enter something'})
      }

      const result = await prisma.comment.create({
        data: {
          title,
          userId: prismaUser?.id || "",
          postId,
        }
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while making a comment" })
    }
  }
}