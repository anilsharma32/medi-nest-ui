"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import { use, useEffect, useState } from "react";
import GlobalApi from "./_components/_utils/GlobalApi";
import Footer from "./_components/Footer";


export default function Home() {

  const [doctorList, setDoctorList] = useState([]);

  useEffect(()=>{
    getDoctorList();
  },[])

  const getDoctorList=()=>{
    GlobalApi.getDoctorList().then(res=>{
      setDoctorList(res.data.data);
    })
  }


  return (
    <div>
      {/* Hero Section  (hyperui.dev)*/}
      <Hero />

      {/* Search bar + Category */}
      <CategorySearch/>

      {/* Popular Doctors */}
      <DoctorList doctorList={doctorList}/>


    </div>
  );
}
