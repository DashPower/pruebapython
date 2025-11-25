import { useState } from 'react'

export default function TaskEdit({ task, onUpdated }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    completed: task.completed,
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Error ${res.status}: ${msg}`)
      }

      const updated = await res.json()
      setSuccess(true)
      onUpdated?.(updated)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>Editar tarea</h3>

      <label style={styles.label}>Título:</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        style={styles.input}
      />

      <label style={styles.label}>Descripción:</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        style={styles.textarea}
      />

      <label style={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
        />
        Completada
      </label>

      <button type="submit" style={styles.button}>Actualizar</button>

      {success && <p style={styles.success}>Tarea actualizada correctamente ✅</p>}
      {error && <p style={styles.error}>{error}</p>}
    </form>
  )
}

const styles = {
  form: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fefefe',
  },
  heading: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginTop: '1rem',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.5rem',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '0.5rem',
    marginTop: '0.5rem',
    boxSizing: 'border-box',
  },
  checkboxLabel: {
    display: 'block',
    marginTop: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    marginTop: '1rem',
    color: 'green',
  },
  error: {
    marginTop: '1rem',
    color: 'red',
  },
}
