'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from './_components/BookingList'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

const MyBooking = () => {

  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getUserBookingList();
  }, [user])

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then(resp => {
      setBookingList(resp.data.data);
        })
  }

  /**
   * use to filter User Booking
   * @param {*} type 
   * @returns 
   */

// const filterUserBooking = (type) => {
//   if (!Array.isArray(bookingList)) {
//     return []; // return empty array if bookingList is not ready
//   }

//   const result = bookingList.filter((item) =>
//     type === "upcoming"
//       ? new Date(item.attributes.Date) >= new Date()
//       : new Date(item.attributes.Date) <= new Date()
//   );

//   return result;
// };

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const filterUserBooking = (type) => {
  if (!Array.isArray(bookingList)) return [];

  const today = normalizeDate(new Date());

  return bookingList.filter((item) => {
    const bookingDate = normalizeDate(item.attributes.Date);

    return type === "upcoming"
      ? bookingDate >= today
      : bookingDate < today;
  });
};


  return (
    <div className='px-4 sm:px-10 mt-10'>
      <h2 className='font-bold text-2xl'>My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mb-10">
        <div className="mt-5"> {/* container keeps full width but list itself will align left */}
          <TabsList className="w-full flex items-center justify-start gap-4 ">
            <TabsTrigger
              value="upcoming"
              className="!flex-none !w-auto px-4 cursor-pointer"
            >
              Upcoming
            </TabsTrigger>

            <TabsTrigger
              value="expired"
              className="!flex-none !w-auto px-4 cursor-pointer"
            >
              Expired
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming">
          <BookingList 
          bookingList={filterUserBooking('upcoming')} 
          updateRecord={()=>getUserBookingList()}
          expired={false}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList 
          bookingList={filterUserBooking('expired')}
          updateRecord={()=>getUserBookingList()}
          expired={true}
          />
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default MyBooking