import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// react icons
import { BsArrow90DegRight } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import bgslider from '../../assets/img/rest/slider-bg.webp'
import slider1 from '../../assets/img/rest/slider1'
import slider2 from '../../assets/img/rest/slider2'
import slider3 from '../../assets/img/rest/slider3.webp'



const Slider = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <div className='relative '>
                <Swiper
                    modules={[Navigation, EffectFade]}
                    effect="fade" // Enable fade effect
                    speed={1000} // Transition speed
                    navigation={{
                        prevEl: prevRef.current, // Attach custom previous button
                        nextEl: nextRef.current, // Attach custom next button
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    spaceBetween={50}
                    slidesPerView={1}
                    className='-z-50 '
                >
                    <SwiperSlide
                        className=' text-white md:py-[100px] text-center py-10'
                        style={{
                            backgroundImage: `url(${bgslider})`
                        }}
                    >
                        <div className='container mx-auto px-2 md:flex items-center justify-between'>
                            <div className='md:w-[60%] w-[90%] text-start'>
                                <h1 className='md:text-[70px] text-[45px] text-start font-custom font-semibold'>Get Your New <br /> Clothes Collections </h1>
                                <span className=' border-t-2 border-[#C84C53]'></span>
                                <div class="w-[69px] h-1 bg-[#C84C53] my-5 text-[18px]"></div>
                                <p>There are many variations of passages of Lorem ipsum dolor sit amet.</p>
                                <div className='flex py-10'>
                                    <a href="" className='text-white border py-4 hover:bg-[#C84C53] hover:border-[#C84C53] px-6 rounded-[25px] font-custom transition duration-500'>Explore More <BsArrow90DegRight className='inline-block ms-2' /></a>
                                </div>
                            </div>
                            <div className='md:w-[40%] md:text-end text-center flex justify-center'>
                                <img src={slider1} alt="" className='w-[70%] text-center' />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                        className=' text-white md:py-[100px] text-center py-10'
                        style={{
                            backgroundImage: `url(${bgslider})`
                        }}
                    >
                        <div className='container mx-auto px-2 md:flex items-center justify-between'>
                            <div className='md:w-[60%] w-[90%] text-start'>
                                <h1 className='md:text-[70px] text-[45px] text-start font-custom font-semibold'>Get Your New <br /> Clothes Collections </h1>
                                <span className=' border-t-2 border-[#C84C53]'></span>
                                <div class="w-[69px] h-1 bg-[#C84C53] my-5 text-[18px]"></div>
                                <p>There are many variations of passages of Lorem ipsum dolor sit amet.</p>
                                <div className='flex py-10'>
                                    <a href="" className='text-white border py-4 hover:bg-[#C84C53] hover:border-[#C84C53] px-6 rounded-[25px] font-custom transition duration-500'>Explore More <BsArrow90DegRight className='inline-block ms-2' /></a>
                                </div>
                            </div>
                            <div className='md:w-[40%] md:text-end text-center flex justify-center'>
                                <img src={slider2} alt="" className='w-[70%] text-center' />
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide
                        className=' text-white md:py-[100px] text-center py-10'
                        style={{
                            backgroundImage: `url(${bgslider})`
                        }}
                    >
                        <div className='container mx-auto px-2 md:flex items-center justify-between'>
                            <div className='md:w-[60%] w-[90%] text-start'>
                                <h1 className='md:text-[70px] text-[45px] text-start font-custom font-semibold'>Get Your New <br /> Clothes Collections </h1>
                                <span className=' border-t-2 border-[#C84C53]'></span>
                                <div class="w-[69px] h-1 bg-[#C84C53] my-5 text-[18px]"></div>
                                <p>There are many variations of passages of Lorem ipsum dolor sit amet.</p>
                                <div className='flex py-10'>
                                    <a href="" className='text-white border py-4 hover:bg-[#C84C53] hover:border-[#C84C53] px-6 rounded-[25px] font-custom transition duration-500'>Explore More <BsArrow90DegRight className='inline-block ms-2' /></a>
                                </div>
                            </div>
                            <div className='md:w-[40%] md:text-end text-center flex justify-center'>
                                <img src={slider3} alt="" className='w-[70%] text-center' />
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                {/* Custom Buttons */}
                <button ref={prevRef} className='border md:px-5 px-4 md:py-5 py-4 hover:bg-[#C84C53] hover:border-[#C84C53] transition duration-500 absolute top-[50%] left-[2%] z-50 text-white rounded-full  '><FaArrowLeft className='md:text-[25px] text-[18px]' /></button>
                <button ref={nextRef} className='border md:px-5 px-4 md:py-5 py-4 hover:bg-[#C84C53] hover:border-[#C84C53] transition duration-500 absolute top-[50%] right-[2%] z-50 text-white rounded-full  '><FaArrowRight className='md:text-[25px] text-[18px]' /></button>
            </div >
        </>

    )
}

export default Slider