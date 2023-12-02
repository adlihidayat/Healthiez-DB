"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OptionList = ({ data, prevData }: any) => {
  //   console.log(data);
  return (
    <>
      <option value={prevData.id}>{prevData.name}</option>
      {data?.map((e: any) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </>
  );
};

const EditForm = ({ food, country, type }: any) => {
  const router = useRouter();
  const [inputName, setInputName] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [inputType, setInputType] = useState("");
  const [inputCountry, setInputCountry] = useState("");
  const [inputRating, setInputRating] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [inputIngredient, setInputIngredient] = useState("");
  const [inputHowToCook, setInputHowToCook] = useState("");
  const [inputVideo, setInputVideo] = useState("");
  const [inputVideoUrl, setInputVideoUrl] = useState("");

  console.log(food);

  //   console.log(inputImg ? "true" : "false");
  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/food/${food.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name: inputName ? inputName : food.name,
            img: inputImg ? inputImg : food.img,
            typeId: inputType ? Number(inputType) : food.typeId,
            countryId: inputCountry ? Number(inputCountry) : food.countryId,
            rating: inputRating ? inputRating : food.rating,
            desc: inputDesc ? inputDesc : food.desc,
            howToCook: inputHowToCook ? inputHowToCook : food.howToCook,
            video: inputVideo ? inputVideo : food.video,
          }),
        }
      );

      if (response.ok) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Delete = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/food/${food.id}`,
        {
          method: "DELETE",
        }
      );

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
        placeholder={food.name}
      />
      <div className=" flex space-x-3">
        <label htmlFor="type">Choose Type:</label>
        <select
          name="type"
          id="type"
          onChange={(e) => setInputType(e.target.value)}
        >
          <OptionList data={type} prevData={food.type} />
        </select>
      </div>
      <div className=" flex space-x-3">
        <label htmlFor="country">Choose country:</label>
        <select
          name="country"
          id="country"
          onChange={(e) => setInputCountry(e.target.value)}
        >
          <OptionList data={country} prevData={food.country} />
        </select>
      </div>
      <input
        className=" px-2 py-1"
        type="text"
        value={inputRating}
        onChange={(e: any) => setInputRating(e.target.value)}
        placeholder={food.rating}
      />
      <input
        className=" px-2 py-1"
        type="text"
        value={inputImg}
        onChange={(e: any) => setInputImg(e.target.value)}
        placeholder={food.img}
      />
      {inputImg && (
        <Image
          src={inputImg}
          alt="image error"
          height={100}
          width={100}
          className=" w-[260px] h-60 object-cover rounded-xl"
        />
      )}
      <input
        className=" px-2 py-1"
        type="text"
        value={inputVideo}
        onChange={(e: any) => setVideo(e.target.value)}
        placeholder={food.video}
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
        value={inputDesc}
        onChange={(e: any) => setInputDesc(e.target.value)}
        cols={30}
        rows={5}
        placeholder={food.desc}
      />
      <textarea
        className=" px-2 py-1"
        value={inputHowToCook}
        onChange={(e: any) => setInputHowToCook(e.target.value)}
        cols={30}
        rows={5}
        placeholder={food.howToCook}
      />
      <div>
        <button
          onClick={Delete}
          className="bg-red-500 mr-2 px-5 py-1.5 text-sm w-max rounded-full text-white disabled:opacity-50"
        >
          Delete
        </button>
        <button
          type="submit"
          className="bg-black px-5 py-1.5 text-sm w-max rounded-full text-white"
        >
          submit
        </button>
      </div>
    </form>
  );
};

export default EditForm;
