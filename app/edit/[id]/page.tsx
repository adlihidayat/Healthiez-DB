import React from "react";
import Link from "next/link";
import EditForm from "@/components/EditForm";

async function Page({ params }: any) {
  return (
    <main className=" pb-20  w-full flex flex-col items-center space-y-5">
      <div className=" w-full px-[10%] pt-10 pb-5 border-b border-[#474747] bg-[#0b0b0b] md:flex items-center md:space-x-5">
        <Link
          href={"/home"}
          className=" bg-white hover:bg-gray-300 duration-300 text-black px-2 py-1 rounded text-xs font-semibold h-max"
        >
          Back
        </Link>
        <div>
          <h1 className="text-3xl font-medium text-left mt-5 text-white">
            Editing Data
          </h1>
          <p className=" text-[#969696]">Editing a data to database</p>
        </div>
      </div>
      <EditForm id={params.id} />
    </main>
  );
}

export default Page;
