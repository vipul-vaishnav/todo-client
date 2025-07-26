import TaskSheet from '@/components/Home/task-sheet'
import Sidebar from '@/components/Home/Sidebar'
import Filter from '@/components/shared/Filter'
import Sort from '@/components/shared/Sort'
// import Task from '@/components/shared/Task'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import React, { useState } from 'react'
import type { CustomBadgeProps } from '@/components/shared/custom-badge'

export type SortCriteria = {
  type: 'title' | 'due-date' | 'priority' | 'comments'
  sortType: 'low-to-high' | 'high-to-low'
}

export type TFilter =
  | {
      key: 'priority'
      is: boolean
      value: CustomBadgeProps['priority']
    }
  | {
      key: 'status'
      is: boolean
      value: 'completed' | 'in-progress' | 'yet-to-start'
    }
  | {
      key: 'due-date'
      is: boolean
      value: 'today' | 'this-week' | 'this-month' | 'other'
    }

const Home: React.FC = () => {
  const [open, setOpen] = useState(true)
  const [sortCriteria, setSortCriteria] = useState<SortCriteria | null>(null)
  const [matches, setMatches] = useState<'all' | 'any'>('all')
  const [filters, setFilters] = useState<Array<TFilter>>([])

  const notes = []

  return (
    <main className="flex h-dvh bg-background text-foreground transition-all duration-350 ease-in-out overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} />
      <ScrollArea className="w-full">
        <header className="border-b h-16 sticky top-0 z-50 bg-background transition-all duration-350 ease-in-out px-4 py-6">
          <button className="cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? <PanelLeftClose /> : <PanelLeftOpen />}
          </button>
        </header>
        <section className="max-w-screen-lg mx-auto">
          <div className="p-4">
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">All Tasks</h2>
          </div>
          <div className="space-y-2 px-4 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <TaskSheet mode="new" />
              <div className="space-x-2">
                <Sort setSortCriteria={setSortCriteria} sortCriteria={sortCriteria} />
                <Filter filters={filters} setFilters={setFilters} matches={matches} setMatches={setMatches} />
              </div>
            </div>
          </div>
          {notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img src="/void.svg" alt="empty" className="block w-[264px] mx-auto" />

              <div className="text-center mt-8">
                <h6 className="font-bold text-xl mb-4">🗒️ Looks like there’s nothing to show</h6>
                <p className="text-muted-foreground">
                  Click <strong>“New Task” </strong>to create your first task and get started!
                </p>
              </div>
            </div>
          ) : (
            <>Notes</>
          )}
        </section>
      </ScrollArea>
    </main>
  )
}

export default Home
