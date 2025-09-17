import { Button } from '@/components/ui/button'
import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment/moment'
import Image from 'next/image'
import React from 'react'
import CancelAppointment from './CancelAppointment'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { toast } from 'sonner'

const BookingList = ({bookingList , expired , updateRecord})=> {
  const onDeleteBooking=(item)=>{
    GlobalApi.deleteBooking(item.id).then(resp=>{
      if(resp){
        toast('Booking appointment deleted successfully!');
        updateRecord()
      }
    })
  }
  return (
    <div>
      {bookingList&&bookingList.map((item , index)=>{
        return(
          <div className='flex gap-4 items-center border m-3 p-5 rounded-lg' key={index}>
            <Image src={item.attributes.doctor.data.attributes?.image?.data?.attributes?.url}
            className='rounded-full h-[70px] w-[70px] object-cover'
            width={100}
            height={100}
            alt='doctor-image'
            />
            <div className='flex flex-col gap-2 w-full'>
              <h2 className='font-bold text-[18px] flex items-center justify-between'>{item.attributes.doctor.data.attributes.Name}
              {!expired &&  <CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
              </h2>
              <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-blue-600 w-5 h-5'/>{item.attributes.doctor.data.attributes.Address}</h2>
              <h2 className='flex gap-2 '><Calendar className='text-blue-600 w-5 h-5'/>Appointment On : { moment(item.attributes.Date).format('DD-MMM-YYYY')}</h2>
              <h2 className='flex gap-2 '><Clock className='text-blue-600 w-5 h-5'/> At : {item.attributes.Time}</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookingList