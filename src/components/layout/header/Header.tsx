import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import React, { FC } from 'react'
import SearchFriend from './Search/SearchFriend';

const Header:FC = () => {

  const signOut = () => {
    getAuth().signOut()
  }

  return (
    <div className='my-4 py-8 px-4 text-grey h-12 bg-second flex items-center rounded-xl'>
      <Link href={'/'}>Home</Link>
      <SearchFriend/>
      <nav className='mr-4'>
        <ul className='flex gap-4'>
          <Link href={'message'}>Message</Link>
          <li className='cursor-pointer'>Settings</li>
          <li className='cursor-pointer'>Profile</li>
        </ul>
      </nav>
      <button onClick={() => signOut()} className='bg-accentColor px-6 rounded-lg cursor-pointer py-2'>Log Out</button>
    </div>
  )
}

export default Header;