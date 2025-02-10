
import ChooseBar from "./components/ChooseBar";
import Grid from "./components/Grid";
import SaveButton from "./components/SaveButton";

export default function Home() {


  return (
    <div className=" w-full h-screen  flex  justify-center items-center bg-black  ">
      <div className="">

      <SaveButton/> 
      </div>
     <div className="w-[70%] flex h-full justify-center items-center">

   <Grid/>
     </div>
   <div className="w-[30%] h-full border-l-2">
    <ChooseBar/>
   </div>
    </div>
  );
}
