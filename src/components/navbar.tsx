'use client'

import { motion } from 'framer-motion'
import { Moon as MoonIcon, SearchNormal as SearchIcon, Sun1 as SunIcon } from 'iconsax-react'
import { GithubIcon, Loader2Icon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { Button } from '@pocemonz/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@pocemonz/components/ui/dropdown-menu'
import { searchPokemon } from '@pocemonz/data/pokemon-api'
import { useDebounce, useOutsideClick } from '@pocemonz/util/hooks'
import { cn } from '@pocemonz/util/tw'
import { PropsWithClassName } from '@pocemonz/util/types'
import { useQuery } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

const useSearchPokemons = ({ query }: { query: string }) => {
  return useQuery({
    queryKey: [`search-pokemon-${query}`, query],
    queryFn: () => searchPokemon(query),
    enabled: query.length !== 0,
    select(results) {
      return results.map((result) => ({
        ...result,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`
      }))
    }
  })
}

export const Navbar = ({ className }: PropsWithClassName) => {
  const { setTheme } = useTheme()
  const pathName = usePathname()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 250)
  const { data, isLoading, isFetching } = useSearchPokemons({ query: debouncedQuery })
  const slicedData = useMemo(() => data?.slice(0, 10) || [], [data])
  const [searchBoxVisible, setSearchBoxVisible] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchBoxRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useOutsideClick([searchInputRef, searchBoxRef], () => {
    setSearchBoxVisible(false)
  })

  useEffect(() => {
    setSearchBoxVisible(false)
  }, [pathname, searchParams])

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
        <div className='flex w-full max-w-xs items-center gap-4'>
          <label htmlFor='search' className='sr-only'>
            Search pokemons
          </label>
          <div className='relative w-full shadow-2xl'>
            <input
              id='search'
              ref={searchInputRef}
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              className='w-full rounded-2xl bg-accent px-4 py-2 text-sm antialiased outline-none'
              placeholder='Search pokemons'
              onFocus={() => setSearchBoxVisible(true)}
            />
            <AnimatePresence>
              {searchBoxVisible && !!debouncedQuery.length && (
                <div
                  className='absolute mt-4 w-full gap-4 rounded-2xl bg-background p-4'
                  ref={searchBoxRef}>
                  {slicedData.map(({ id, name, sprite }) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='flex cursor-pointer items-center gap-4 rounded-2xl p-2 transition-all hover:bg-accent'>
                      <Link className='text-sm capitalize' href={`/pokemon/${name}`}>
                        <Image
                          width={40}
                          height={40}
                          src={sprite}
                          alt={name}
                          className='rounded-full'
                        />
                      </Link>
                      <Link className='text-sm capitalize' href={`/pokemon/${name}`}>
                        {name}
                      </Link>
                    </motion.div>
                  ))}
                  {!slicedData.length && debouncedQuery.length !== 0 && (
                    <span className='p-4 text-sm'>No result found</span>
                  )}
                  <div className='flex items-center justify-center'>
                    {(isFetching || isLoading) && <Loader2Icon className='animate-spin' />}
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
          <Button variant='ghost' size='icon' className='shrink-0 rounded-full bg-background/20'>
            <SearchIcon className='h-[1.2rem] w-[1.2rem]' />
          </Button>
        </div>
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
