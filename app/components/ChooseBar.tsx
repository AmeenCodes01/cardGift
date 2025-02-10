"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
      <div className='flex flex-col  h-full w-full  justify-start items-centre pl-2 gap-4 p-4 '>

    <div className='grid grid-cols-4 gap-4  overflow-y-auto   md:h-fit w-full  ' >
     {
        urls?.map((img,i)=>(
          <Image
          key={i}
                 src={ img.url as string}
                 alt="flower pic"
                        className="  bg-transparent object-cover rounded-sm aspect-square
    "
                 width={60}
                 height={60}
                 draggable
                 onDragStart={()=> {dragImg(img.url)}}
               />

        ))
     } 
    </div>
     <div className='flex justify-start  mt-auto flex-col gap-1  '>

<span className='text-sm italic text-blue-400'>Upload Image to use in grid (will be public)</span>
      <form onSubmit={handleSendImage} className='flex '>
      <Input
        type="file"
        accept="image/*"
        ref={imageInput}
        className='text-white border-2'
        color='white'
        onChange={(event) => setSelectedImage(event.target.files![0])}
        disabled={selectedImage !== null}
        />
      <Button
        type="submit"
        variant={"ghost"}
        value="Send Image"
        disabled={selectedImage === null}
        className=' border-white text-white'
        >Upload</Button>
    </form>
        </div>
      </div>
  )
}

export default ChooseBar
