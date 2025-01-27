import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ScrollTrigger } from "gsap/all";
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, sethasClicked] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [loadedVideo, setloadedVideo] = useState(0);

    const totalVideos = 4;
    const nextVidRef = useRef(null);
    const handleMiniVdClick = () =>{
        sethasClicked(true);
        setCurrentIndex(upcomingVdClick);
    }

    useEffect(()=>{
        if(loadedVideo === totalVideos-1){
            setLoading(false);
        }
    },[loadedVideo])

    useGSAP(
        () => {
          if (hasClicked) {
            gsap.set("#next-video", { visibility: "visible" });
            gsap.to("#next-video", {
              transformOrigin: "center center",
              scale: 1,
              width: "100%",
              height: "100%",
              duration: 1,
              ease: "power1.inOut",
              onStart: () => nextVidRef.current.play(),
            });
            gsap.from("#current-video", {
              transformOrigin: "center center",
              scale: 0,
              duration: 1.5,
              ease: "power1.inOut",
            });
          }
        },
        {
          dependencies: [currentIndex],
          revertOnUpdate: true,
        }
    );

    useGSAP(()=>{
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: "#video-frame",
              start: "center center",
              end: "bottom center",
              scrub: true,
            },
        });

    });

    const upcomingVdClick = (currentIndex % totalVideos) +1;
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
    const handleVideoLoad = () => {
        setloadedVideo((prev) => prev +1);
    }

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
        {Loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
            {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
            </div>
        )}
        <div id = "video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-200'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video 
                            id="current-video"
                            ref = {nextVidRef} src={getVideoSrc(currentIndex + 1)} loop muted
                            className='size-64 origin-center scale-150 object-cover object-center' onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>
                <video
                    ref={nextVidRef}
                    id="next-video"
                    src={getVideoSrc(currentIndex)}
                    loop muted
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />
                <video 
                    src = {getVideoSrc(currentIndex === totalVideos -1 ? 1 : currentIndex)}
                    autoPlay loop muted
                    className='absolute left-0 top-0 size-full object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-100'>
                GAMI<b>N</b>G
            </h1>
            <div className='absolute top-0 left-0 z-40 size-full'>
            <div className=' mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
                redefi<b>n</b>e
            </h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                Enter the Metagame Layer <br/> Unleash the play Economy
            </p>
            <Button id="watch-trailer" 
            title='watch-trailer' 
            leftIcon = {<TiLocationArrow />} containerClass = "bg-yellow-300 flex-center gap-1"/>
            </div>
            </div>
        </div>
        <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>
                GAMI<b>N</b>G
        </h1>
    </div>
  )
}

export default Hero;