import { z } from "zod";

export const countryByNameValidationSchema = z.object({
  name: z.string(),
  state_code: z.string(),
});
