import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res: any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "PUT") return res.status(405).end();
  if (!session) return res.status(401).end();
  if (!session.user?.admin) return res.status(403).end();

  if (!req.body.name) return res.status(400).json({error: "Event must have a name"}).end();

    const event = await prisma.event.create({
        data: {
            name: `${req.body.name}`,
            hostedBy: `${session.user.name}`
            
        }
    })

};

export default handler;
