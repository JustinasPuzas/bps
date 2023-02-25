import { RequestHandler } from "next/dist/server/next";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler: RequestHandler = async (req: any, res: any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "GET") return res.status(405).end();

  if (session?.user?.admin) {
    const privateEvents = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        hostedBy: true,
        image: true,
        date: true,
        price: true,
        public: true,
        Tickets: true,
      },
    });

    return res.status(200).json(privateEvents);
  }

  return res.status(401);
};

export default handler;
