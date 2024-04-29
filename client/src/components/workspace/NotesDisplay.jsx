import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import parse from "html-react-parser";

const NotesDisplay = ({
  notesSlides,
  noteLists,
  setNoteSelected,
  navigate,
}) => {
  return (
    <Swiper
      slidesPerView={notesSlides}
      modules={[FreeMode]}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      className="mySwiper w-full"
    >
      {noteLists.map((n, i) => {
        return (
          <SwiperSlide
            className="md:w-[30%] p-5 bg-[#DE3163] hover:bg-[#FF004F] dark:bg-[#242124] dark:hover:bg-[#FF004F] text-white cursor-pointer rounded-md transition-all duration-500"
            key={i}
          >
            <div
              className="h-[17rem] "
              onClick={() => {
                setNoteSelected(n.id);
                navigate(`/client/notes/${n.id}`);
              }}
            >
              <h1 className="text-[1.8rem] border-b border-white mb-2 ">
                {n.title ? n.title : "Untitled Note"}
              </h1>

              <div className="lineContent whitespace-pre-line">
                {n.content ? parse(n.content) : ""}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default NotesDisplay;
