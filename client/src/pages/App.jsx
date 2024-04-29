import React, { useState, useRef, useEffect } from "react";
import markupWhole from "../assets/markup-whole.png";
import Navbar from "../components/homepage/Navbar";
import Banner from "../components/homepage/Banner";
import Features from "../components/homepage/Features";
import Reviews from "../components/homepage/Reviews";
import WideBanner from "../components/homepage/WideBanner";
import Preview from "../components/homepage/Preview";

function App() {
  const [openAccordion, setOpenAccordion] = useState(true);
  const [accordionOpen, setAccordionOpen] = useState(1);
  const [openNav, setOpenNav] = useState(false);
  const featureRef = useRef(null);
  const reviewsRef = useRef(null);
  const previewRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const toggleBodyOverflow = (isOpen) => {
      document.body.style.overflow = isOpen ? "hidden" : "unset";
    };
    toggleBodyOverflow(openNav);
    return () => {
      toggleBodyOverflow(false);
    };
  }, [openNav]);

  return (
    <>
      <Navbar
        scrollToSection={scrollToSection}
        featureRef={featureRef}
        reviewsRef={reviewsRef}
        previewRef={previewRef}
        setOpenNav={setOpenNav}
        openNav={openNav}
      />
      <main className="w-full flex flex-center flex-col">
        <Banner />

        <section className="w-[90%] xl:w-full flex flex-center my-[7rem] lg:my-[10rem] gap-5">
          <div>
            <img src={markupWhole} alt="markup-whole" />
          </div>
        </section>
        <Features featureRef={featureRef} />
        <Reviews reviewsRef={reviewsRef} />
        <WideBanner />
        <Preview
          previewRef={previewRef}
          openAccordion={openAccordion}
          accordionOpen={accordionOpen}
          setOpenAccordion={setOpenAccordion}
          setAccordionOpen={setAccordionOpen}
        />
      </main>

      <footer className="w-full border-t border-[#c0c0c0] p-8">
        <div className="flex flex-col lg:flex-row gap-5 text-[.8rem] lg:text-[1rem] justify-between items-center">
          <h1>
            This website uses cookies to ensure you get the best experience on
            our website.
          </h1>
          <h1 className="text-[#c0c0c0]">
            Copyright © 2024. All rights are reserved
          </h1>
        </div>
      </footer>
      {openNav && (
        <div className="fixed top-0 w-full h-full bg-black opacity-[.5] z-30"></div>
      )}
    </>
  );
}

export default App;
