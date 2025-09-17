"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import GlobalApi from './_utils/GlobalApi'
import Image from 'next/image'
import Link from 'next/link'

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList()
  }, [])

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    })
  }

  return (
    <div className='mb-10 items-center flex flex-col gap-2'>
      <h2 className='font-bold text-3xl mx-5 tracking-wide'>
        Search <span className='text-blue-700'>Doctors</span>
      </h2>
      <h2 className='text-gray-500 text-xl'>Search Doctor and Book Appointment in one click</h2>

      <div className="flex w-full max-w-sm items-center gap-2 mt-3">

        <Input type="text" placeholder="Search..." />
        <Button className='bg-blue-700 hover:bg-blue-600 hover:text-white hover:cursor-pointer text-white ' type="submit" variant="outline">
          <Search className='h-4 w-4 mr-2' />{/* lucide icon */}
          Search
        </Button>
      </div>

      {/* Display List of Categories */}
      <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 '>

        {categoryList.length > 0 ? categoryList
          .filter((_, index) => index < 6)
          .map((item, index) => (
            <Link
              href={'/search/'+(item.attributes?.Name).toLowerCase().replace(/\s+/g, '-')}
              key={index}
              className="flex flex-col text-center items-center p-5 bg-blue-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer"
            >
              <Image
                src={item.attributes?.Icon?.data?.attributes?.url}
                alt="Category Image"
                width={50}
                height={50}
              />
              <label className="text-black-600 text-sm">
                {item.attributes?.Name}
              </label>
            </Link>
          ))
          :[1, 2, 3, 4, 5, 6].map((item , index)=>{
          return(

            <div key={index} className='h-[120px] w-[120px] m-2 bg-slate-200 rounded-lg animate-pulse'>
              {/* Skalton effect (loader) */}
            </div>

        )
        })
        
        }

      </div>
    </div>
  )
}

export default CategorySearch