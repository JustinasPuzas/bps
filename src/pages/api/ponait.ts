import { RequestHandler } from "next/dist/server/next";
import { unstable_getServerSession } from "next-auth/next";

const handler: RequestHandler = async (req: any, res:any) => {
  if (req.method !== "GET") return res.status(405).json({kek: "lol"}).end();
  
  return res.status(200).json({message: "ok"});
};

export default handler;
