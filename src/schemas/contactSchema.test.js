import { describe, expect, it } from 'vitest'
import { contactSchema } from './contactSchema'

const validContact = {
  name: 'Ana García',
  email: 'ana@example.com',
  phone: '612345678',
  type: 'cliente',
}

describe('contactSchema', () => {
  it('rechaza un formulario vacío', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: '',
      phone: '',
      type: '',
    })

    expect(result.success).toBe(false)
  })

  it('rechaza un correo electrónico inválido', () => {
    const result = contactSchema.safeParse({
      ...validContact,
      email: 'correo-invalido',
    })

    expect(result.success).toBe(false)
  })

  it('acepta un contacto válido', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true)
  })
})
