import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <div className="fixed bg-slate-400 flex space-x-40 p-4 rounded-xl top-20">
      <h1>HEALTHIEZ DB</h1>
      <button>
        <Link href={"/create"}>Create</Link>
      </button>
    </div>
  );
};

export default Nav;
