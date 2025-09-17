'use client'
import GlobalApi from '@/app/_components/_utils/GlobalApi';
import React, { useEffect, useState } from 'react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);

    const params = usePathname();
    const categoryName = params.split("/")[2];
  
    useEffect(() => {
      getCategoryList()
    }, [])
  
    const getCategoryList = () => {
      GlobalApi.getCategory().then((res) => {
        setCategoryList(res.data.data);
      })
    }

  return (
    // shadcnui.com command component
   <div className="h-screen mt-5 flex flex-col mb-8 w-full">
  <Command className="rounded-lg  w-full">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList className="overflow-visible">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions" >
          {categoryList&&categoryList.map((item,index)=>{
            return(
              
              <CommandItem key={index}>
                <Link href={'/search/'+(item?.attributes?.Name).toLowerCase().replace(/\s+/g, '-')}
                className={`p-2 flex gap-2 text-[16px] text-blue-600 items-center rounded-md cursor-pointer w-full${categoryName===item.attributes.Name.toLowerCase().replace(/\s+/g, '-')?' bg-blue-100 ':''}`}
                >
                  <Image src={item.attributes?.Icon?.data.attributes?.url}
                  alt='Icon'
                  height={25}
                  width={25}
                  />
                  <label className='cursor-pointer'>{item.attributes.Name}</label>
                </Link>
              </CommandItem>
            )
          })}

        </CommandGroup>
        <CommandSeparator />
       
      </CommandList>
    </Command>
    </div>
  )
}

export default CategoryList