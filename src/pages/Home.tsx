import TaskSheet from '@/components/Home/task-sheet'
import Sidebar from '@/components/Home/Sidebar'
import Filter from '@/components/shared/Filter'
import Sort from '@/components/shared/sort'
import Task from '@/components/shared/Task'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import React, { useState } from 'react'

const Home: React.FC = () => {
  const [open, setOpen] = useState(true)
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
                <Sort />
                <Filter />
                {/* Sort by: [ Title A-Z | Title Z-A | Due Date | Priority | Created Date ]

Filter:
- [x] Status: [✅ Completed, 🚧 In Progress, 🚫 Not Started, ❗ Overdue]
- [x] Priority: [⬆ High, ➖ Medium, ⬇ Low]
- [x] Due Date: [Today, This Week, This Month, Overdue, No Due Date] */}

              </div>
            </div>
            {Array.from({ length: 20 }).map((_, idx) => (
              <Task key={idx} idx={idx} />
            ))}
          </div>
        </section>
      </ScrollArea>
    </main>
  )
}

export default Home
