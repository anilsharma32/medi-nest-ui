import React, { use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import "react-day-picker/dist/style.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { CalendarDays, Clock } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_components/_utils/GlobalApi'
import { toast } from 'sonner'

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const { user } = useKindeBrowserClient();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTime();
  }, [])


  const saveBooking = () => {
  const data = {
    data: {
      UserName: user.given_name + " " + user.family_name, 
      Email: user.email,
      Time: selectedTimeSlot,
      Date: date,
      doctor: doctor.id,
      Note: message,
      // hospital: doctor.hospital?.id,
    },
  };

  GlobalApi.bookAppointment(data)
    .then((resp) => {
      console.log(resp);
      if(resp){
      GlobalApi.sendEmail(data).then(resp=>{
        console.log(resp)
      })
      toast("Booking confirmation sent on Email");

    }

    setOpen(false);
    // clear i/p box
      setDate(new Date());        
      setSelectedTimeSlot(null);
      setMessage("");    
    })
    .catch((error) => {
      console.error("ERROR:", error.response?.data || error.message);
      toast("Something went wrong while booking");
    });
};





  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ':00 AM' })
      timeList.push({ time: i + ':30 AM' })
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({ time: i + ':00 PM' })
      timeList.push({ time: i + ':30 PM' })
    }
    setTimeSlot(timeList)
  }

  const isPastDay = (day) => {
    return day < new Date();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}> 
      <DialogTrigger asChild>
        <Button className="mt-3 rounded-full bg-blue-700 hover:bg-blue-600 hover:cursor-pointer text-white">
          Book Appointment
        </Button>
      </DialogTrigger>


      <DialogContent
        className="max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 
             -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl 
             rounded-lg shadow-lg bg-white data-[state=open]:animate-none"
      >
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Choose your appointment date and time
          </DialogDescription>
        </DialogHeader>

        {/* Calendar + Time Slot */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 w-full">
          {/* Calendar */}
          <div className="flex flex-col gap-3 items-baseline">
            <h2 className="flex gap-2 items-center">
              <CalendarDays className="text-blue-500 h-5 w-5" />
              Select Date
            </h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={isPastDay}
              className="rounded-lg border"
            />
          </div>

          {/* Time Slot */}
          <div className="mt-3 md:mt-0">
            <h2 className="flex gap-2 items-center mb-3">
              <Clock className="text-blue-500 h-5 w-5" />
              Select Time Slot
            </h2>
            <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
              {timeSlot?.map((item, index) => (
                <h2
                  key={index}
                  onClick={() => setSelectedTimeSlot(item.time)}
                  className={`p-2 border text-center rounded-full hover:bg-blue-500 hover:text-white cursor-pointer 
                  ${item.time === selectedTimeSlot ? 'bg-blue-500 text-white' : ''}`}
                >
                  {item.time}
                </h2>
              ))}
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="mt-4">
          <Textarea
            placeholder="Write your message here..."
            className="h-20 text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="sm:justify-end flex gap-2">
          <DialogClose asChild>
            <Button
              className="text-red-500 border-red-500 hover:text-red-400 cursor-pointer"
              type="button"
              variant="outline"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-500 hover:bg-blue-400 cursor-pointer"
            type="button"
            onClick={saveBooking}
            disabled={!(date && selectedTimeSlot)}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookAppointment
