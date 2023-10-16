import { PokemonList } from '@pocemonz/components/pokemon-list'
import { AnimatableMain } from '@pocemonz/components/ui/animatable-element'
import { getPokemons } from '@pocemonz/data/pokemon-api'

interface DashboardPageProps {
  searchParams: {
    page?: string
  }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const page = parseInt(searchParams.page || '1') || 1
  const pokemons = await getPokemons(page, 16)

  return (
    <AnimatableMain
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5
      }}
      className='mt-14'>
      <img
        src='/pocemonz.svg'
        className='fixed top-0 -z-40 h-screen w-screen scale-150 blur-2xl md:-left-[400px]'
      />
      <PokemonList pokemons={pokemons} />
    </AnimatableMain>
  )
}
