import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'

const Story = () => {
  return (
    <section id="story" className='min-h-dvh w-screen bg-black text-blue-50'>
        <div className='flex size-full flex-col items-center py-10 pb-24'>
            <p className='font-general text-sm uppercase md:text-[10px]'>
                The multiversal ip world
            </p>
            <div className='relative size-full'>
                <AnimatedTitle
                title="story of a hidden realm"
                sectionId ="#story"
                containerClass = "mt-5 pointer-events-none mix-blend-difference relative z-10"
                />
            </div>
            <div className='story-img-container'>
                <div className='story-img-mask'>
                    <div className='story-img-content'>
                        <img
                        src='/img/entrance.webp'
                        alt="entrance"
                        className='object-contain'
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Story