'use client'

import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// 导航链接配置
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Labs', href: '/dashboard/labs', icon: BeakerIcon },
]

export default function NavLinks() {
  const pathname = usePathname()

  // 检查当前路径是否匹配链接
  const isActive = (href: string) => {
    // 完全匹配
    if (pathname === href) return true

    // labs 特殊处理：任何 labs 子路径都应该高亮 labs 链接
    if (href === '/labs' && pathname.startsWith('/labs/')) return true

    // dashboard 相关路径处理
    if (href === '/dashboard' && pathname === '/dashboard') return true

    // 其他路径的子路径匹配
    if (href !== '/dashboard' && pathname.startsWith(href)) return true

    return false
  }

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': isActive(link.href),
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
