
import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment'

const DoctorDetails = ({ doctor }) => {
  const socialMediaList=[
    {
      id:1,
      icon:'/assets/twitter.png',
      url:''    
    },
    {
      id:2,
      icon:'/assets/facebook.png',
      url:''
    },
    {
      id:3,
      icon:'/assets/instagram.png',
      url:''
    },
    {
      id:4,
      icon:'/assets/linkedin.png',
      url:''
    }

  ]


  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 rounded-lg mt-5 gap-5 shadow-md'>
      {/* Doctor img */}
      <div >
        <Image
          src={doctor.attributes?.image?.data?.attributes?.url}
          alt='doctor'
          width={200}
          height={200}
          className='rounded-lg h-[280px] w-full object-cover'
        />
      </div>
      {/* Doctor info */}
      <div className='col-span-2 mt-5 md:mt-0 md:ml-10 flex flex-col gap-3 items-baseline'>
        <h2 className='font-bold text-2xl'>{doctor.attributes?.Name}</h2>
        <h2 className='flex gap-2 text-gray-500 text-md'>
          <GraduationCap />
          <span>{doctor.attributes?.Year_of_Experience} of Experience</span>
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500 '>
          <MapPin />
          <span>{doctor.attributes?.Address}</span>
        </h2>
        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-blue-800 '>{doctor.attributes?.categories.data[0].attributes.Name}</h2>
        <div className='flex gap-4 mt-5'>
          {socialMediaList.map((social , index)=>{
            return(
              <Image src={social.icon} 
              alt='social' 
              width={30} 
              height={30} key={index} 
              className='cursor-pointer hover:scale-110 transition-all ease-in-out w-[30px] h-[30px]'
              />
            )
          })}
        </div>

        <BookAppointment doctor={doctor}/>

      </div >
    </div>
      {/* About Doctor */}
        <div className='p-3 border[1px] rounded-lg mt-5 shadow-md'>
        <h2 className='font-bold text-[20px] '>About me</h2>
        <p className='text-gray-600 text-justify mt-2 tracking-wide'>{doctor.attributes?.About}</p>
      </div>
    </>
  )
}

export default DoctorDetails