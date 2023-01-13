import { RequestHandler } from "next/dist/server/next";
import { string } from "zod";
import { prisma } from "../../../server/db";

const handler: RequestHandler = async (req: any, res: any) => {
  if (req.method !== "POST") return res.status(405).end();
  console.log(req.body)
  req.body.search = req.body.search || "";
  req.body.price1 = Number.parseInt(req.body.price1) || 0;
  req.body.price2 = Number.parseInt(req.body.price2) || 100000;

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
            {price: {gt: req.body.price1}},
            {price: {lt: req.body.price2}}
        ],
    },
  });

  return res.status(200).json(events);
};

export default handler;
