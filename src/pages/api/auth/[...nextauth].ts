import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: "test",

  callbacks: {
    async session({ session, user }) {
      if(!session.user) return Promise.resolve(session);
      const userDb = await prisma.user.findUniqueOrThrow({
        where: {
          id: `${user.id}`,
        },
      });
      session.user.id = user.id as string;
      session.user.admin = userDb.admin as boolean;
      // session.user.tickets = userDb.tickets
      return Promise.resolve(session);
    },
  },
  
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: `${credentials.email}`,
          },
        });
        console.log(user)
        if (user?.password) {
          if (user.password == credentials.password) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
