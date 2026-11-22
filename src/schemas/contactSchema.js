import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(60, 'El nombre no puede superar 60 caracteres.'),
  email: z
    .string()
    .trim()
    .email('Introduce un correo electrónico válido.')
    .max(100, 'El correo no puede superar 100 caracteres.'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9\s+()-]{6,20}$/, 'Introduce un teléfono válido.'),
  type: z.enum(['cliente', 'proveedor', 'personal'], {
    error: 'Selecciona un tipo de contacto.',
  }),
})
