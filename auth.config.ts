import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail } from "./lib/query";
import { loginValidationSchema } from "./lib/schema/login";
// import LinkedInProvider from "next-auth/providers/linkedin"

export default {
  providers: [
    GithubProvider({
      profile(profile) {
        return {
          ...profile,
          name: profile?.name ?? "",
          role: profile.role ?? "",
          employmentType: profile.employmentType ?? "",
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        const validatedSchema = loginValidationSchema.safeParse(credentials);
        if (!validatedSchema.success) {
          throw new Error("Incorrect form fields");
        }
        const { email, password } = credentials;
        const user = await getUserByEmail(email);
        try {
          if (!user) {
            return null;
            // throw new Error("User not found");
          }
          if (!user?.password) {
            return null;
            // throw new Error("Invalid credentials");
          }
          if (!user?.emailVerified) {
            return null;
          } else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return null;
            else {
              return user;
            }
          }
        } catch (error) {
          return null;
          // throw new Error(error as string);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
