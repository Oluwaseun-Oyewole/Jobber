import { z } from "zod";

const envSchema = z.object({});
export const parsedEnv = envSchema.parse(process.env);
