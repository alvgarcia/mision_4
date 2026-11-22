import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactList } from './ContactList'

describe('ContactList', () => {
  it('muestra el estado de carga', () => {
    render(<ContactList query={{ isLoading: true, isFetching: true }} />)
    expect(screen.getByText('Cargando contactos...')).toBeInTheDocument()
  })

  it('muestra el error y permite reintentar', async () => {
    const user = userEvent.setup()
    const refetch = vi.fn()
    render(
      <ContactList
        query={{
          isError: true,
          isFetching: false,
          error: new Error('No se pudo cargar la agenda.'),
          refetch,
        }}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo cargar la agenda.')
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(refetch).toHaveBeenCalledOnce()
  })

  it('muestra la lista vacía', () => {
    render(
      <ContactList
        query={{ isSuccess: true, isFetching: false, data: [] }}
      />,
    )
    expect(screen.getByText('Aún no hay contactos.')).toBeInTheDocument()
  })

  it('muestra los contactos recibidos', () => {
    render(
      <ContactList
        query={{
          isSuccess: true,
          isFetching: false,
          data: [{
            id: '1',
            name: 'Ana García',
            email: 'ana@example.com',
            phone: '612345678',
            type: 'cliente',
          }],
        }}
      />,
    )

    expect(screen.getByText('Ana García')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ana@example.com' })).toBeInTheDocument()
  })
})
