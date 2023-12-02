import CardContainer from "@/components/CardContainer";
// const getFood = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/food", {
//       method: "GET",
//       headers: {
//         "cache-control": "max-age=0",
//       },
//       cache: "no-cache",
//     });
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
//     }
//     const json = await res.json();
//     return json;
//   } catch (error: any) {
//     console.error(error.message);
//     return null;
//   }
// };

const page = () => {
  // console.log(foods);
  return (
    <main className=" mt-40 bg-slate-200 p-10">
      <CardContainer />
    </main>
  );
};

export default page;
