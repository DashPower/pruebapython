import { useState } from 'react'

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    completed: false,
  })
  const [error, setError] = useState(null)

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

    try {
      const res = await fetch('http://localhost:8000/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Error ${res.status}: ${msg}`)
      }

      const created = await res.json()
      onTaskCreated?.(created)
      setForm({ title: '', description: '', completed: false })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Crear nueva tarea</h2>

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

      <button type="submit" style={styles.button}>Crear tarea</button>

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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    marginTop: '1rem',
    color: 'red',
  },
}
