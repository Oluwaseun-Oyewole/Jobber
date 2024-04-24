import { clsx, type ClassValue } from "clsx";
import jwt, { JwtPayload } from "jsonwebtoken";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const verifyJwt = (token: string) => {
  try {
    const secretKey = process.env.NEXTAUTH_SECRET;
    const decode = jwt.verify(token, secretKey!);
    return decode as JwtPayload;
  } catch (error) {
    return null;
  }
};
