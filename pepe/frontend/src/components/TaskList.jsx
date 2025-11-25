import TaskDelete from './TaskDelete'

export default function TaskList({ tasks, setEditingTask, onDeleted }) {
  return (
    <ul style={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} style={styles.item}>
          <h3 style={styles.taskTitle}>
            {task.completed ? '✅' : '🕒'} {task.title}
          </h3>
          <p style={styles.description}>{task.description}</p>
          <button
            style={styles.editButton}
            onClick={() => setEditingTask(task)}
          >
            Editar
          </button>
          <TaskDelete taskId={task.id} onDeleted={onDeleted} />
        </li>
      ))}
    </ul>
  )
}

const styles = {
  list: { listStyle: 'none', padding: 0 },
  item: {
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  taskTitle: { margin: 0, fontSize: '1.2rem' },
  description: { marginTop: '0.5rem', color: '#555' },
  editButton: {
    marginTop: '0.5rem',
    padding: '0.3rem 0.6rem',
    backgroundColor: '#ffc107',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}
