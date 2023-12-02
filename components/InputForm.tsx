"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OptionList = (data: any) => {
  return (
    <>
      <option value={""}>none</option>
      {data.data?.map((e: any) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </>
  );
};

const InputForm = ({ type, country }: any) => {
  const router = useRouter();
  const [inputName, setInputName] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [inputRating, setInputRating] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [inputAdditionalItem, setInputAdditionalItem] = useState("");
  const [inputHowToCook, setInputHowToCook] = useState("");
  const [inputVideo, setInputVideo] = useState("");
  const [inputVideoUrl, setInputVideoUrl] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/food", {
        method: "POST",
        body: JSON.stringify({
          name: inputName,
          img: inputImg,
          typeId: inputType,
          countryId: inputCountry,
          items: inputItem,
          additionalItems: inputAdditionalItem,
          rating: inputRating,
          desc: inputDesc,
          howToCook: inputHowToCook,
          video: inputVideo,
        }),
      });

      if (response.ok) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setVideo = (e: any) => {
    setInputVideo(e);
    const embed = e?.split("/watch?v=") ?? null;
    setInputVideoUrl(embed[0] + "/embed/" + embed[1]);
  };

  return (
    <form
      onSubmit={submit}
      className="  flex flex-col space-y-5 bg-slate-200 rounded-lg p-5"
    >
      <input
        className=" px-2 py-1"
        type="text"
        value={inputName}
        onChange={(e: any) => setInputName(e.target.value)}
        placeholder="input title"
      />
      <div className=" flex space-x-3">
        <label htmlFor="type">Choose Type:</label>
        <select
          name="type"
          id="type"
          onChange={(e) => setInputType(e.target.value)}
        >
          <OptionList data={type} />
        </select>
      </div>
      <div className=" flex space-x-3">
        <label htmlFor="country">Choose country:</label>
        <select
          name="country"
          id="country"
          onChange={(e) => setInputCountry(e.target.value)}
        >
          <OptionList data={country} />
        </select>
      </div>
      <input
        className=" px-2 py-1"
        type="text"
        value={inputRating}
        onChange={(e: any) => setInputRating(e.target.value)}
        placeholder="input rating"
      />
      <input
        className=" px-2 py-1"
        type="text"
        value={inputImg}
        onChange={(e: any) => setInputImg(e.target.value)}
        placeholder="img url from pexels"
      />
      {inputImg && (
        <Image
          width={100}
          height={100}
          src={inputImg}
          alt="image error"
          className=" w-[260px] h-60 object-cover rounded-xl"
        />
      )}
      <input
        className=" px-2 py-1"
        type="text"
        value={inputVideo}
        onChange={(e: any) => setVideo(e.target.value)}
        placeholder="input youtube link"
      />
      {inputVideo !== "" && (
        <iframe
          className=" rounded-lg w-[260px] h-[150px] bg-black overflow-hidden"
          width="100"
          height="100"
          src={inputVideoUrl}
          onError={() =>
            setInputVideoUrl("https://www.youtube.com/embed/0jtx2hUCxfMa")
          }
        />
      )}
      <textarea
        className=" px-2 py-1"
        value={inputItem}
        onChange={(e: any) => setInputItem(e.target.value)}
        cols={30}
        rows={3}
        placeholder="input ingredient"
      />
      <textarea
        className=" px-2 py-1"
        value={inputAdditionalItem}
        onChange={(e: any) => setInputAdditionalItem(e.target.value)}
        cols={30}
        rows={2}
        placeholder="input additional ingredient"
      />
      <textarea
        className=" px-2 py-1"
        value={inputDesc}
        onChange={(e: any) => setInputDesc(e.target.value)}
        cols={30}
        rows={5}
        placeholder="input description"
      />
      <textarea
        className=" px-2 py-1"
        value={inputHowToCook}
        onChange={(e: any) => setInputHowToCook(e.target.value)}
        cols={30}
        rows={5}
        placeholder="input how to cook"
      />
      <button
        type="submit"
        disabled={
          inputName === "" ||
          inputImg === "" ||
          inputType === "" ||
          inputCountry === "" ||
          inputRating === "" ||
          inputDesc === "" ||
          inputItem === "" ||
          inputHowToCook === "" ||
          inputVideo === ""
        }
        className="bg-black px-5 py-1.5 text-sm w-max rounded-full text-white disabled:opacity-50"
      >
        submit
      </button>
    </form>
  );
};

export default InputForm;
