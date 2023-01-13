import { RequestHandler } from "next/dist/server/next";
import { prisma } from "../../../server/db";

const handler: RequestHandler = async (req: any, res: any) => {
  if (req.method !== "GET") return res.status(405).end();
  req.body.search = req.body.search || "Priv";
  req.body.price = req.body.price || 26;
  req.body.price2 = req.body.price2 || 76;

  const events = await prisma.event.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      hostedBy: true,
      image: true,
      date: true,
      price: true,
    },
    where: {
        OR: [
            { name: { contains: req.body.search } },
            { description: { contains: req.body.search } },
        ],
        AND: [
            {price: {gt: req.body.price}},
            {price: {lt: req.body.price2}}
        ],
    },
  });

  return res.status(200).json(events);
};

export default handler;
