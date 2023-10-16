import { cache } from 'react'

import { Page } from '@pocemonz/data/model/page'
import { Pokemon } from '@pocemonz/data/model/pokemon'

export const searchPokemon = async (query: string) => {
  const { items: pokemons } = await getPokemonNames(1, 13000)
  return pokemons.filter((pokemon) => pokemon.name.includes(query))
}

export const getPokemonNames = cache(
  async (page: number, size: number): Promise<Page<{ id: number; name: string }>> => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * size}&limit=${size}`
    )
    if (!res.ok) {
      throw new Error(await res.text())
    }

    const { count, next, results } = (await res.json()) as {
      count: number
      next: string | null
      results: { name: string; url: string }[]
    }

    const nextUrl = next ? new URL(next) : null
    const nextPage = nextUrl
      ? parseInt(new URLSearchParams(nextUrl.search).get('offset')!!) / size + 1
      : page + 1

    return {
      total: count,
      size: size,
      next: nextPage,
      items:
        results.map((result) => ({
          id: parseInt(
            result.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')
          ),
          name: result.name
        })) || []
    }
  }
)

export const getPokemons = cache(async (page: number, size: number): Promise<Page<Pokemon>> => {
  const { items: names, ...res } = await getPokemonNames(page, size)

  const pokemons = await Promise.all(names.map(({ name }) => getPokemon(name)))

  return {
    ...res,
    items: pokemons
  }
})

export const getPokemon = cache(async (name: string): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!res.ok) {
    throw new Error(await res.text())
  }

  return await res.json()
})
