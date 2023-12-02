import React from "react";
import InputForm from "@/components/InputForm";
import Link from "next/link";
import EditForm from "@/components/EditForm";

const getFood = async (id: any) => {
  // console.log(id);
  try {
    const res = await fetch(`http://localhost:3000/api/food/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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

async function Page({ params }: any) {
  const food = await getFood(params.id);
  const type = await getType();
  const country = await getCountry();

  return (
    <main className=" pb-20  w-full  p-5 flex flex-col items-center space-y-5">
      <Link
        href={"/home"}
        className="fixed left-10 top-10 bg-slate-300 rounded-full"
      >
        back
      </Link>
      <h1 className=" text-xl font-semibold">input food data</h1>
      <EditForm food={food} country={country} type={type} />
    </main>
  );
}

export default Page;
