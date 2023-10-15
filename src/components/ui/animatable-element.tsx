'use client'

import { HTMLMotionProps, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const AnimatableMain = (props: PropsWithChildren<HTMLMotionProps<'main'>>) => {
  return <motion.main {...props} />
}

export const AnimatableImage = motion(Image)

export const AnimatableDiv = (props: PropsWithChildren<HTMLMotionProps<'div'>>) => {
  return <motion.div {...props} />
}

export const AnimatableLink = motion(Link)
