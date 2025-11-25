import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskEdit from './components/TaskEdit'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8000/tasks/')
      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`)
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask])
  }

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
    setEditingTask(null)
  }

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  if (loading) return <p>Cargando tareas...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Tareas</h2>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {editingTask && (
        <TaskEdit task={editingTask} onUpdated={handleTaskUpdated} />
      )}

      <TaskList
        tasks={tasks}
        setEditingTask={setEditingTask}
        onDeleted={handleTaskDeleted}
      />
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
}

export default App
