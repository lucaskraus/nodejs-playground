import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string(),
});

const { error, data } = envSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid environment variables', error.message);
  process.exit(1);
}

export const env = data;