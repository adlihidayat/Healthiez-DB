import CardContainer from "@/components/CardContainer";
import Nav from "@/components/Nav";

const page = () => {
  // console.log(foods);
  return (
    <div className="flex flex-col items-center w-full space-y-5">
      <Nav />
      <main className="w-[100%] max-w-[425px] pt-28 xl:pt-32 px-5 grid grid-cols-1 lg:grid-cols-2 lg:max-w-[900px] 2xl:grid-cols-3 2xl:max-w-[1245px]">
        <CardContainer />
      </main>
    </div>
  );
};

export default page;
