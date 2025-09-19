"use client";
import GlobalApi from "@/app/_components/_utils/GlobalApi";
import DoctorList from "@/app/_components/DoctorList";
import React, { useEffect, useState } from "react";

const Search = ({ params }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [cname, setCname] = useState("");

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      const formattedName = resolvedParams.cname
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      setCname(formattedName);

      getDoctors(resolvedParams.cname);
    };

    unwrapParams();
  }, [params]);

  const getDoctors = async (cnameParam) => {
    const cleanCategory = cnameParam.replace(/-/g, " ").trim();
    GlobalApi.getDoctorByCategory(cleanCategory).then((res) => {
      setDoctorList(res.data.data);
    });
  };

  return (
    <div>
      <DoctorList heading={cname} doctorList={doctorList} />
    </div>
  );
};

export default Search;
