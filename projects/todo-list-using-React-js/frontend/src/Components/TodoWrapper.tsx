import { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { TodoItem } from '../interfaces'
console.log("Environement =>", process.env.REACT_APP_API_URL)
const API_BASE =process.env.REACT_APP_API_URL + '/todos';
console.log("api base =>", API_BASE)
function TodoWrapper () {
  const [listItems, setListItems] = useState<TodoItem[]>([])
  const [currentItem, setCurrentItem] = useState<TodoItem>(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  // Fetch todos from backend
  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setListItems(data.todos)
        setTotalPages(data.totalPages || 1)
      })
      .catch(() => setListItems([]))
      .finally(() => setLoading(false))
  }, [page, limit])

  // Add new todo or update description
  const addUpdateItemToList = async (description: string) => {
    setLoading(true)
    if (currentItem?._id) {
      // Update description
      const res = await fetch(`${API_BASE}/${currentItem._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })
      if (res.ok) {
        const updated = await res.json()
        setListItems(listItems.map(item => item._id === updated._id ? updated : item))
        setCurrentItem(null)
      }
    } else {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      })
      if (res.ok) {
        const newTodo = await res.json()
        setListItems([newTodo, ...listItems])
      }
    }
    setLoading(false)
  }

  // Mark as completed/uncompleted
  const markItemAsCompleted = async (event, todo: TodoItem) => {
    if (event.target.classList.contains('todo-item') || event.target.classList.contains('completed') || event.target.classList.contains('un-completed')) {
      const userConsent = window.confirm(`Are you sure you want to Mark this item as ${todo.isCompleted ? "Un Completed" : "Completed"} ?`)
      if (userConsent) {
        setLoading(true)
        const res = await fetch(`${API_BASE}/${todo._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isCompleted: !todo.isCompleted })
        })
        if (res.ok) {
          const updated = await res.json()
          setListItems(listItems.map(item => item._id === updated._id ? updated : item))
        }
        setLoading(false)
      }
    }
  }

  // Edit (just sets currentItem for form)
  const handleEditClick = (todoItem:TodoItem) => {
    setCurrentItem(todoItem)
  }

  // Delete (calls backend and updates UI)
  const handleDeleteClick = async (todoItem: TodoItem) => {
    const confirmation:boolean = window.confirm("Are you sure you want to delete this Item")
    if (confirmation) {
      setLoading(true)
      const res = await fetch(`${API_BASE}/${todoItem._id}`, { method: 'DELETE' })
      if (res.ok) {
        setListItems(listItems.filter(item => item._id !== todoItem._id))
        setCurrentItem(null)
      }
      setLoading(false)
    }
  }

  return (
    <div className="todo-wrapper">
      <h1>Add your Tasks</h1>
      {loading && <div style={{textAlign:'center',margin:'20px'}}>Loading...</div>}
      <TodoForm addUpdateItemToList={addUpdateItemToList} currentItem={currentItem} />
      {!loading && listItems.map((todo, index) =>
      (
        <div onClick={e => markItemAsCompleted(e, todo)} className="todo-item" key={todo._id || index}>
          <p className={`${todo.isCompleted ? 'completed' : "un-completed"}`} >{todo.description}</p>
          <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={e => handleEditClick(todo)} />
            <FontAwesomeIcon onClick={(e) => handleDeleteClick(todo)} icon={faTrash} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1 || loading}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages || loading}>Next</button>
      </div>
    </div>
  );
}

export default TodoWrapper