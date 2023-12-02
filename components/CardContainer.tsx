"use client";
import ItemCard from "@/components/itemCard";
import React, { useState, useEffect } from "react";

const CardContainer = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  // const foods = await getFood();
  useEffect(() => {
    const getFoods = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/food", {
          method: "GET",
          headers: {
            "cache-control": "max-age=0",
          },
          cache: "no-cache",
        });
        if (!res.ok) {
          throw new Error(
            `Failed to fetch data: ${res.status} ${res.statusText}`
          );
        }
        const json = await res.json();
        setFoods(json);
        setLoading(false);
      } catch (error: any) {
        console.error(error.message);
        return null;
      }
    };
    getFoods();
  }, []);

  // console.log(data);
  return (
    <>
      {foods?.map((food: any) => (
        <ItemCard data={food} key={food.id} />
      ))}
    </>
  );
};

export default CardContainer;
