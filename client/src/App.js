import React, { useEffect } from 'react'
import TodoList from "./Todo/TodoList"
import Context from './context'
import Loader from "./Loader/Loader";

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

function App() {
    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetch('http://localhost:3003/todosApi')
            .then(response => response.json())
            .then(todo => {
                setTodos(todo)
                setLoading(false)
            })
    }, [])

    function toggleTodo(id) {
        setTodos(todos.map(todo => {
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {
        setTodos(
            todos.concat([
                {
                    title: title,
                    id: Date.now(),
                    completed: false
                }
            ])
        )
    }

    return (
        <Context.Provider value={{ removeTodo }}>
            <div className="wrapper">
                <h1>ReactJS</h1>
                <React.Suspense fallback={<Loader/>}>
                    <AddTodo onCreate={addTodo} />
                </React.Suspense>
                
                {loading && <Loader />}
                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo} />
                ) : loading ? null : (
                    <p>No todo's</p>
                )}
            </div>
        </Context.Provider>
    )
}

export default App
