import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { contactSchema } from '../schemas/contactSchema'

export function ContactForm({ onSubmit, isPending, isSuccess, error }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      type: 'cliente',
    },
  })

  const submitContact = (contact) => {
    onSubmit(contact, {
      onSuccess: () => reset(),
    })
  }

  return (
    <form onSubmit={handleSubmit(submitContact)} noValidate>
      <div className="field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          autoComplete="name"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        {errors.name && (
          <span id="name-error" className="error" role="alert">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <span id="email-error" className="error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="phone">Teléfono</label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={Boolean(errors.phone)}
          {...register('phone')}
        />
        {errors.phone && (
          <span id="phone-error" className="error" role="alert">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="type">Tipo</label>
        <select
          id="type"
          aria-describedby={errors.type ? 'type-error' : undefined}
          aria-invalid={Boolean(errors.type)}
          {...register('type')}
        >
          <option value="cliente">Cliente</option>
          <option value="proveedor">Proveedor</option>
          <option value="personal">Personal</option>
        </select>
        {errors.type && (
          <span id="type-error" className="error" role="alert">
            {errors.type.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Guardando...' : 'Añadir contacto'}
      </button>

      {isSuccess && (
        <p className="success" role="status">
          Contacto añadido correctamente.
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error.message}
        </p>
      )}
    </form>
  )
}
