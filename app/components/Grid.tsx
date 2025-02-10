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
    grid grid-cols-6   bg-green-950 w-fit 
    "
    //     bg-[url('/bg_grass.jpg')] bg-cover bg-center 

>
{
  arr.map((url, index)=>(
    <div className='  md:h-[80px] md:w-[80px] w-[30px] h-[30px] flex   border-[0.1px] rounded-sm justify-center items-center'
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
