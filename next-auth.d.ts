import { UserType } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserType | undefined;
  jobs: any;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserType;
  }
}
