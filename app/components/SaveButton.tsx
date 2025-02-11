"use client";
import { api } from "@/convex/_generated/api";
import { useStore } from "@/lib/store";
import { useMutation,  useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { redirect, useSearchParams,  } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../../components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { FaCopy } from "react-icons/fa";

function SaveButton() {
  const [shareLink, setShareLink] = useState<null |string>(null);
  const { toast } = useToast()
  const router = useRouter()
  const save =  useMutation(api.order.create)
  const order = useStore((state) => state.arrangement);
  const initArr = useStore(state=> state.initArr)
  const searchParams = useSearchParams();
 
  const id = searchParams.get("id");
  
  const get=  useQuery(api.order.get,{id: id as Id<"Order">})


  
  const onSave = () => {
    let isNull = true;
    order.map((o) => {
      o !== null ? (isNull = false) : null;
    });
    if (!isNull) {
      async function dbSave() {
        try {
          const result = save!==null && await save({ order });
          const fullUrl = `${window.location.origin}?id=${result}`;
          setShareLink(fullUrl);
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(fullUrl);
            toast({ title: "Share Link", description: "Copied to clipboard!" });
          } else {
            // Fallback method for mobile
            const textArea = document.createElement("textarea");
            textArea.value = fullUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            toast({ title: "Share Link", description: "Copied (fallback method)!" });
          }
        } catch (e) {
          console.log(e);
        }
      }
      
      void dbSave();
    }
  };
 
  
  useEffect(()=>{
   router.refresh()
   console.log("Hi")
  }, [searchParams])

    useEffect(() => {
      if(id==null ){
        console.log(id,"idddd in null")
        if (useStore.persist?.rehydrate) {
          useStore.persist.rehydrate();
        }
      }
        }, [])

        useEffect(() => {
    
          if ( get && id) {
            console.log(get,"get")
            initArr(get?.order as Id<"_storage">[])
            
            
          }
          
        }, [get,id]);

const onCreate=()=>{
 window.location.href = "https://card-gift.vercel.app/"
}


  return (
    <div className="flex flex-col gap-2 ">
      <Button onClick={id ? onCreate :onSave} variant={"default"} className="p-[6px] min-w-[200px] text-sm md:p-4 bg-slate-600  md:w-auto">
        <span className="text-sm md:text-md">
          {id ?"Create":"Save"}
          </span>
        </Button>
        {shareLink && (
  <div className="mt-2 md:hidden visible flex flex-row gap-2 ">
    <input
      type="text"
      value={shareLink}
      readOnly
      className="p-2 text-xs  border rounded w-full justify-center items-center"
    />
    <FaCopy size={16} className="self-center" color="white"      onClick={() => navigator.clipboard.writeText(shareLink)}
 />

    
  </div>
)}

     

    </div>
  );
}

export default SaveButton;
