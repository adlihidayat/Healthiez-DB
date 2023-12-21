"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const OptionList = ({ data, prevData }: any) => {
  return (
    <>
      {data?.map((e: any) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </>
  );
};

const EditForm = ({ id }: any) => {
  const router = useRouter();
  const [food, setFood] = useState({
    name: "",
    img: "",
    typeId: 0,
    countryId: 0,
    rating: "0",
    desc: "",
    howToCook: "",
    video: "",
  });
  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const getOption = async () => {
      try {
        const food = await fetch(`/api/food/${id}`);
        const type = await fetch("/api/type");
        const country = await fetch("/api/country");
        if (!food.ok) {
          throw new Error(
            `Failed to fetch data: ${food.status} ${food.statusText}`
          );
        }
        if (!type.ok) {
          throw new Error(
            `Failed to fetch data: ${type.status} ${type.statusText}`
          );
        }
        if (!country.ok) {
          throw new Error(
            `Failed to fetch data: ${country.status} ${country.statusText}`
          );
        }
        const json1 = await food.json();
        const json2 = await type.json();
        const json3 = await country.json();
        setFood(json1);
        setType(json2);
        setCountry(json3);
        setLoading(false);
      } catch (error: any) {
        console.error(error.message);
        return null;
      }
    };
    getOption();
  }, []);

  console.log(food);

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/food/${id}`, {
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
      });

      if (response.ok) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Delete = async (e: any) => {
    if (loading) {
      e.preventDefault();

      try {
        const response = await fetch(`/api/food/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setVideo = (e: any) => {
    setInputVideo(e);
    const embed = e?.split("/watch?v=") ?? null;
    setInputVideoUrl(embed[0] + "/embed/" + embed[1]);
  };

  return loading ? (
    <p className=" text-white pt-40">loading...</p>
  ) : (
    <form
      onSubmit={submit}
      className=" w-full px-10 flex flex-col space-y-5 rounded-lg py-5 max-w-4xl text-white"
    >
      <input
        className="custom-input"
        type="text"
        value={inputName}
        onChange={(e: any) => setInputName(e.target.value)}
        placeholder={food.name}
      />
      <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-3">
        <div className=" flex space-x-3 w-full">
          <select
            value={inputType ? inputType : food.typeId}
            name="type"
            id="type"
            onChange={(e) => setInputType(e.target.value)}
            className="custom-dropdown h-max"
          >
            <OptionList data={type} />
          </select>
          <select
            value={inputCountry ? inputCountry : food.countryId}
            name="country"
            id="country"
            onChange={(e) => setInputCountry(e.target.value)}
            className="custom-dropdown h-max"
          >
            <OptionList data={country} />
          </select>
        </div>
        <input
          className="w-full md:w-28 px-4 py-[7px] rounded-md border border-[#474747] bg-[#0b0b0b] outline-none focus:shadow-custom"
          type="text"
          value={inputRating}
          onChange={(e: any) => setInputRating(e.target.value)}
          placeholder={food.rating}
        />
      </div>
      <div className=" md:flex md:space-x-5">
        <div className=" w-full">
          <input
            className="w-full px-4 py-[10px] rounded-md border border-[#474747] bg-[#0b0b0b] outline-none focus:shadow-custom"
            type="text"
            value={inputImg}
            onChange={(e: any) => setInputImg(e.target.value)}
            placeholder={food.img}
          />
          {inputImg && (
            <Image
              width={100}
              height={100}
              src={inputImg}
              alt="image error"
              className=" w-[100%] h-60 object-cover rounded-xl mt-5"
            />
          )}
        </div>
        <div className=" w-full mt-5 md:mt-0">
          <input
            className="w-full px-4 py-[10px] rounded-md border border-[#474747] bg-[#0b0b0b] outline-none focus:shadow-custom "
            type="text"
            value={inputVideo}
            onChange={(e: any) => setVideo(e.target.value)}
            placeholder={food.video}
          />
          {inputVideo !== "" && (
            <iframe
              className=" rounded-lg w-[100%] h-[220px] bg-black overflow-hidden mt-5"
              width="100"
              height="100"
              src={inputVideoUrl}
              onError={() =>
                setInputVideoUrl("https://www.youtube.com/embed/0jtx2hUCxfMa")
              }
            />
          )}
        </div>
      </div>
      <textarea
        className="custom-input"
        value={inputDesc}
        onChange={(e: any) => setInputDesc(e.target.value)}
        cols={30}
        rows={5}
        placeholder={food.desc}
      />
      <textarea
        className="custom-input"
        value={inputHowToCook}
        onChange={(e: any) => setInputHowToCook(e.target.value)}
        cols={30}
        rows={5}
        placeholder={food.howToCook}
      />
      <div>
        <button
          onClick={Delete}
          className="mr-3 px-4 py-1 font-medium w-max rounded text-white bg-red-500 hover:bg-red-600 duration-300 disabled:opacity-50"
        >
          Delete
        </button>
        <button
          type="submit"
          className=" px-4 py-1 font-medium w-max rounded text-black bg-white hover:bg-gray-300 duration-300 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditForm;
