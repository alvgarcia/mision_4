import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ContactForm } from './components/ContactForm'
import { createContact, fetchContacts } from './services/contactsService'
import './App.css'

function App() {
  const queryClient = useQueryClient()

  const contactsQuery = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  })

  const createMutation = useMutation({
    mutationFn: createContact,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['contacts'] })
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
          <ContactForm
            onSubmit={(contact, options) =>
              createMutation.mutate(contact, {
                onSuccess: options.onSuccess,
              })
            }
            isPending={createMutation.isPending}
            isSuccess={createMutation.isSuccess}
            error={createMutation.error}
          />
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
