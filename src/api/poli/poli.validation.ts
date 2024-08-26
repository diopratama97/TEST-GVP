import { ZodType, z } from 'zod';

export class PoliValidation {
  static readonly CREATE: ZodType = z.object({
    resourceType: z.string(),
    identifier: z.array(
      z.object({
        system: z.string(),
        value: z.string(),
      }),
    ),
    status: z.string(),
    name: z.string(),
    description: z.string(),
    mode: z.string(),
    telecom: z.array(
      z.object({
        system: z.string(),
        value: z.string(),
        use: z.string(),
      }),
    ),
    physicalType: z.object({
      coding: z.array(
        z.object({
          system: z.string(),
          code: z.string(),
          display: z.string(),
        }),
      ),
    }),
    position: z.object({
      longitude: z.number().negative(),
      latitude: z.number().positive(),
      altitude: z.number(),
    }),
    managingOrganization: z.object({
      reference: z.string(),
    }),
  });
}
