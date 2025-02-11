
import { Suspense } from "react";
import ChooseBar from "./components/ChooseBar";
import Grid from "./components/Grid";
import SaveButton from "./components/SaveButton";

export default function Home() {


  return (
    <div className=" w-full h-[100%]  flex flex-col md:flex-row  justify-center items-center bg-gray-900  ">
      <div className="">

      </div>
     <div className="md:w-[70%] w-full flex flex-col md:flex-col md:gap-6 gap-2 md:h-full h-[50%] justify-center md:items-center pt-5 md:pt-0 items-center ">

   <Grid/>
   <Suspense>

      <SaveButton/> 
   </Suspense>
      <span className="md:text-sm text-xs italic text-blue-200">
        build a aesthetic grid card --
        press Save --
        share link 
      </span>
     </div>
   <div className=" bg-gray-800  md:w-[30%] flex flex-col w-full h-[50%] md:h-full   border-white">
   <span className='md:text-sm text-xs text-blue-200 italic pl-2'>drag and drop</span>

    <ChooseBar/>
   </div>
    </div>
  );
}
