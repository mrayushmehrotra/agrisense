import { z } from "zod";

// dotenv typechecks by Zod
const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  GEMINI_API_KEY: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  MONGODB_URI: z.string().url(),
});

const env = envSchema.parse(process.env);

export default env;
