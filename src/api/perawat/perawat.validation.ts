import { ZodType, z } from 'zod';

export class PerawatValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string().min(7).max(13),
    poli_name: z.string(),
    poli_address: z.string(),
  });
}
