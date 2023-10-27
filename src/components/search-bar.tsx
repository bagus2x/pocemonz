'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchNormal as SearchIcon } from 'iconsax-react'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@pocemonz/components/ui/button'
import { searchPokemon } from '@pocemonz/data/pokemon-api'
import { useDebounce, useOutsideClick } from '@pocemonz/util/hooks'

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

export const SearchBar = () => {
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

  useOutsideClick([searchInputRef, searchBoxRef], () => {
    setSearchBoxVisible(false)
  })

  useEffect(() => {
    setSearchBoxVisible(false)
  }, [pathname, searchParams])

  return (
    <div className='flex w-full max-w-xs items-center gap-4'>
      <label htmlFor='search' className='sr-only'>
        Search pokemons
      </label>
      <div className='relative w-full rounded-2xl shadow-2xl'>
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
  )
}

export const SearchBarFallback = () => {
  return (
    <div className='flex w-full max-w-xs items-center gap-4'>
      <label htmlFor='search' className='sr-only'>
        Search pokemons
      </label>
      <div className='relative w-full rounded-2xl shadow-2xl'>
        <div className='w-full rounded-2xl bg-accent px-4 py-2 text-sm antialiased outline-none'>
          <span className='opacity-0'>Search bar</span>
        </div>
      </div>
      <Button variant='ghost' size='icon' className='shrink-0 rounded-full bg-background/20'>
        <SearchIcon className='h-[1.2rem] w-[1.2rem]' />
      </Button>
    </div>
  )
}
