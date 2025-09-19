'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Features",
      path: "/"
    },
    {
      id: 2,
      name: "Patients",
      path: "/explore"
    },
    {
      id: 3,
      name: "Integrations",
      path: "/contact-us"
    }
  ]


  const { user } = useKindeBrowserClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("user", user);
  }, [user])


  return (
    <div className='sticky top-0 z-50 bg-white flex items-center justify-between p-4 '> {/*shadow-sm*/}
      <div className='flex items-center gap-10 '>
        {/* logoipsum.com */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={50}
            height={30}
            className="cursor-pointer"
          />
        </Link>

        <ul className='md:flex gap-8 hidden '>
          {Menu.map((item, index) => {
            return (
              <Link href={item.path} key={index}>
                <li className='hover:text-blue-500 cursor-pointer hover:scale-105 transition-all ease-in-out' key={index}>
                  {item.name}
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      {/* by kinde.com */}
      {user ?
        <>

          {/* popover is from shadcnui.com */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <Image
                src={user?.picture}
                alt='profile-image'
                width={40}
                height={40}
                className='rounded-full cursor-pointer'
              />
            </PopoverTrigger>
            <PopoverContent className='w-44'>
              <ul className='flex flex-col gap-2' onClick={() => setOpen(false)}>
                <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                  <Image src='/user.png' alt='profile' height={20} width={20} className='inline mr-2' />
                  Profile
                </li>
                <Link href={'/my-booking'} className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                  <Image src='/appointment.png' alt='my-booking' height={20} width={20} className='inline mr-2' />
                  My Booking
                </Link>
                <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>
                  <Image src='/quit.png' alt='logout' height={20} width={20} className='inline mr-2' />
                  <LogoutLink>
                    Log Out
                  </LogoutLink>
                </li>
              </ul>
            </PopoverContent>
          </Popover>

        </>

        :

        <LoginLink>
          <Button className="bg-blue-700 hover:bg-blue-600 hover:cursor-pointer text-white">Login</Button>
        </LoginLink>
      }
    </div>
  )
}

export default Header