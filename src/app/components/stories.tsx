"use client";
import React, { use, useState } from 'react'
import Image from 'next/image';
import data from '../data/customData.json';
import '../globals.css';

const Stories = () => {
    const size = data.stories.length;
    var initial = new Array(size).fill(false);
    var next = new Array(size).fill(0);
    const [viewed, setViewed] = useState(initial);
    const [nextStory, setNextStory] = useState(next);
    const [currUserIndex, setCurrUserIndex] = useState(0);
    const [currStoryIndex, setCurrStoryIndex] = useState(0);
    const [viewStories, setViewStories] = useState(false);

    const handleClick = (index: number) => {

        const totalstories = data.stories[index].storySrc.length;
        if (index != currUserIndex) setCurrUserIndex(index);
        setCurrStoryIndex(nextStory[index]);

        if(viewStories == false) setViewStories(true);

        const updatedNextStory = nextStory.map((story, i) => {
            if (i == index) {
                if (nextStory[i] == totalstories - 1) {
                    if (viewed[i] == false) {
                        const updated = viewed.map((view, j) => {
                            if (j == index) return !view;
                            else return view;
                        });
                        setViewed(updated);
                    }
                    return 0;
                }
                else return ++story;
            }
            else return nextStory[i];
        });
        setNextStory(updatedNextStory);
    }

    const onCloseStories = (index: number) => {
        if (viewed[index] == true) {
            const updatedNextStory = nextStory.map((story, i) => {
                if (i == index) {
                    return 0;
                }
                else return nextStory[i];
            });
            setNextStory(updatedNextStory);
        }
        setViewStories(false);
    }

    const handleLeftClick = (index: number) => {
        if(currStoryIndex==0) {
            if(currUserIndex==0) onCloseStories(currUserIndex);
            else {setCurrUserIndex(currUserIndex-1); setCurrStoryIndex(nextStory[currUserIndex-1])}
        }
        else setCurrStoryIndex(currStoryIndex-1);
    }

    const handleRightClick = (index: number) => {
        if(currStoryIndex==data.stories[index].storySrc.length-1) {
            if(currUserIndex==data.stories.length-1) onCloseStories(currUserIndex);
            else {setCurrUserIndex(currUserIndex+1); setCurrStoryIndex(nextStory[currUserIndex+1])}
        }
        else setCurrStoryIndex(currStoryIndex+1);
    }

    return (
        <div>
            <div className=' flex flex-row gap-3 h-20 items-start overflow-x-auto no-scrollbar px-2 -mt-4 '>
                {data.stories.map((story, index) => (
                    <Image key={index} src={story.dpSrc} alt='dp' width={40} height={40} className={` rounded-full w-16 h-16 p-1 border-2 ${viewed[index] ? 'border-gray-300' : 'border-pink-600'} `} onClick={() => { handleClick(index) }} />
                ))}
            </div>
            <div className={`${viewStories == false ? ' hidden ' : ''} h-screen w-screen min-w-full max-w-fit absolute bg-white top-0`} >
                <div className=' flex flex-col gap-2 p-1 z-10 '>
                    <div className=' flex flex-row justify-around gap-1 '>
                        {data.stories[currUserIndex].storySrc.map((src, i) =>
                            <>
                                {i < currStoryIndex && (
                                    <div key={i} className=' bg-gray-600 rounded-full w-full h-1 '>
                                    </div>
                                )}
                                {i == currStoryIndex && (
                                    <div key={i} className=' bg-gray-200 rounded-full w-full h-1 '>
                                        <div className=' bg-gray-600 rounded-full h-full progress '></div>
                                    </div>
                                )}
                                {i > currStoryIndex && (
                                    <div key={i} className=' bg-gray-200 rounded-full w-full h-1 '>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className=' flex flex-row justify-between '>
                        <div className=' flex flex-row gap-2 '>
                            <Image src={data.stories[currUserIndex].dpSrc} alt='dp' width={40} height={40} className=' rounded-full w-12 h-12 p-1 object-contain ' />
                            <div className=' flex flex-col gap-0 justify-center items-center '>
                                <p className=' text-xs font-semibold '>{data.stories[currUserIndex].username}</p>
                                <p className=' text-xs '>Song</p>
                            </div>
                        </div>
                        <div className=' flex flex-row gap-2 justify-center items-center '>
                            <div>...</div>
                            <button type='button' onClick={() => { onCloseStories(currUserIndex) }} className=' z-50 '>x</button>
                        </div>
                    </div>
                    <div className=' flex flex-row justify-between items-center h-screen -mt-20'>
                        <div className=' rounded-full text-xs w-[25%] h-[80%] z-50 ' onClick={() => {handleLeftClick(currUserIndex)}}></div>
                        <div className=' rounded-full text-xs w-[25%] h-[80%] z-50 ' onClick={() => {handleRightClick(currUserIndex)}}></div>
                    </div>
                </div>
                <Image src={data.stories[currUserIndex].storySrc[currStoryIndex]} alt='story' width={50} height={100} className=' w-full h-full object-fill p-2 absolute top-0 z-5 ' />
            </div>
        </div>
    )
}

export default Stories