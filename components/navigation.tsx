'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Map, BarChart3, Info } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'หน้าแรก', icon: Home },
    { href: '/map', label: 'แผนที่', icon: Map },
    { href: '/dashboard', label: 'แดชบอร์ด', icon: BarChart3 },
    { href: '/about', label: 'เกี่ยวกับ', icon: Info },
  ]
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🌾</span>
            </div>
            <span className="text-xl font-bold text-gray-800">
              RiceBurn <span className="text-emerald-600">Insight</span>
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
