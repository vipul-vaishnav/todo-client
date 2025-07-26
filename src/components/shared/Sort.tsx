import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { SortCriteria } from '@/pages/Home'
import { ArrowDownAZIcon, ArrowDownUp, ArrowUpAZIcon } from 'lucide-react'

type SProps = {
  sortCriteria: SortCriteria | null
  setSortCriteria: React.Dispatch<React.SetStateAction<SortCriteria | null>>
}

const SORT_CRITERIA: Array<{ label: string; range: string; key: SortCriteria['type'] }> = [
  {
    label: 'Title',
    range: 'A–Z / Z–A',
    key: 'title'
  },
  {
    label: 'Priority',
    range: 'Low to High / High to Low',
    key: 'priority'
  },
  {
    label: 'Comments',
    range: 'Fewest to Most / Most to Fewest',
    key: 'comments'
  },
  {
    label: 'Due Date',
    range: 'Soonest to Latest / Latest to Soonest',
    key: 'due-date'
  }
]

const Sort: React.FC<SProps> = (props) => {
  const { sortCriteria, setSortCriteria } = props
  const handleSort = (criteria: (typeof SORT_CRITERIA)[number]) => {
    const { key } = criteria

    if (sortCriteria?.type === key) {
      if (sortCriteria.sortType === 'low-to-high') {
        setSortCriteria({ type: key, sortType: 'high-to-low' })
      } else {
        setSortCriteria(null)
      }
    } else {
      setSortCriteria({ type: key, sortType: 'low-to-high' })
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer" variant={'outline'} size={'lg'}>
          <ArrowDownUp /> Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-88">
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Sort By</h4>
          <ul className="flex flex-col gap-2 items-start">
            {SORT_CRITERIA.map((criteria, index) => (
              <li key={index} className="w-full">
                <button
                  onClick={() => handleSort(criteria)}
                  className={`w-full py-2 px-1.5 rounded-md flex items-center justify-between cursor-pointer ${
                    sortCriteria?.type === criteria.key ? 'bg-primary/10' : ''
                  }`}
                >
                  <p className="text-left">
                    {criteria.label} <span className="text-muted-foreground text-xs">({criteria.range})</span>
                  </p>
                  {sortCriteria?.type === criteria.key &&
                    (sortCriteria.sortType === 'low-to-high' ? (
                      <ArrowDownAZIcon size={16} />
                    ) : (
                      <ArrowUpAZIcon size={16} />
                    ))}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Sort
