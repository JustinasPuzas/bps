import { RequestHandler } from "next/dist/server/next";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { env } from "../../../env/server.mjs";

const handler: RequestHandler = async (req: any, res: any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "PUT") return res.status(405).end();
  if (!session?.user)
    return res.status(401).json({ error: "Please login first" }).end();
  // if (!req.body.name)
  //   return res
  //     .status(400)
  //     .json({ error: "Please enter name on the card" })
  //     .end();
  // if (!req.body.surname)
  //   return res
  //     .status(400)
  //     .json({ error: "Please enter surname on the card" })
  //     .end();
  // if (!req.body.cardNumber)
  //   return res.status(400).json({ error: "Please enter Card Number" }).end();
  // if (!req.body.cardExpiry)
  //   return res.status(400).json({ error: "Please enter expiry date" }).end();
  // if (!req.body.cardCvc)
  //   return res.status(400).json({ error: "Please enter cvc" }).end();
  if (!req.body.eventId) return res.status(500).json({ error: "Server Error" });
  // if (req.body.cardNumber.length !== 16)
  //   return res
  //     .status(400)
  //     .json({ error: "Please enter valid card number" })
  //     .end();

  const event = await prisma.event.findUnique({
    where: {
      id: req.body.eventId,
    },
  });

  await prisma.expenses.create({
    data: {
      name: event!.name,
      amount: event!.price,
      type: "income",
    },
  });

  console.log(`User ${session.user.email} purchased ${event!.name}`);
  const user = await prisma.user.update({
    select: {
      id: true,
      tickets: true,
    },
    where: {
      id: session.user.id,
    },
    data: {
      tickets: {
        create: {
          name: event!.name,
          price: event!.price,
          eventId: event!.id,
        },
      },
    },
  });

  return res
    .status(200)
    .json({
      ...user.tickets[user.tickets.length - 1],
      link: `${env.NEXTAUTH_URL}/ticket/${user?.tickets[user.tickets.length - 1]?.id}`,
    });
};

export default handler;
