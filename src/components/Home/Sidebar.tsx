import React from 'react'
import { motion } from 'motion/react'
import { ModeToggle } from '../mode-toggle'
import { Separator } from '../ui/separator'
import { Archive, BookmarkCheck, Info, LayoutDashboard, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import { useTheme } from '@/hooks/useTheme'

type SidebarProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const { theme, toggle } = useTheme()
  return (
    <motion.div
      layoutId="sidebar"
      initial={{ width: 60 }}
      animate={{
        width: open ? 240 : 60,
        transition: {
          width: { type: 'spring', stiffness: 300, damping: 30 }
        }
      }}
    >
      <aside
        className="w-full border-r transition-all duration-350 ease-in-out flex flex-col justify-between h-full overflow-y-auto overflow-x-hidden"
        style={{
          paddingInline: open ? 24 : 8,
          paddingBlock: 24,
          transition: 'padding 0.3s cubic-bezier(.4,0,.2,1)'
        }}
      >
        <div>
          <h1
            className={`scroll-m-20 text-2xl font-bold tracking-tight flex items-center gap-2 pb-2 ${
              !open && 'justify-center'
            }`}
          >
            <BookmarkCheck />
            <span
              className={`transition-all duration-350 ease-in-out ${
                open ? 'opacity-100 ml-2' : 'opacity-0 ml-0 w-0 overflow-hidden'
              }`}
            >
              ZenTask.
            </span>
          </h1>
          <Separator orientation="horizontal" />
          <ul className="pt-2 mt-6 space-y-3">
            {[
              { icon: <LayoutDashboard size={19} />, label: 'Dashboard', to: '/' },
              { icon: <Archive size={19} />, label: 'Archived', to: '/' },
              { icon: <Info size={19} />, label: 'About', to: '/' }
            ].map((item, idx) => (
              <li key={idx}>
                <Link to={item.to} className={`flex items-center gap-2 ${!open && 'justify-center'}`}>
                  {item.icon}
                  <span
                    className={`transition-all duration-350 ease-in-out ${
                      open ? 'opacity-100 ml-2' : 'opacity-0 ml-0 w-0 overflow-hidden'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {open ? (
            <ModeToggle />
          ) : (
            <Button onClick={toggle}>{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}</Button>
          )}
        </div>
      </aside>
    </motion.div>
  )
}

export default Sidebar
