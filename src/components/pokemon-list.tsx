'use client'

import { PokemonCard } from '@pocemonz/components/pokemon-card'
import { Page } from '@pocemonz/data/model/page'
import { Pokemon } from '@pocemonz/data/model/pokemon'
import { getPokemons } from '@pocemonz/data/pokemon-api'
import { useQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ReactPaginate from 'react-paginate'

interface PokemonListProps {
  pokemons: Page<Pokemon>
}

const usePokemons = ({ initial, currentPage }: { initial: Page<Pokemon>; currentPage: number }) => {
  return useQuery({
    queryKey: ['pokemons', currentPage, initial.size],
    queryFn: () => getPokemons(currentPage, initial.size),
    initialData: initial
  })
}

export const PokemonList = ({ pokemons }: PokemonListProps) => {
  const searchParams = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1') || 1
  const { data, isLoading, isFetching } = usePokemons({ initial: pokemons, currentPage })
  const router = useRouter()
  const pathname = usePathname()

  const handlePageChange = ({ selected }: { selected: number }) => {
    const urlSearchParams = new URLSearchParams(searchParams)
    urlSearchParams.set('page', `${selected + 1}`)
    router.push(`${pathname}?${urlSearchParams.toString()}`)
  }

  return (
    <section className='mx-auto grid max-w-screen-xl grid-cols-2 gap-8 p-4 md:grid-cols-3 lg:grid-cols-4'>
      {data?.items?.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          sprite={
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.other['official-artwork'].front_default
          }
          types={pokemon.types.map(({ type }) => type.name)}
        />
      ))}
      <div className='col-span-2 flex items-center justify-center md:col-span-3 lg:col-span-4'>
        <ReactPaginate
          className='flex flex-wrap'
          previousLinkClassName='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-accent-foreground bg-accent border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 bg-accent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          pageLinkClassName='flex items-center justify-center px-3 h-8 leading-tight text-accent-foreground bg-accent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-accent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          breakLinkClassName='flex items-center justify-center px-3 h-8 leading-tight text-accent-foreground bg-accent border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-accent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          nextLinkClassName='flex items-center justify-center px-3 h-8 leading-tight text-accent-foreground bg-accent border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 bg-accent dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          activeLinkClassName='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-200 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-500 dark:text-white'
          disableInitialCallback={isLoading || isFetching}
          breakLabel='...'
          nextLabel='>'
          previousLabel='<'
          pageRangeDisplayed={3}
          pageCount={Math.ceil(pokemons.total / pokemons.size)}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
        />
      </div>
      {isFetching && (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
          <Loader2Icon className='animate-spin' />
        </div>
      )}
    </section>
  )
}
