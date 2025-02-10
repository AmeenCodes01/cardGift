"use client"
import React, { useEffect } from 'react'
import Img from './Img'
import { useStore } from '@/lib/store'

function Grid() {
    const arr = useStore(state => state.arrangement)
    const draggedUrl = useStore(state=> state.draggedUrl)
    const dragImg = useStore(state=> state.dragImg)
    const addImg = useStore(state=> state.addImg)


    useEffect(() => {
      useStore.persist.rehydrate()
    }, [])



    const handleDrop = (e: React.DragEvent<HTMLDivElement>,i:number) => {
        if (draggedUrl === null) return
 
        addImg(draggedUrl,i )
        dragImg(null)
      }
  return (
    <div className="justify-center  h-fit  
    grid grid-cols-4  self-center  bg-green-950 w-fit 
    "
    //     bg-[url('/bg_grass.jpg')] bg-cover bg-center 

>
{
  arr.map((url, index)=>(
    <div className='  h-[80px] w-[80px]   border-[0.1px] rounded-md '
    key={index}
    onDrop={(e)=>handleDrop(e, index)}
    onDragOver={e => e.preventDefault()}

    >
        <div className='flex justify-center items-center'>

{ url !== null &&
        <Img url={url}/>
}
        </div>
    </div>
  ))
}

</div>
  )
}

export default Grid
