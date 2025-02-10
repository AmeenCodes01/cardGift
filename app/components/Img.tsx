"use client";
import { flowers } from "@/flowers";
import { useStore } from "@/lib/store";
import Image from "next/image";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";


const keys = Object.keys(flowers)
function Img({ url,index }: { url: string; index:number }) {
  const [isHover, setIsHover]=useState(false)
  const removeImg = useStore((state)=> state.addImg)
 
  return (
    <div className="relative "
    onMouseEnter={()=> setIsHover(true)}
    onMouseLeave={()=> setIsHover(false)}
    onClick={()=> removeImg(null,index)}
    >
      <img
    
        src={url }
        alt="flower pic"
        className="  bg-transparent object-cover rounded-sm aspect-square
    "
        // width={30}
        // height={30}
      />
      <div className={`absolute bg-black rounded-sm   top-0 ${isHover?"visible":"hidden"}`}
      
      >
        <MdDelete color="white" />
      </div>
    </div>
  );
}

export default Img;
