'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, CheckSquare, Moon, BarChart2 } from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/todos', label: 'Tâches', icon: CheckSquare },
  { href: '/sleep', label: 'Sommeil', icon: Moon },
  { href: '/stats', label: 'Stats', icon: BarChart2 },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col w-56 min-h-screen bg-[#111111] border-r border-[#333333] py-6 px-3 fixed left-0 top-0">
        <div className="mb-8 px-3">
          <h1 className="text-white font-bold text-lg tracking-tight">Productivité</h1>
          <p className="text-[#AAAAAA] text-xs mt-0.5">Suivi personnel</p>
        </div>
        <div className="flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#AAAAAA] hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111] border-t border-[#333333] flex">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
                active ? 'text-[#2563EB]' : 'text-[#AAAAAA]'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
