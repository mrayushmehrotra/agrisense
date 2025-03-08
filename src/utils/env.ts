// TODO: use zod for better type safety in env variables for future,
import { z } from "zod";
const envSchema = z.object({
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  MONGODB_URI: z.string().url(),
  OPENWEATHER_API: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Environment variable validation failed:", env.error.format());
  throw new Error("Invalid environment variables");
}

export default env.data;
