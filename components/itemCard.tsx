"use client";
import Link from "next/link";
import React from "react";

const ItemCard = ({ data }: any) => {
  // console.log(data);
  return (
    <div className="flex justify-between items-start w-[100%] max-w-sm py-4 px-5 border border-[#4c4c4c] bg-[#0A0A0A] text-white rounded-lg mb-3 lg:mb-12">
      <div>
        <h2 className=" font-semibold mb-1">{data.name}</h2>
        <p className=" font-light text-sm sm:text-xs text-[#939393] w-[80%] text-justify">
          {data.desc}
        </p>
      </div>
      <Link
        className="bg-blue-600 hover:bg-blue-700 duration-300 text-sm sm:text-xs rounded px-3 py-[3px]"
        href={`/edit/${data.id}`}
      >
        Edit
      </Link>
    </div>
  );
};

export default ItemCard;
