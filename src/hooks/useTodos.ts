'use client'

import { useState, useEffect, useCallback } from 'react'
import { Todo, Priority, Category } from '@/types'
import { getTodos, saveTodos } from '@/lib/storage'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function persist(updater: (prev: Todo[]) => Todo[]): (prev: Todo[]) => Todo[] {
  return (prev) => {
    const updated = updater(prev)
    saveTodos(updated)
    return updated
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    setTodos(getTodos())
  }, [])

  const addTodo = useCallback(
    (title: string, priority: Priority, category: Category, dueDate?: string) => {
      const todo: Todo = {
        id: generateId(),
        title,
        completed: false,
        priority,
        category,
        dueDate,
        createdAt: new Date().toISOString(),
      }
      setTodos(persist((prev) => [todo, ...prev]))
    },
    []
  )

  const toggleTodo = useCallback((id: string) => {
    setTodos(persist((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))))
  }, [])

  const updateTodo = useCallback(
    (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
      setTodos(persist((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t))))
    },
    []
  )

  const deleteTodo = useCallback((id: string) => {
    setTodos(persist((prev) => prev.filter((t) => t.id !== id)))
  }, [])

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo }
}
