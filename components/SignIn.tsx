"use client";

import { PrismaClient } from "@prisma/client/edge";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const prisma = new PrismaClient();

function SignIn() {
  const [input, setInput] = useState("");
  const [userFalse, setUserFalse] = useState(false);
  const router = useRouter();

  const submitForm = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: input }),
    });

    const result = await response.json();
    if (result.available) {
      router.push("/home");
    } else {
      setUserFalse(true);
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="bg-[#383737] rounded-lg text-white mx-auto my-auto flex flex-col py-14 px-10 text-center"
    >
      <div className="mb-10">
        <h1 className=" font-bold text-xl">LOGIN</h1>
        <h2 className=" text-s">healthiez db</h2>
      </div>
      <div className=" mb-8">
        <input
          type="text"
          value={input}
          placeholder="name"
          className=" bg-transparent outline-none border-b"
          onChange={(e: any) => setInput(e.target.value)}
        />
        {userFalse && (
          <p className=" text-left text-xs text-red-500 absolute">
            you are not the admin
          </p>
        )}
      </div>
      <button
        type="submit"
        className=" bg-[#396bb5] hover:bg-[#2f5895] duration-300 py-2 rounded-md font-medium text-sm mb-5"
      >
        Submit
      </button>
      <a
        href="https://healthiezz.vercel.app/"
        target="_blank"
        className="text-xs hover:text-green-300 duration-300 underline underline-offset-2"
      >
        visit healthiez
      </a>
    </form>
  );
}

export default SignIn;
