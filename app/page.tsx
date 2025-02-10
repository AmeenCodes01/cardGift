
import ChooseBar from "./components/ChooseBar";
import Grid from "./components/Grid";
import SaveButton from "./components/SaveButton";

export default function Home() {


  return (
    <div className=" w-full h-[100%]  flex flex-col md:flex-row  justify-center items-center bg-black  ">
      <div className="">

      </div>
     <div className="md:w-[70%] w-full flex md:flex-col md:gap-6 md:h-full h-[50%] justify-center md:items-center pt-5 md:pt-0 items-start ">

   <Grid/>
      <SaveButton/> 
      <span className="text-sm italic text-blue-200">
        build a aesthetic grid card --
        press Save --
        share link 
      </span>
     </div>
   <div className="md:w-[30%] w-full h-[50%] md:h-full  border-l-[2px] border-white">
    <ChooseBar/>
   </div>
    </div>
  );
}
