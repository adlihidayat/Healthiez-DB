"use client";
import Link from "next/link";
import React from "react";

const ItemCard = ({ data }: any) => {
  return (
    <div className="flex justify-between items-center w-[100%] max-w-sm py-3 px-5 bg-slate-500 mb-5">
      <div>
        <h2>{data.name}</h2>
      </div>
      <Link
        className=" bg-red-500 text-white px-3 py-1"
        href={`/edit/${data.id}`}
      >
        Edit
      </Link>
    </div>
  );
};

export default ItemCard;
