export function ContactList({ query }) {
  return (
    <section className="panel" aria-labelledby="list-title" aria-busy={query.isFetching}>
      <div className="list-heading">
        <h2 id="list-title">Tus contactos</h2>
        {query.data && <span aria-label={`${query.data.length} contactos`}>{query.data.length}</span>}
      </div>

      {query.isLoading && (
        <p className="status" role="status">
          Cargando contactos...
        </p>
      )}

      {query.isError && (
        <div className="status error-state" role="alert">
          <p>{query.error.message}</p>
          <button type="button" onClick={() => query.refetch()}>
            Reintentar
          </button>
        </div>
      )}

      {query.isSuccess && query.data.length === 0 && (
        <p className="status">Aún no hay contactos.</p>
      )}

      {query.isSuccess && query.data.length > 0 && (
        <ul className="contact-list">
          {query.data.map((contact) => (
            <li key={contact.id}>
              <div className="avatar" aria-hidden="true">
                {contact.name.charAt(0).toUpperCase()}
              </div>
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
  )
}
