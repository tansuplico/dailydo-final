import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const Reviews = ({ reviewsRef }) => {
  return (
    <section
      className="w-full flex flex-center my-[4rem] lg:my-[6rem]"
      ref={reviewsRef}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-full flex flex-col flex-center gap-5 p-5 lg:p-16 text-center">
            <p className="poppins-regular-italic w-[70%] lg:w-[50%] text-[1rem] sm:text-[1.3rem] lg:text-[1.8rem] xl:text-[2.5rem]">
              "DailyDo has completely
              <span className="text-[#DE3163]"> revolutionized </span> how I
              stay organized and on top of my tasks! Its
              <span className="text-[#DE3163]"> seamless integration </span>
              of note-taking and task management makes my life so much
              <span className="text-[#DE3163]"> easier</span>. Highly
              recommend!"
            </p>
            <span className="text-[1.2rem]"> Raymond Crook </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col flex-center gap-5 p-5 lg:p-16 text-center">
            <p className="poppins-regular-italic w-[70%] lg:w-[50%] text-[1rem] sm:text-[1.3rem] lg:text-[1.8rem] xl:text-[2.5rem]">
              "I've tried many
              <span className="text-[#DE3163]"> productivity </span>apps before,
              but none come close to
              <span className="text-[#DE3163]"> DailyDo</span>. Its intuitive
              interface and powerful features have boosted my
              <span className="text-[#DE3163]"> productivity </span>
              tenfold. I can't imagine my life without it!"
            </p>
            <span className="text-[1.2rem]"> Dhonnah Laine </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full flex flex-col flex-center gap-5 p-5 lg:p-16 text-center">
            <p className="poppins-regular-italic w-[70%] lg:w-[50%] text-[1rem] sm:text-[1.3rem] lg:text-[1.8rem] xl:text-[2.5rem]">
              "DailyDo has been a
              <span className="text-[#DE3163]"> game-changer </span>for me. As
              someone who juggles multiple projects and
              <span className="text-[#DE3163]"> deadlines</span>, having all my
              notes and tasks in one place has been a
              <span className="text-[#DE3163]"> lifesaver </span>. It's like
              having a personal assistant in my pocket!"
            </p>
            <span className="text-[1.2rem]"> Lara Bautista </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Reviews;
