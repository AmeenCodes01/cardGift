"use client"

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Flowers, flowers } from '@/flowers'
import { useStore } from '@/lib/store'
import { useMutation, useQuery } from 'convex/react'
import Image from 'next/image'
import React, { FormEvent, useRef, useState } from 'react'



function ChooseBar() {
    const length = Object.keys(flowers).length
    const dragImg = useStore(state => state.dragImg)
    const urls = useQuery(api.images.get)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const imageInput = useRef<HTMLInputElement>(null);
    const generateUploadUrl = useMutation(api.images.generateUrl);

    const store = useMutation(api.images.store)

    async function handleSendImage(event: FormEvent) {
      console.log("hello")
      event.preventDefault();
        console.log(event," event")
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();
      console.log(postUrl, " u r l")
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();
      // Step 3: Save the newly allocated storage id to the database
      console.log(storageId, " s t o r a ge id")
      await store({ storageId:storageId as Id<"_storage">});
  
      setSelectedImage(null);
      imageInput.current!.value = "";
    }
    return (
    <div className='grid grid-cols-3 gap-3'>
     {
        urls?.map((img,i)=>(
             <Image
             key={i}
                    src={ img.url as string}
                    alt="flower pic"
                    className="  border-white bg-transparent border-[1px] max-w-[100px] max-h-[100px]
                "
                    width={60}
                    height={60}
                    draggable
                    onDragStart={()=> {dragImg(img.url)}}
                  />
        ))
     } 
      {/* <form onSubmit={handleSendImage}>
      <input
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={(event) => setSelectedImage(event.target.files![0])}
        disabled={selectedImage !== null}
      />
      <button
        type="submit"
        value="Send Image"
        disabled={selectedImage === null}
        className='text-white border-2 w-[100px]'
      >Upload</button>
    </form> */}
    </div>
  )
}

export default ChooseBar
