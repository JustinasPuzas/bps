import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res: any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "POST") return res.status(405).end();
  if (!session) return res.status(401).end();
  if (!session.user?.admin) return res.status(403).end();

  if (!req.body.name)
    return res.status(400).json({ error: "Event must have a Name" }).end();
  if (!req.body.hostedBy)
    return res
      .status(400)
      .json({ error: "Event must have Contact Email" })
      .end();
  if (!req.body.description)
    return res
      .status(400)
      .json({ error: "Event must have a Description" })
      .end();
  if (!Number.parseInt(req.body.price))
    return res.status(400).json({ error: "Event must have a Price" }).end();
  req.body.price = Number.parseInt(req.body.price);

  const event = await prisma.event.create({
    select: {
      id: true,
      name: true,
      description: true,
      hostedBy: true,
      image: true,
      date: true,
    },
    data: {
      name: `${req.body.name}`,
      hostedBy: `${req.body.hostedBy}`,
      description: `${req.body.description}`,
      price: req.body.price,
    },
  });

  return res.status(200).json(event);
};

export default handler;
