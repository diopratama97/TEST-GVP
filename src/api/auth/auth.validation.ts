import { ZodType, z } from 'zod';

export class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    client_id: z.string(),
    client_secret: z.string(),
  });
}
