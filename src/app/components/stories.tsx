"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import data from '../data/customData.json';


const Stories = () => {
    const size = data.stories.length;
    var initial = new Array(size).fill(false);
    const [viewed, setViewed] = useState(initial);

    const handleClick = (index: number) => {
        const updated = viewed.map((view, i) => {
            if(i==index) return !view;
            else return view;
        });
        setViewed(updated);
    }

    return (
        <div className=' flex flex-row gap-3 h-20 items-start overflow-x-auto '>
            {data.stories.map((story, index) => (
                <Image key={index} src={story.dpSrc} alt='dp' width={40} height={40} className={` rounded-full w-16 h-16 p-1 border-2 ${viewed[index] ? 'border-gray-300' : 'border-pink-600'} `} onClick={() => {if(viewed[index]==false) handleClick(index)}} />
            ))}
        </div>
    )
}

export default Stories