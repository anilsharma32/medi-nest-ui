import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import GlobalApi from '@/app/_components/_utils/GlobalApi'

const DoctorSuggestionList = () => {
  const [doctorList, setDoctorList] = useState([])

  useEffect(() => {
    getDoctorList()
  }, [])

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((res) => {
      setDoctorList(res.data.data)
    })
  }

  return (
    <div className="p-5 mt-5  md:m-5 border rounded-lg shadow-md w-full md:w-[350px]">
      <h2 className="mb-4 font-bold text-[20px]">Suggestions</h2>
      <div className="flex flex-col gap-3">
        {doctorList.map((doctor, index) => (
          <Link  href={'/details/' + doctor.id}
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
          >
            {/* Doctor Image */}
            <Image
              src={doctor.attributes?.image?.data?.attributes?.url}
              alt={doctor.attributes?.Name}
              width={55}
              height={55}
              className="w-[55px] h-[55px] rounded-full object-cover"
            />

            {/* Doctor Info */}
            <div className="flex flex-col">
              <span className="mt-1 inline-block text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-500 w-fit">
                {doctor.attributes?.categories?.data[0]?.attributes?.Name}
              </span>
              <h3 className="text-sm font-semibold text-gray-800">
                {doctor.attributes?.Name}
              </h3>
              <p className="text-xs text-blue-700">
                {doctor.attributes?.Year_of_Experience} Years
              </p>

            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DoctorSuggestionList
