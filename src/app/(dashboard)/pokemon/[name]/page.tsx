import { Metadata } from 'next'

import { PokemonProfile } from '@pocemonz/components/pokemon-profile'
import { PokemonStat } from '@pocemonz/components/pokemon-stat'
import { AnimatableMain } from '@pocemonz/components/ui/animatable-element'
import { getPokemon, getPokemonNames } from '@pocemonz/data/pokemon-api'
import { getSpecies } from '@pocemonz/data/species-api'
import { cn, getPokemonColorClassName } from '@pocemonz/util/tw'

interface PokemonDetailPageProps {
  params: {
    name: string
  }
}

export const generateMetadata = async ({ params }: PokemonDetailPageProps): Promise<Metadata> => {
  const pokemon = await getPokemon(params.name)
  const species = await getSpecies(pokemon)

  return {
    title: `${pokemon.name} | Pocemonz`,
    description: species.flavor_text_entries[0]?.flavor_text
  }
}

export async function generateStaticParams() {
  const { items: pokemonNames } = await getPokemonNames(0, 1400)

  return pokemonNames.map((name) => ({ name }))
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const pokemon = await getPokemon(params.name)
  const species = await getSpecies(pokemon)

  return (
    <AnimatableMain
      layoutId={pokemon.name}
      className={cn(
        'flex min-h-screen w-full flex-col items-stretch gap-16 overflow-x-hidden',
        getPokemonColorClassName(pokemon.types.map(({ type }) => type.name)),
        'dark:bg-background'
      )}>
      <PokemonProfile pokemon={pokemon} species={species} />
      <PokemonStat pokemon={pokemon} species={species} />
    </AnimatableMain>
  )
}
