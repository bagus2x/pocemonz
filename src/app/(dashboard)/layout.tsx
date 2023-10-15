import { PropsWithChildren } from 'react'

import { Navbar } from '@pocemonz/components/navbar'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-full flex-col'>
      <Navbar className='z-10' />
      {children}
    </div>
  )
}
