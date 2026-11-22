import { z } from 'zod'

export const contactResponseSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  type: z.enum(['cliente', 'proveedor', 'personal']),
})

export const contactsResponseSchema = z.array(contactResponseSchema)
