"use client";
import { flowers } from "@/flowers";
import Image from "next/image";
import React, { useState } from "react";


const keys = Object.keys(flowers)
function Img({ url }: { url: string }) {
  const [arr, setArr] = useState(new Array(20).fill(0));

 
  return (
    <div>
      <Image
      
        src={url }
        alt="flower pic"
        className="  bg-transparent  max-w-[100px] max-h-[100px]
    "
        width={80}
        height={80}
      />
    </div>
  );
}

export default Img;
