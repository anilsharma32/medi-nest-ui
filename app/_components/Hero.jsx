import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          
          {/* Content */}
          <div className="order-2 md:order-1">
            <div className="max-w-prose md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Find & Book 
                <span className="text-blue-700"> Appointments </span> 
                with your Fav 
                <span className="text-blue-700"> Doctors</span>
              </h2>

              <p className="mt-4 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                sequi.
              </p>
              <Button className="mt-10 bg-blue-700 hover:bg-blue-600 hover:cursor-pointer">
                Explore Now
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 hover:transition-all ease-in-out cursor-pointer">
            <Image
              src="/banner.jpeg"
              width={800}
              height={800}
              className="rounded-3xl"
              alt="Hero Banner"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
