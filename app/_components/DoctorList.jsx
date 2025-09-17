import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DoctorList = ({ doctorList , heading='Popular Doctors'}) => {
  return (
    <div className='mb-10 px-8'>
      <h2 className='font-bold text-xl'>
        {heading}
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4'>

        {doctorList.length > 0 ? doctorList.map((doctor, index) => {
          return (
            <div key={index} className='border-[1px] rounded-lg p-3 cursor-pointer hover:border-blue-800 hover:shadow-lg transition-all ease-in-out '>
              <Image src={doctor.attributes?.image?.data?.attributes?.url}
                alt='doctor'
                width={500}
                height={500}
                className='h-[200px] w-full object-cover rounded-lg '
              />
              <div className='mt-3 items-baseline flex flex-col gap-2'>
                <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-blue-800 '>{doctor.attributes?.categories.data[0].attributes.Name}</h2>
                <h2 className='font-bold'>{doctor.attributes.Name}</h2>
                <h2 className='text-blue-800 text-sm'>{doctor.attributes?.Year_of_Experience}</h2>
                <h2 className='text-gray-500'>{doctor.attributes?.Address}</h2>
                <Link href={'/details/' + doctor.id} className='w-full'>
                <h2 className='p-2 px-3 border-[1px] border-blue-800 text-blue-800 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-blue-800 hover:text-white'>Book Now</h2>
                </Link>
              </div>
            </div>
          )
        })
          :
          [1, 2, 3, 4, 5, 6, 7, 8].map((item , index)=>{
          return(

            <div key={index} className='h-[220px] bg-slate-200 w-full rounded-lg animate-pulse'>
              {/* Skalton effect (loader) */}
            </div>

        )
        })

      }
      </div>
    </div>
  )
}

export default DoctorList