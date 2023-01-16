import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res:any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "GET") return res.status(405).json({kek: "lol"}).end();
  if (!session) return res.status(401).end();


    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        tickets: true,
      },
      where: {
        id: `${session?.user?.id}`,
      },
    });
  
  return res.status(200).json(user);
};

export default handler;
