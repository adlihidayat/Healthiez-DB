import React from "react";
import InputForm from "@/components/InputForm";
import Link from "next/link";

const getType = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/type");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return json;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

const getCountry = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/country");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return json;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};

async function Page() {
  const type = await getType();
  const country = await getCountry();

  return (
    <main className=" w-full pb-16 flex flex-col items-center space-y-5 text-[#f7f7f7] relative">
      <div className=" w-full px-[10%] pt-10 pb-5 border-b border-[#474747] bg-[#0b0b0b] md:flex items-center md:space-x-5">
        <Link
          href={"/home"}
          className=" bg-white text-black px-2 py-1 rounded text-xs font-semibold h-max"
        >
          Back
        </Link>
        <div>
          <h1 className="text-3xl font-medium text-left mt-5">Inputing Data</h1>
          <p className=" text-[#969696]">creating a data to database</p>
        </div>
      </div>
      <InputForm country={country} type={type} />
    </main>
  );
}

export default Page;
