'use client'

import { AspectRatio } from '@pocemonz/components/ui/aspect-ratio'
import { Pokemon } from '@pocemonz/data/model/pokemon'
import { Species } from '@pocemonz/data/model/species'
import { cn } from '@pocemonz/util/tw'
import { PropsWithClassName } from '@pocemonz/util/types'
import Image from 'next/image'

interface PokemonProfileProps {
  pokemon: Pokemon
  species: Species
}

export const PokemonProfile = ({
  pokemon,
  species,
  className
}: PropsWithClassName<PokemonProfileProps>) => {
  const romanji = species.names[0]?.name
  const description = species.flavor_text_entries[0]?.flavor_text?.replace('\f', ' ')
  const sprite =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other['official-artwork'].front_default ||
    '/pocemonz.svg'

  return (
    <section
      className={cn(
        'relative mx-auto mt-16 flex w-full max-w-screen-xl flex-col gap-4 px-4 sm:flex-row',
        className
      )}>
      <div
        className='fixed left-0 top-0 h-screen w-screen -scale-x-100 opacity-50 blur-2xl dark:blur-3xl'
        style={{
          background: `url("${sprite}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      <h1 className='absolute right-0 top-0 mb-1 mr-4 scroll-m-20 text-4xl font-extrabold tracking-tight text-white first-letter:capitalize sm:text-5xl md:text-6xl lg:text-9xl'>
        {romanji}
      </h1>
      <div className='flex-1'>
        <AspectRatio ratio={1 / 1}>
          <Image src={sprite} alt={pokemon.name} fill className='h-full w-full animate-wiggle' />
        </AspectRatio>
      </div>
      <div className='relative flex flex-1 flex-col items-center justify-end gap-1 text-white sm:items-start'>
        <span className='text-3xl text-white/80 sm:text-4xl md:text-5xl lg:text-7xl'>
          #{String(pokemon.id).padStart(4, '0')}
        </span>
        <h1 className='mb-1 scroll-m-20 text-4xl font-extrabold tracking-tight first-letter:capitalize sm:text-5xl md:text-6xl lg:text-8xl'>
          {pokemon.name}
        </h1>
        <div className='flex gap-2'>
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className='rounded-md bg-white/20 px-2 py-1 text-xs font-semibold text-white first-letter:capitalize'>
              {type.name}
            </span>
          ))}
        </div>
        <span>{description}</span>
      </div>
    </section>
  )
}
