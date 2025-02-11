"use client"
import React, { useEffect, useState } from 'react'
import Img from './Img'
import { useStore } from '@/lib/store'


function Grid() {
    const arr = useStore(state => state.arrangement)
    const draggedUrl = useStore(state=> state.draggedUrl)
    const dragImg = useStore(state=> state.dragImg)
    const addImg = useStore(state=> state.addImg)
    const [count,setCount]=useState(0)

    

    const handleDrop = (e: React.DragEvent<HTMLDivElement>,i:number) => {
        if (draggedUrl === null) return
 
        addImg(draggedUrl,i )
        dragImg(null)
      }
     
  return (
    <div className="justify-center  h-fit 
    grid grid-cols-5   bg-green-950 w-fit 
    "
    //     bg-[url('/bg_grass.jpg')] bg-cover bg-center 

>
{
  arr.map((url, index)=>(
    <div className='  md:h-[80px] md:w-[80px] w-[50px] h-[50px] flex border-yellow-600   border-[0.01px] border-opacity-40  rounded-sm justify-center items-center'
    key={index}
    onDrop={(e)=>handleDrop(e, index)}
    onDragOver={e => e.preventDefault()}

    >

{ url !== null &&
        <Img url={url} index={index}/>
}
    </div>
  ))
}

</div>
  )
}

export default Grid
