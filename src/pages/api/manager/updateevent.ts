import { RequestHandler } from "next/dist/server/next";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "../../../server/db";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res:any) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method !== "PUT") return res.status(405).end();
  if (!session) return res.status(401).end();
  if (!session.user?.admin) return res.status(403).end();

  let data: any = {};

  if(!req.body.id){
    return res.status(400).json({error: "Event must have an ID"});
  }
    

  if(req.body.email){
    if(!req.body.email.includes("@")) return res.status(400).json({error: "Email must contain @"}).end();
    if(!req.body.email.includes(".")) return res.status(400).json({error: "Email must contain ."}).end();
    data.email = req.body.email;
  }

  if(req.body.name){
    if(req.body.name.length < 3) return res.status(400).json({error: "Name must be at least 3 characters long"}).end()
    data.name = req.body.name;
  }

  if(req.body.location){
    data.location = req.body.location;
  }

  if(req.body.price){
    if(!Number.parseInt(req.body.price)) return res.status(400).json({error: "Price must be a number"}).end();
    data.price = Number.parseInt(req.body.price);
  }

  if(req.body.description){
    if(req.body.description.length < 10) return res.status(400).json({error: "Description must be at least 10 characters long"}).end();
    data.description = req.body.description;
  }

  if(req.body.image){
    data.image = req.body.image;
  }

  if(req.body.public !== undefined){
    console.log("GOT PUBLIC CHANGE")
    data.public = req.body.public;
  }

  if(req.body.hostedBy){
    data.hostedBy = req.body.hostedBy;
  }

  if(!data) return res.status(400).json({error: "No data to update"}).end();


  const updatedEvent = await prisma.event.update({
    select: {
      id: true,
      name: true,
    },
    where: {
      id: `${req.body.id}`,
    },
    data,
  });
  
  return res.status(200).json(updatedEvent);
};

export default handler;
