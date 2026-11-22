import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

describe('ContactForm', () => {
  it('muestra los errores al enviar el formulario vacío', async () => {
    const user = userEvent.setup()
    render(
      <ContactForm
        onSubmit={vi.fn()}
        isPending={false}
        isSuccess={false}
        error={null}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Añadir contacto' }))

    expect(screen.getByText('El nombre debe tener al menos 2 caracteres.')).toBeInTheDocument()
    expect(screen.getByText('Introduce un correo electrónico válido.')).toBeInTheDocument()
    expect(screen.getByText('Introduce un teléfono válido.')).toBeInTheDocument()
  })

  it('envía un contacto válido', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <ContactForm
        onSubmit={onSubmit}
        isPending={false}
        isSuccess={false}
        error={null}
      />,
    )

    await user.type(screen.getByLabelText('Nombre'), 'Ana García')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@example.com')
    await user.type(screen.getByLabelText('Teléfono'), '612345678')
    await user.click(screen.getByRole('button', { name: 'Añadir contacto' }))

    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: 'Ana García',
        email: 'ana@example.com',
        phone: '612345678',
        type: 'cliente',
      },
      expect.any(Object),
    )
  })
})
