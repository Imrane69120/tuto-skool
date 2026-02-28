'use client'

import { useState } from 'react'
import { useTodos } from '@/hooks/useTodos'
import { TodoItem } from '@/components/todo/TodoItem'
import { TodoForm } from '@/components/todo/TodoForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Todo, Priority, Category } from '@/types'
import { Plus } from 'lucide-react'

type Filter = 'all' | 'active' | 'completed'

export default function TodosPage() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos()
  const [addOpen, setAddOpen] = useState(false)
  const [editTodo, setEditTodo] = useState<Todo | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all')

  const filtered = todos.filter((t) => {
    if (filter === 'active' && t.completed) return false
    if (filter === 'completed' && !t.completed) return false
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length

  function handleAdd(title: string, priority: Priority, category: Category, dueDate?: string) {
    addTodo(title, priority, category, dueDate)
    setAddOpen(false)
  }

  function handleEdit(title: string, priority: Priority, category: Category, dueDate?: string) {
    if (!editTodo) return
    updateTodo(editTodo.id, { title, priority, category, dueDate })
    setEditTodo(null)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tâches</h1>
          <p className="text-[#AAAAAA] text-sm mt-1">{activeCount} tâche{activeCount !== 1 ? 's' : ''} en cours</p>
        </div>
        <Button onClick={() => setAddOpen(true)} size="sm">
          <Plus size={14} /> Ajouter
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
              filter === f
                ? 'bg-white text-black font-medium'
                : 'border border-[#333333] text-[#AAAAAA] hover:text-white'
            }`}
          >
            {f === 'all' ? 'Toutes' : f === 'active' ? 'En cours' : 'Terminées'}
          </button>
        ))}
        <div className="ml-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
            className="bg-[#111111] border border-[#333333] text-[#AAAAAA] text-xs rounded-md px-2 py-1.5 focus:outline-none"
          >
            <option value="all">Toutes priorités</option>
            <option value="high">Haute</option>
            <option value="medium">Moyenne</option>
            <option value="low">Basse</option>
          </select>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="text-center py-10">
          <p className="text-[#AAAAAA] mb-4">
            {todos.length === 0 ? 'Aucune tâche pour l\'instant' : 'Aucune tâche ne correspond aux filtres'}
          </p>
          {todos.length === 0 && (
            <Button onClick={() => setAddOpen(true)}>
              <Plus size={16} /> Créer ma première tâche
            </Button>
          )}
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onEdit={setEditTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Nouvelle tâche">
        <TodoForm
          onSave={handleAdd}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>

      <Modal open={!!editTodo} onClose={() => setEditTodo(null)} title="Modifier la tâche">
        {editTodo && (
          <TodoForm
            initial={editTodo}
            onSave={handleEdit}
            onCancel={() => setEditTodo(null)}
          />
        )}
      </Modal>
    </div>
  )
}
