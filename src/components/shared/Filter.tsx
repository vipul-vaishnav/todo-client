import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import type { TFilter } from '@/pages/Home'
import { Funnel } from 'lucide-react'

const filterOptions: Array<{ key: TFilter['key']; label: string; values: Array<TFilter['value']> }> = [
  {
    key: 'status',
    label: 'Status',
    values: ['completed', 'blocked', 'in-progress', 'yet-to-start']
  },
  {
    key: 'priority',
    label: 'Priority',
    values: ['low', 'medium', 'high', 'critical']
  },
  {
    key: 'due-date',
    label: 'Due Date',
    values: ['today', 'this-week', 'this-month', 'other']
  }
]

type FProps = {
  matches: 'all' | 'any'
  setMatches: React.Dispatch<React.SetStateAction<'all' | 'any'>>
  filters: TFilter[]
  setFilters: React.Dispatch<React.SetStateAction<TFilter[]>>
}

type Props = {
  filter: (typeof filterOptions)[number]
  filters: TFilter[]
  setFilters: React.Dispatch<React.SetStateAction<TFilter[]>>
}

const FilterOptionRow: React.FC<Props> = (props) => {
  const { filter, filters, setFilters } = props

  const selectedFilter = filters.find((x) => x.key === filter.key)

  return (
    <li className="flex items-center gap-2">
      <p className="capitalize text-sm font-semibold">{filter.label.replace('-', ' ')}</p>
      <Select
        value={selectedFilter ? (selectedFilter.is ? 'is' : 'is-not') : 'is'}
        onValueChange={(x) => {
          return setFilters((prev) => {
            if (selectedFilter) {
              return prev.map((item) => (item.key === filter.key ? ({ ...item, is: x === 'is' } as TFilter) : item))
            } else {
              return [
                ...prev,
                {
                  key: filter.key,
                  is: x === 'is',
                  value: filter.values[0] // default value
                } as TFilter
              ]
            }
          })
        }}
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="is">is</SelectItem>
            <SelectItem value="is-not">is not</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={selectedFilter ? selectedFilter.value : ''}
        onValueChange={(x) => {
          return setFilters((prev) => {
            if (selectedFilter) {
              if (x === 'none') {
                return prev.filter((item) => item.key !== filter.key)
              } else return prev.map((item) => (item.key === filter.key ? ({ ...item, value: x } as TFilter) : item))
            } else {
              return [
                ...prev,
                {
                  key: filter.key,
                  is: true,
                  value: filter.values[0] // default value
                } as TFilter
              ]
            }
          })
        }}
      >
        <SelectTrigger className="w-40 capitalize">
          <SelectValue placeholder="Select Value" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={'none'} value={'none'} className="capitalize">
              None
            </SelectItem>
            {filter.values.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </li>
  )
}

const Filter: React.FC<FProps> = (props) => {
  const { matches, setMatches, filters, setFilters } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer" variant={'outline'} size={'lg'}>
          <Funnel /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Filter By</h4>

          <div className="flex items-center gap-3">
            <p>Match</p>
            <Select
              value={matches}
              onValueChange={(x) => {
                setMatches(x as 'all' | 'any')
              }}
            >
              <SelectTrigger>
                <SelectValue defaultValue={'all'} />
              </SelectTrigger>
              <SelectContent id="matches">
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="any">Any</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p>of the following filters:</p>
          </div>
        </div>

        <ul className="space-y-3.5 mt-3">
          {filterOptions.map((item) => (
            <FilterOptionRow filter={item} key={item.key} filters={filters} setFilters={setFilters} />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export default Filter
