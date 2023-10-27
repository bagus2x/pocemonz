'use client'

import { Moon as MoonIcon, Sun1 as SunIcon } from 'iconsax-react'
import { GithubIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'

import { SearchBar, SearchBarFallback } from '@pocemonz/components/search-bar'
import { Button } from '@pocemonz/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@pocemonz/components/ui/dropdown-menu'
import { cn } from '@pocemonz/util/tw'
import { PropsWithClassName } from '@pocemonz/util/types'

export const Navbar = ({ className }: PropsWithClassName) => {
  const { setTheme } = useTheme()
  const pathName = usePathname()

  return (
    <nav
      className={cn(
        'fixed flex h-14 w-full items-center shadow shadow-border backdrop-blur-md transition-all',
        className,
        pathName.startsWith('/pokemon') && 'shadow-none'
      )}>
      <div className='mx-auto flex w-full max-w-screen-xl items-center justify-between gap-3 px-4'>
        <Link href='/'>
          <Image alt='Pocemonz' src='/pocemonz.svg' width={32} height={32} />
        </Link>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
        <div className='flex gap-4'>
          <Button
            variant='ghost'
            size='icon'
            asChild
            className='hidden flex-shrink-0 rounded-full bg-background/20 outline-none sm:flex'>
            <Link href='https://github.com/bagus2x'>
              <GithubIcon size={18} />
              <span className='sr-only'>bagus2x</span>
            </Link>
          </Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='flex-shrink-0 rounded-full bg-background/20 outline-none'>
                <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
