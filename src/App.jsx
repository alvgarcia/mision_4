import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ContactForm } from './components/ContactForm'
import { ContactList } from './components/ContactList'
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

        <ContactList query={contactsQuery} />
      </div>
    </main>
  )
}

export default App
