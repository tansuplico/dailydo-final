import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/free-mode";
import { Doughnut } from "react-chartjs-2";
import { FreeMode } from "swiper/modules";

const TasksChart = ({ groupedTaskList, chartSlides }) => {
  return (
    <Swiper
      slidesPerView={chartSlides}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
      className="mySwiper w-full"
    >
      {groupedTaskList.map((g, i) => {
        return (
          <SwiperSlide className="w-[30%] p-4" key={i}>
            <h1 className="text-[1.3rem] dark:text-white">
              {g.taskGroupName ? g.taskGroupName : "Untitled Group"}
            </h1>

            <Doughnut
              data={{
                labels: ["ToDo", "Doing", "Done"],
                datasets: [
                  {
                    label: "Tasks",
                    data: [
                      g.taskList.toDoList.length,
                      g.taskList.doingList.length,
                      g.taskList.doneList.length,
                    ],
                    backgroundColor: [
                      "rgb(255, 99, 132)",
                      "rgb(54, 162, 235)",
                      "rgb(255, 205, 86)",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TasksChart;
