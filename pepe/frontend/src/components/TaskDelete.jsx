export default function TaskDelete({ taskId, onDeleted }) {
  const handleDelete = async () => {
    const confirm = window.confirm('¿Seguro que quieres eliminar esta tarea?')
    if (!confirm) return

    try {
      const res = await fetch(`http://localhost:8000/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Error ${res.status}: ${msg}`)
      }

      // Notificamos al padre que la tarea fue eliminada
      onDeleted?.(taskId)
    } catch (err) {
      alert(`No se pudo eliminar la tarea: ${err.message}`)
    }
  }

  return (
    <button style={styles.deleteButton} onClick={handleDelete}>
      Eliminar
    </button>
  )
}

const styles = {
  deleteButton: {
    marginLeft: '0.5rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
