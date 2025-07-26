import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ChevronDownIcon, Edit, Plus } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { Calendar } from '../ui/calendar'

type SheetProps = {
  mode: 'edit' | 'new'
}

const AddNewTaskSheet: React.FC<SheetProps> = (props) => {
  const { mode } = props
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [priority, setPriority] = useState('')

  useEffect(() => {}, [])

  return (
    <Sheet>
      <SheetTrigger asChild>
        {mode === 'new' ? (
          <Button className="cursor-pointer">
            <Plus size={20} /> New Task
          </Button>
        ) : (
          <Button className="cursor-pointer" variant={'secondary'} size={'icon'}>
            <Edit />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{mode === 'edit' ? 'Edit' : 'Add New'} Task</SheetTitle>
          <SheetDescription>
            {mode === 'edit'
              ? 'Modify your task details below. Click Save to apply changes.'
              : 'Fill in the task information below. Click Save to add it to your list.'}
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} id="sheet-demo-name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Description</Label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} id="sheet-demo-username" />
          </div>
          <Select value={priority} onValueChange={(x) => setPriority(x)}>
            <Label htmlFor="priority" className="px-1">
              Priority
            </Label>
            <SelectTrigger className="w-full -mt-3">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent id="priority">
              <SelectGroup>
                <SelectLabel>Priorities</SelectLabel>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                {mode === 'edit' && <SelectItem value="blocked">Blocked</SelectItem>}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              Due Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" id="date" className="w-full justify-between font-normal">
                  {date ? date.toLocaleDateString() : 'Select date'}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto border rounded-md overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date)
                    setOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">{mode === 'edit' ? 'Save Changes' : 'Create Task'} </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AddNewTaskSheet
