"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OptionList = ({ data, title }: any) => {
  return (
    <>
      <option value={""}>{title}</option>
      {data?.map((e: any) => (
        <option
          value={e.id}
          key={e.id}
          className=" bg-transparent after:bg-gray-700"
        >
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
      className=" w-full px-10 flex flex-col space-y-5 rounded-lg py-5 max-w-4xl"
    >
      <input
        className="custom-input"
        type="text"
        value={inputName}
        onChange={(e: any) => setInputName(e.target.value)}
        placeholder="Input title"
      />
      <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-3">
        <div className=" flex space-x-3 w-full">
          <select
            name="type"
            id="type"
            onChange={(e) => setInputType(e.target.value)}
            className="custom-dropdown h-max"
          >
            <OptionList data={type} title={"Type"} />
          </select>
          <select
            name="country"
            id="country"
            onChange={(e) => setInputCountry(e.target.value)}
            className="custom-dropdown h-max"
          >
            <OptionList data={country} title={"Country"} />
          </select>
        </div>
        <input
          className="w-full md:w-28 px-4 py-[7px] rounded-md border border-[#474747] bg-[#0b0b0b] outline-none focus:shadow-custom"
          type="text"
          value={inputRating}
          onChange={(e: any) => setInputRating(e.target.value)}
          placeholder="Rating"
        />
      </div>
      <input
        className="custom-input"
        type="text"
        value={inputImg}
        onChange={(e: any) => setInputImg(e.target.value)}
        placeholder="Img url from pexels"
      />
      {inputImg && (
        <Image
          width={100}
          height={100}
          src={inputImg}
          alt="image error"
          className=" w-[100%] h-60 object-cover rounded-xl"
        />
      )}
      <input
        className="custom-input"
        type="text"
        value={inputVideo}
        onChange={(e: any) => setVideo(e.target.value)}
        placeholder="Youtube link"
      />
      {inputVideo !== "" && (
        <iframe
          className=" rounded-lg w-[100%] h-[220px] bg-black overflow-hidden"
          width="100"
          height="100"
          src={inputVideoUrl}
          onError={() =>
            setInputVideoUrl("https://www.youtube.com/embed/0jtx2hUCxfMa")
          }
        />
      )}
      <textarea
        className="custom-input"
        value={inputItem}
        onChange={(e: any) => setInputItem(e.target.value)}
        cols={30}
        rows={3}
        placeholder="Food ingredient"
      />
      <textarea
        className="custom-input"
        value={inputAdditionalItem}
        onChange={(e: any) => setInputAdditionalItem(e.target.value)}
        cols={30}
        rows={2}
        placeholder="Additional ingredient (no a must)"
      />
      <textarea
        className="custom-input"
        value={inputDesc}
        onChange={(e: any) => setInputDesc(e.target.value)}
        cols={30}
        rows={5}
        placeholder="Food description"
      />
      <textarea
        className="custom-input"
        value={inputHowToCook}
        onChange={(e: any) => setInputHowToCook(e.target.value)}
        cols={30}
        rows={5}
        placeholder="How to cook"
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
        className=" px-4 py-1 font-medium w-max rounded text-black bg-white disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default InputForm;
