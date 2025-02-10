
import ChooseBar from "./components/ChooseBar";
import Grid from "./components/Grid";
import SaveButton from "./components/SaveButton";

export default function Home() {


  return (
    <div className=" w-full h-[100%]  flex flex-col-reverse md:flex-row  justify-center items-center bg-black  ">
      <div className="">

      <SaveButton/> 
      </div>
     <div className="md:w-[70%] w-full flex h-full justify-center md:items-center pt-5 md:pt-0 items-start border-2">

   <Grid/>
     </div>
   <div className="md:w-[30%] w-full  border-2">
    <ChooseBar/>
   </div>
    </div>
  );
}
