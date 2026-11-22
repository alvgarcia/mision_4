import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import './App.css'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres.').max(60, 'El nombre no puede superar 60 caracteres.'),
  email: z.string().trim().email('Introduce un correo electrónico válido.').max(100, 'El correo no puede superar 100 caracteres.'),
  phone: z.string().trim().regex(/^[0-9\s+()-]{6,20}$/, 'Introduce un teléfono válido.'),
  type: z.enum(['cliente', 'proveedor', 'personal'], {
    error: 'Selecciona un tipo de contacto.',
  }),
})

const contactResponseSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  type: z.enum(['cliente', 'proveedor', 'personal']),
})

const contactsResponseSchema = z.array(contactResponseSchema)

async function fetchContacts() {
  const response = await fetch('/api/contacts')
  if (!response.ok) throw new Error('No se pudo cargar la agenda.')

  const data = await response.json()
  const result = contactsResponseSchema.safeParse(data)
  if (!result.success) throw new Error('La API devolvió datos de contactos inválidos.')
  return result.data
}

async function createContact(contact) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  })
  if (!response.ok) throw new Error('No se pudo guardar el contacto.')

  const data = await response.json()
  const result = contactResponseSchema.safeParse(data)
  if (!result.success) throw new Error('La API devolvió un contacto inválido.')
  return result.data
}

function App() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', type: 'cliente' },
  })

  const contactsQuery = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  })

  const createMutation = useMutation({
    mutationFn: createContact,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contacts'] })
      reset()
    },
  })

  return (
    <main className="app-shell">
      <header>
        <p className="eyebrow">Misión 4 · React</p>
        <h1>Agenda de contactos</h1>
        <p>Registra personas y consulta tu lista actualizada.</p>
      </header>

      <div className="layout">
        <section className="panel" aria-labelledby="form-title">
          <h2 id="form-title">Nuevo contacto</h2>
          <form onSubmit={handleSubmit((contact) => createMutation.mutate(contact))} noValidate>
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <input id="name" {...register('name')} aria-invalid={Boolean(errors.name)} />
              {errors.name && <span className="error" role="alert">{errors.name.message}</span>}
            </div>

            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
              {errors.email && <span className="error" role="alert">{errors.email.message}</span>}
            </div>

            <div className="field">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" {...register('phone')} aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <span className="error" role="alert">{errors.phone.message}</span>}
            </div>

            <div className="field">
              <label htmlFor="type">Tipo</label>
              <select id="type" {...register('type')} aria-invalid={Boolean(errors.type)}>
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
                <option value="personal">Personal</option>
              </select>
              {errors.type && <span className="error" role="alert">{errors.type.message}</span>}
            </div>

            <button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Guardando...' : 'Añadir contacto'}
            </button>

            {createMutation.isSuccess && <p className="success" role="status">Contacto añadido correctamente.</p>}
            {createMutation.isError && <p className="error" role="alert">{createMutation.error.message}</p>}
          </form>
        </section>

        <section className="panel" aria-labelledby="list-title">
          <div className="list-heading">
            <h2 id="list-title">Tus contactos</h2>
            {contactsQuery.data && <span>{contactsQuery.data.length}</span>}
          </div>

          {contactsQuery.isLoading && <p className="status">Cargando contactos...</p>}
          {contactsQuery.isError && (
            <div className="status error-state" role="alert">
              <p>{contactsQuery.error.message}</p>
              <button type="button" onClick={() => contactsQuery.refetch()}>Reintentar</button>
            </div>
          )}
          {contactsQuery.isSuccess && contactsQuery.data.length === 0 && <p className="status">Aún no hay contactos.</p>}

          {contactsQuery.isSuccess && contactsQuery.data.length > 0 && (
            <ul className="contact-list">
              {contactsQuery.data.map((contact) => (
                <li key={contact.id}>
                  <div className="avatar" aria-hidden="true">{contact.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <strong>{contact.name}</strong>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                  </div>
                  <span className={`tag tag-${contact.type}`}>{contact.type}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
