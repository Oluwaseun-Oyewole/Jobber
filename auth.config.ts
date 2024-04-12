import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { getUserByEmail } from "./lib/query";
import { loginValidationSchema } from "./lib/schema/login";

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      redirectProxyUrl: "http://localhost:3000",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "profile email openid",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      issuer: "https://www.linkedin.com",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
      },
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
      },
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
          if (!user) return null;
          if (!user?.password) return null;
          else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) return null;
            else return user;
          }
        } catch (error) {
          return null;
          // throw new Error(error as string);
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
