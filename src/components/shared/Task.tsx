import { Calendar, Check, MessageCircle, MessageCirclePlus, Trash } from 'lucide-react'
import React from 'react'
import CustomBadge from './custom-badge'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import TaskSheet from '../Home/task-sheet'
import CustomDialog from './custom-dialog'
import { DialogFooter } from '../ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

type TaskProps = {
  idx: number
}

const Task: React.FC<TaskProps> = ({ idx }) => {
  return (
    <div
      key={idx}
      className={`transition-all duration-350 ease-in-out bg-accent/20 flex items-start gap-3 rounded-lg border p-5 ${
        idx % 2 === 0 ? 'border-primary bg-primary-foreground/60 dark:border-primary/50 dark:bg-accent/70' : 'border'
      }`}
    >
      <Checkbox defaultChecked />
      <div className="grid gap-1.5 font-normal space-y-1.5">
        <p className="leading-none font-medium">Enable notifications</p>
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <Calendar size={18} />7 Jan 2025
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <MessageCircle size={18} />
            22
          </p>
        </div>
        <CustomBadge priority="low" />
        <p className="text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores sapiente delectus quis quos officiis vitae
          quasi porro animi minima temporibus molestiae debitis repudiandae nihil, perspiciatis repellendus voluptate
          illo et ea, quaerat sed ut dolor quod est hic! Adipisci, corrupti? Autem consectetur officiis cupiditate?
          Fuga, architecto. Beatae nisi exercitationem ducimus ipsam!
        </p>
        <div className="space-x-2">
          <Button className="cursor-pointer" variant={'secondary'} size={'icon'}>
            <Check />
          </Button>
          <CustomDialog
            ButtonTrigger={
              <Button className="cursor-pointer" variant={'secondary'} size={'icon'}>
                <MessageCirclePlus />
              </Button>
            }
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Add a comment</h4>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => {}}>Add Comment</Button>
            </DialogFooter>
          </CustomDialog>
          <TaskSheet mode="edit" />
          <CustomDialog
            ButtonTrigger={
              <Button className="cursor-pointer" variant={'destructive'} size={'icon'}>
                <Trash />
              </Button>
            }
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Are you sure you want to delete the task
            </h4>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => {}} variant={'destructive'}>
                Delete
              </Button>
            </DialogFooter>
          </CustomDialog>
        </div>
      </div>
    </div>
  )
}
export default Task
