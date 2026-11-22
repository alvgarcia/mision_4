import {
  contactResponseSchema,
  contactsResponseSchema,
} from '../schemas/contactResponseSchema'

export async function fetchContacts() {
  const response = await fetch('/api/contacts')
  if (!response.ok) throw new Error('No se pudo cargar la agenda.')

  const data = await response.json()
  const result = contactsResponseSchema.safeParse(data)
  if (!result.success) {
    throw new Error('La API devolvió datos de contactos inválidos.')
  }
  return result.data
}

export async function createContact(contact) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  })
  if (!response.ok) throw new Error('No se pudo guardar el contacto.')

  const data = await response.json()
  const result = contactResponseSchema.safeParse(data)
  if (!result.success) {
    throw new Error('La API devolvió un contacto inválido.')
  }
  return result.data
}
