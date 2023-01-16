import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";
import { env } from "../../../env/server.mjs";

const handler: RequestHandler = async (req: any, res: any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "GET") return res.status(405).end();
  console.log(req.query);
  if (!req.query.id) return res.status(400).end();
  // event/ticket?id=qdwhuihdwqq

  try {
    const ticket = await prisma.ticket.findUnique({
      select: {
        id: true,
        name: true,
        price: true,
        event: {
            select: {
                name: true,
                description: true,
                price: true,
            }
        }
      },
      where: {
        id: req.query.id,
      },
    });
    return res.status(200).json({
      ...ticket,
      link: `${env.NEXTAUTH_URL}/ticket/${ticket?.id}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

export default handler;
