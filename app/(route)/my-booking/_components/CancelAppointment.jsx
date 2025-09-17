import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'


const CancelAppointment = ({onContinueClick}) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='text-blue-500 border-blue-500 cursor-pointer hover:text-blue-300'> Cancel Appointment</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your appointment
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className='cursor-pointer'
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='cursor-pointer'
            onClick={onContinueClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelAppointment