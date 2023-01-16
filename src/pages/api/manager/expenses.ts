import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res: any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "GET") return res.status(405).end();
  if (!session) return res.status(401).end();
  if (!session.user?.admin) return res.status(403).end();

    const expenses = await prisma.expenses.findMany({
        select: {
            id: true,
            name: true,
            amount: true,
            type: true,
            createdAt: true,
        }
    });

  return res.status(200).json(expenses);
};

export default handler;
