import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res:any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "PUT") return res.status(405).json({kek: "lol"}).end();
  if (!session) return res.status(401).json({kek: "lol"}).end();

  let updatedUser;
  if (req.body.email) {
    updatedUser = await prisma.user.update({
      select: {
        id: true,
        email: true,
        name: true,
      },
      where: {
        id: `${session?.user?.id}`,
      },
      data: {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
      },
    });
  }
  
  return res.status(200).json(updatedUser);
};

export default handler;
