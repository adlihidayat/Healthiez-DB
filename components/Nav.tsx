import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="fixed top-0 border-b border-[#535353] bg-[#0A0A0A] text-[#f7f7f7] flex justify-between items-center w-[100%] px-[10%] py-7">
      <h1 className=" font-semibold text-lg">HEALTHIEZ DB</h1>
      <button>
        <Link
          href={"/create"}
          className=" bg-white text-black py-[6px] px-4 text-sm font-medium rounded"
        >
          Create
        </Link>
      </button>
    </div>
  );
};

export default Nav;
