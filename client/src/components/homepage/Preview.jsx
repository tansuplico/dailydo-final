import React from "react";
import previewOne from "../../assets/preview-one.png";
import previewTwo from "../../assets/preview-two.png";
import previewThree from "../../assets/preview-three.png";
import previewFour from "../../assets/preview-four.png";
import thinRightDark from "../../assets/thin-right-dark.png";

const Preview = ({
  previewRef,
  openAccordion,
  accordionOpen,
  setOpenAccordion,
  setAccordionOpen,
}) => {
  return (
    <section
      className="w-full flex flex-center my-[4rem] lg:my-[6rem]"
      ref={previewRef}
    >
      <div className="w-[90%] lg:w-[80%] flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[30%] h-full flex flex-col gap-3 order-2 lg:order-1">
          <div className="w-full flex flex-col gap-3 transition-all">
            <div className="w-full flex items-center justify-between">
              <h1 className="poppins-medium"> Organize Tasks </h1>
              <img
                src={thinRightDark}
                alt="thin-right"
                className={`${
                  openAccordion && accordionOpen === 1 && "rotate-90"
                } w-[20px] cursor-pointer transition-all`}
                onClick={() => {
                  setOpenAccordion(true);
                  setAccordionOpen(1);
                }}
              />
            </div>
            <div
              className={`w-full relative ${
                openAccordion && accordionOpen === 1
                  ? "h-[18rem] mdlg:h-[16rem] xl:h-[14rem] mt-2"
                  : "h-auto"
              } overflow-hidden transition-all`}
            >
              <p
                className={`w-full absolute ${
                  openAccordion && accordionOpen === 1
                    ? "top-0"
                    : "top-[-9.5rem]"
                } poppins-regular duration-500`}
              >
                Effortlessly categorize and prioritize your tasks with our
                intuitive organization feature. Seamlessly create task lists,
                set deadlines, and assign tags to ensure clarity and efficiency
                in managing your agenda. With customizable sorting options, you
                can tailor your workspace to suit your workflow, empowering you
                to stay focused and productive.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 transition-all">
            <div className="w-full flex items-center justify-between">
              <h1 className="poppins-medium"> Tasks Group </h1>
              <img
                src={thinRightDark}
                alt="thin-right"
                className={`${
                  openAccordion && accordionOpen === 2 && "rotate-90"
                } w-[20px] cursor-pointer transition-all`}
                onClick={() => {
                  setOpenAccordion(true);
                  setAccordionOpen(2);
                }}
              />
            </div>
            <div
              className={`w-full relative ${
                openAccordion && accordionOpen === 2
                  ? "h-[12rem] lg:h-[12rem] xl:h-[8rem] mt-2"
                  : "h-auto"
              } overflow-hidden transition-all`}
            >
              <p
                className={`w-full absolute ${
                  openAccordion && accordionOpen === 2
                    ? "top-0"
                    : "top-[-9.5rem]"
                } poppins-regular duration-500`}
              >
                Effortlessly organize and manage multiple task lists with our
                intuitive Tasks Group feature. Group tasks based on projects or
                priorities, enabling structured task management and enhanced
                productivity.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 transition-all">
            <div className="w-full flex items-center justify-between">
              <h1 className="poppins-medium"> Note Management </h1>
              <img
                src={thinRightDark}
                alt="thin-right"
                className={`${
                  openAccordion && accordionOpen === 3 && "rotate-90"
                } w-[20px] cursor-pointer transition-all`}
                onClick={() => {
                  setOpenAccordion(true);
                  setAccordionOpen(3);
                }}
              />
            </div>
            <div
              className={`w-full relative ${
                openAccordion && accordionOpen === 3
                  ? "h-[20rem] lg:h-[25rem] mdlg:h-[20rem] xl:h-[17rem] mt-2"
                  : "h-auto"
              } overflow-hidden transition-all`}
            >
              <p
                className={`w-full absolute ${
                  openAccordion && accordionOpen === 3
                    ? "top-0"
                    : "top-[-9.5rem]"
                } poppins-regular duration-500`}
              >
                Streamline your note-taking process with our comprehensive note
                management tool. Capture ideas, insights, and important
                information effortlessly, and organize them into structured
                notebooks and sections. Utilize formatting tools to highlight
                key points, attach files, and create hyperlinks for enriched
                content. With seamless synchronization across devices, your
                notes are accessible anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 transition-all">
            <div className="w-full flex items-center justify-between">
              <h1 className="poppins-medium"> Backup Notes </h1>
              <img
                src={thinRightDark}
                alt="thin-right"
                className={`${
                  openAccordion && accordionOpen === 4 && "rotate-90"
                } w-[20px] cursor-pointer transition-all`}
                onClick={() => {
                  setOpenAccordion(true);
                  setAccordionOpen(4);
                }}
              />
            </div>
            <div
              className={`w-full relative ${
                openAccordion && accordionOpen === 4
                  ? "h-[12rem] lg:h-[13rem] xl:h-[8rem] mt-2"
                  : "h-auto"
              } overflow-hidden transition-all`}
            >
              <p
                className={`w-full absolute ${
                  openAccordion && accordionOpen === 4
                    ? "top-0"
                    : "top-[-9.5rem]"
                } poppins-regular duration-500`}
              >
                Never worry about losing important notes again with our
                automatic backup system. Deleted notes are securely stored and
                easily recoverable, ensuring your valuable information is always
                safe and accessible.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[70%] h-full flex flex-center order-1 lg:order-2">
          <img
            src={
              accordionOpen === 1
                ? previewOne
                : accordionOpen === 2
                ? previewTwo
                : accordionOpen === 3
                ? previewThree
                : accordionOpen === 4
                ? previewFour
                : null
            }
            alt="preview"
          />
        </div>
      </div>
    </section>
  );
};

export default Preview;
