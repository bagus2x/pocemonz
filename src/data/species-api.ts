import { cache } from 'react'

import { Pokemon } from '@pocemonz/data/model/pokemon'
import { Species } from '@pocemonz/data/model/species'

export const getSpecies = cache(async (pokemon: Pokemon): Promise<Species> => {
  const res = await fetch(pokemon.species.url)
  if (!res.ok) {
    throw new Error(await res.text())
  }

  return await res.json()
})
