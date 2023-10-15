'use client'

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { color } from 'chart.js/helpers'
import { Radar, Line, Bar } from 'react-chartjs-2'
import colors from 'tailwindcss/colors'

import { Pokemon } from '@pocemonz/data/model/pokemon'
import { PropsWithClassName } from '@pocemonz/util/types'
import { cn } from '@pocemonz/util/tw'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@pocemonz/components/ui/table'
import { Species } from '@pocemonz/data/model/species'
import { Progress } from '@pocemonz/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link'

interface PokemonStatProps {
  pokemon: Pokemon
  species: Species
}

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
)

export const PokemonStat = ({
  pokemon,
  species,
  className
}: PropsWithClassName<PokemonStatProps>) => {
  const varieties = species.varieties.filter((variety) => variety.pokemon.name !== pokemon.name)

  return (
    <section
      className={cn(
        'z-0 mx-auto mb-8 grid w-full max-w-screen-xl grid-cols-1 flex-col gap-4 rounded-2xl bg-background/5 p-4 dark:bg-background/20 md:grid-cols-2',
        className
      )}>
      <div>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-white transition-colors first:mt-0'>
          # Basic Info
        </h2>
        <Table>
          <TableBody>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Species</TableHead>
              <TableCell className='capitalize text-white'>{pokemon.species.name}</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Color</TableHead>
              <TableCell className='capitalize text-white'>{species.color.name}</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Height</TableHead>
              <TableCell className='text-white'>{pokemon.height / 10} m</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Weight</TableHead>
              <TableCell className='text-white'>{pokemon.weight / 10} kg</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Abilities</TableHead>
              <TableCell className='capitalize text-white'>
                {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}{' '}
              </TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Shape</TableHead>
              <TableCell className='capitalize text-white'>
                {species.shape ? species.shape.name : '-'}
              </TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Growth Rate</TableHead>
              <TableCell className='capitalize text-white'>{species.growth_rate.name}</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Base Experience</TableHead>
              <TableCell className='text-white'>{pokemon.base_experience}</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Base Happiness</TableHead>
              <TableCell className='text-white'>{species.base_happiness}</TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Gender Rate</TableHead>
              <TableCell className='text-white'>
                <div className='relative flex items-center gap-4'>
                  <Progress
                    value={((species.gender_rate === -1 ? 0 : species.gender_rate) / 8) * 100}
                  />
                  <span className='absolute left-4 top-0 text-xs'>{species.gender_rate}</span>
                </div>
                <span className='mt-2 inline-block text-xs'>
                  The chance of this Pokémon being female, in eighths or -1 for genderless
                </span>
              </TableCell>
            </TableRow>
            <TableRow className='border-white/40'>
              <TableHead className='font-bold text-white'>Capture Rate</TableHead>
              <TableCell className='text-white'>
                <div className='relative flex items-center gap-4'>
                  <Progress value={(species.capture_rate / 255) * 100} />
                  <span className='absolute left-4 top-0 text-xs'>{species.capture_rate}</span>
                </div>
                <span className='mt-2 inline-block text-xs'>
                  The base capture rate up to 255. The higher the number, the easier the catch.
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='flex flex-col'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-white transition-colors first:mt-0'>
          # Skills
        </h2>
        <Radar
          options={{
            responsive: true,
            scales: {
              r: {
                grid: {
                  color: 'white',
                  circular: true
                },
                pointLabels: {
                  color: 'white',
                  font: {
                    size: 12
                  },
                  padding: 16
                },
                ticks: {
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }}
          data={{
            labels: pokemon.stats.map(({ stat }) => stat.name.toUpperCase().replace('-', ' ')),
            datasets: [
              {
                data: pokemon.stats.map(({ base_stat }) => base_stat),
                label: pokemon.name,
                backgroundColor: color(colors.red[500]).alpha(0.2).rgbString(),
                borderColor: color(colors.red[500]).alpha(0.8).rgbString(),
                lineTension: 0.5
              } as any
            ]
          }}
        />
      </div>
      <div className='md:col-span-2'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight text-white transition-colors first:mt-0'>
          # Varieties
        </h2>
        <div className='mt-2 flex flex-wrap gap-4'>
          {varieties.map((variety) => (
            <Link
              key={variety.pokemon.name}
              href={`/pokemon/${variety.pokemon.name}`}
              className='flex flex-col items-center gap-4'>
              <Image
                width={50}
                height={50}
                src={
                  variety.pokemon.url
                    .replace(
                      'https://pokeapi.co/api/v2/pokemon/',
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
                    )
                    .slice(0, -1) + '.png'
                }
                alt={variety.pokemon.name}
                className='transition-all hover:scale-125'
              />
              <span className='text-xs capitalize text-white'>
                {variety.pokemon.name.replace('-', ' ')}
              </span>
            </Link>
          ))}
          {varieties.length === 0 && (
            <span className='text-xs text-white'>
              This entry doesn&apos;t have another varieties
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
