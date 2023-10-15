'use client'

import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Variants, motion } from 'framer-motion'
import Link from 'next/link'

import { AnimatableImage } from '@pocemonz/components/ui/animatable-element'
import { cn, getPokemonColorClassName } from '@pocemonz/util/tw'
import { memo } from 'react'

interface PokemonCardProps {
  id: number
  name: string
  sprite: string
  types: string[]
  className?: string
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 5,
      stiffness: 20
    }
  }
}

export const PokemonCard = memo(({ id, name, sprite, types, className }: PokemonCardProps) => {
  return (
    <motion.div layoutId={name} initial='hidden' whileInView='show' variants={itemVariants}>
      <Link
        href={`/pokemon/${name}`}
        className={cn(
          'relative flex cursor-pointer select-none flex-col gap-4 rounded-2xl px-8 py-4 transition-all duration-300 hover:scale-95 active:scale-95',
          className
        )}>
        <div
          className={cn(
            'absolute bottom-0 left-0 -z-10 flex h-[85%] w-full justify-end overflow-hidden rounded-2xl p-4 shadow-2xl transition-all',
            getPokemonColorClassName(types)
          )}
        />
        <img
          src='/endless-constellation.svg'
          className='absolute bottom-0 left-0 -z-10 flex h-[85%] w-full justify-end overflow-hidden rounded-2xl opacity-30 shadow-2xl transition-all'
        />
        <AspectRatio ratio={1}>
          <AnimatableImage
            src={sprite}
            alt={name}
            fill
            className='drop-shadow-2xl transition-all delay-200 duration-300 hover:scale-125 hover:delay-0'
            layoutId={`sprite-${id}`}
          />
        </AspectRatio>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-lg font-semibold capitalize text-white'>
            {name.replace('-', ' ')}
          </span>
          <div className='flex gap-2'>
            {types.map((type) => (
              <span
                key={type}
                className='rounded-md bg-white/20 px-2 py-1 text-xs font-semibold text-white first-letter:capitalize'>
                {type}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
})

PokemonCard.displayName = 'PokemonCard'
