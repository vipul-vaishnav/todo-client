import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowDownUp } from 'lucide-react'

const Sort = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer" variant={'outline'} size={'lg'}>
          <ArrowDownUp /> Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2"></div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Sort
