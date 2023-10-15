import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getPokemonColorClassName = (types: string[]) => {
  switch (types[0]?.toLowerCase()) {
    case 'fighting':
      return 'bg-red-400 dark:bg-red-500'
    case 'flying':
      return 'bg-sky-400 dark:bg-sky-500'
    case 'poison':
      return 'bg-purple-400 dark:bg-purple-500'
    case 'ground':
      return 'bg-yellow-400 dark:bg-yellow-500'
    case 'rock':
      return 'bg-gray-400 dark:bg-gray-500'
    case 'bug':
      return 'bg-lime-400 dark:bg-lime-500'
    case 'ghost':
      return 'bg-indigo-400 dark:bg-indigo-500'
    case 'steel':
      return 'bg-gray-400 dark:bg-gray-500'
    case 'fire':
      return 'bg-orange-400 dark:bg-orange-500'
    case 'water':
      return 'bg-blue-400 dark:bg-blue-500'
    case 'grass':
      return 'bg-green-400 dark:bg-green-500'
    case 'electric':
      return 'bg-yellow-400 dark:bg-yellow-500'
    case 'psychic':
      return 'bg-pink-400 dark:bg-pink-500'
    case 'ice':
      return 'bg-cyan-400 dark:bg-cyan-500'
    case 'dragon':
      return 'bg-fuchsia-400 dark:bg-fuchsia-500'
    case 'dark':
      return 'bg-black dark:bg-black'
    case 'fairy':
      return 'bg-rose-400 dark:bg-rose-500'
    case 'shadow':
      return 'bg-gray-400 dark:bg-gray-500'
    default:
      return 'bg-slate-400 dark:bg-slate-500'
  }
}
