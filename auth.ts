import prisma from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
// import { getUserById } from "./lib/query";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  // callbacks: {
  //   async signIn({ user }) {
  //     const existingUser = await getUserById(user?.id as string);
  //     if (!existingUser || !existingUser?.emailVerified) return false;
  //     return true;
  //   },
  // },
});
