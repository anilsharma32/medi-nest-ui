'use client'
import React, { useEffect, useState, use } from 'react'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import DoctorDetails from '../_components/DoctorDetails'
import DoctorSuggestionList from '../_components/DoctorSuggestionList'

const Details = ({ params }) => {
  const { recordid } = use(params)   

  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    getDoctorByCategory()
  }, [])

  const getDoctorByCategory = () => {
    GlobalApi.getDoctorById(recordid).then((res) => {
      setDoctor(res.data.data)
    })
  }

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Doctor Details */}
        <div className="md:col-span-3">
          {doctor && <DoctorDetails doctor={doctor} />}
        </div>

        {/* Doctor suggestion */}
        <div className="md:col-span-1">
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  )
}

export default Details
