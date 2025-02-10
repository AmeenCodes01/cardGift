"use client";
import { api } from "@/convex/_generated/api";
import { useStore } from "@/lib/store";
import { useMutation,  useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { useSearchParams,  } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../../components/ui/button";

function SaveButton() {
  const [shareLink, setShareLink] = useState<null |string>(null);

  const searchParams = useSearchParams();
 
  const id = searchParams.get("id");
  
const get=  id !== null ? useQuery(api.order.get,{id: id as Id<"Order">}) : null
  const save = useMutation(api.order.create);
  const order = useStore((state) => state.arrangement);
  const initArr = useStore(state=> state.initArr)


  
  const onSave = () => {
    let isNull = true;
    order.map((o) => {
      o !== null ? (isNull = false) : null;
    });
    if (!isNull) {
      async function dbSave() {
        try {
          const result = await save({ order });
          const fullUrl = `${window.location.origin}?id=${result}`;
          setShareLink(fullUrl);
          navigator.clipboard.writeText(fullUrl).then(() => {
            alert("Link copied to clipboard!");
          });
        } catch (e) {
          console.log(e);
        }
      }
      
      void dbSave();
    }
  };
  
  useEffect(() => {
    
    if (get) {
      
       initArr(get?.order as Id<"_storage">[])
     

    }
  
  }, [get,id]);


  return (
    <div>
      
      <Button onClick={onSave} className="p-4 ">Save</Button>

     

    </div>
  );
}

export default SaveButton;
