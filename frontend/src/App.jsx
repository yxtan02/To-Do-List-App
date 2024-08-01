import { useState } from 'react'
import './App.css'
import InputTodo from './components/InputTodo.jsx'
import ListTodos from './components/ListTodos.jsx'

function App() {
  return (
    <>
      <InputTodo />
      <ListTodos />
    </>
  )
}

export default App
