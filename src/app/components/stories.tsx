"use client";
import React, { use, useState } from 'react'
import Image from 'next/image';
import data from '../data/customData.json';
import '../globals.css';

const Stories = () => {
    const numOfUsers = data.stories.length;
    var initialViewedStatus = new Array(numOfUsers).fill(false);
    var initialNextStoryIndex = new Array(numOfUsers).fill(0);
    const [viewedStatus, setViewedStatus] = useState(initialViewedStatus);
    const [nextStoryIndex, setNextStoryIndex] = useState(initialNextStoryIndex);
    const [currUserIndex, setCurrUserIndex] = useState(0);
    const [currStoryIndex, setCurrStoryIndex] = useState(0);
    const [viewStories, setViewStories] = useState(false);

    const handleClick = (index: number) => {
        setCurrUserIndex(index);
        setCurrStoryIndex(nextStoryIndex[index]);
        setViewStories(true);
        updateViews();
    }

    const handleRightClick = () => {
        updateViews();
        if (currStoryIndex == data.stories[currUserIndex].storySrc.length - 1) {
            if (currUserIndex == data.stories.length - 1) onCloseStories();
            else { setCurrUserIndex(currUserIndex + 1); setCurrStoryIndex(nextStoryIndex[currUserIndex + 1]) }
        }
        else setCurrStoryIndex(currStoryIndex + 1);
    }

    const handleLeftClick = () => {
        updateViews();
        if (currStoryIndex == 0) {
            if (currUserIndex == 0) onCloseStories();
            else { setCurrUserIndex(currUserIndex - 1); setCurrStoryIndex(nextStoryIndex[currUserIndex - 1]) }
        }
        else setCurrStoryIndex(currStoryIndex - 1);
    }

    const onCloseStories = () => {
        updateViews();
        setViewStories(false);
    }

    const updateViews = () => {
        if (viewedStatus[currUserIndex] == false) {
            const totalstories = data.stories[currUserIndex].storySrc.length;
            const updatedNextStoryIndex = nextStoryIndex.map((storyIndex, i) => {
                if (i == currUserIndex) {
                    if (storyIndex == totalstories - 1) {
                        if (viewedStatus[i] == false) {
                            const updated = viewedStatus.map((view, j) => {
                                if (j == currUserIndex) return !view;
                                else return view;
                            });
                            setViewedStatus(updated);
                        }
                        return 0;
                    }
                    else return ++storyIndex;
                }
                else return storyIndex;
            });
            setNextStoryIndex(updatedNextStoryIndex);
        }
        else {
            const updatedNextStoryIndex = nextStoryIndex.map((storyIndex, i) => {
                if (i == currUserIndex) {
                    return 0;
                }
                else return storyIndex;
            });
            setNextStoryIndex(updatedNextStoryIndex);
        }
    }

    return (
        <>
            <div className=' flex flex-row gap-3 h-24 items-start overflow-x-auto no-scrollbar px-2 -mt-4 '>
                {data.stories.map((user, index) => (
                    <div key={index} className=' flex flex-col gap-1 '>
                        <Image src={user.dpSrc} alt='dp' width={40} height={40} className={` rounded-full min-w-16 min-h-16 max-w-16 max-h-16 p-1 border-2 ${viewedStatus[index] ? 'border-gray-300' : 'border-pink-600'} object-fill `} onClick={() => { handleClick(index) }} />
                        <p className=' text-xs text-center '>{user.username}</p>
                    </div>
                ))}
            </div>
            <div className={`${viewStories == false ? ' hidden ' : ''} h-screen w-screen min-w-full max-w-fit absolute bg-white top-0`} >
                <div className=' flex flex-col gap-2 p-1 '>
                    <div className=' flex flex-row justify-around gap-1 z-50 '>
                        {data.stories[currUserIndex].storySrc.map((src, i) =>
                            <div key={`${currUserIndex}-${i}`} className={` ${i < currStoryIndex ? 'bg-gray-600' : 'bg-gray-200'} rounded-full w-full h-1 `}>
                                {i == currStoryIndex && <div className=' bg-gray-600 rounded-full h-full progress '></div>}
                            </div>

                        )}
                    </div>
                    <div className=' flex flex-row justify-between z-50 '>
                        <div className=' flex flex-row gap-2 '>
                            <Image src={data.stories[currUserIndex].dpSrc} alt='dp' width={40} height={40} className=' rounded-full w-12 h-12 p-1 object-fill ' />
                            <div className=' flex flex-col gap-0 justify-center items-center '>
                                <p className=' text-xs font-semibold '>{data.stories[currUserIndex].username}</p>
                                <p className=' text-xs flex items-center justify-center '>♫ Song</p>
                            </div>
                        </div>
                        <div className=' flex flex-row gap-2 justify-center items-center '>
                            <div>...</div>
                            <button type='button' onClick={() => { onCloseStories() }} className=' z-50 '>x</button>
                        </div>
                    </div>
                    <div className=' flex flex-row justify-between items-center h-screen -mt-20'>
                        <div className=' rounded-full text-xs w-[25%] h-[80%] z-50 ' onClick={() => { handleLeftClick() }}></div>
                        <div className=' rounded-full text-xs w-[25%] h-[80%] z-50 ' onClick={() => { handleRightClick() }}></div>
                    </div>
                </div>
                <Image src={data.stories[currUserIndex].storySrc[currStoryIndex]} alt='story' width={50} height={100} className=' w-full h-full object-fill absolute top-0 z-5 ' />
            </div>
        </>
    )
}

export default Stories