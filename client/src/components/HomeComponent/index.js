import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import ImageSlider from "../ImageSlider";
import "./style.css";
import AboutComponent from "../AboutComponent";
import BookingComponent from "../BookingComponent";

const HomeComponent = () => {
  const contactRef = useRef(null);
  const placeRef = useRef(null);

  const aboutRef = useRef(null);
  const bookingRef = useRef(null);

  const scrollToAbout = () => {
    window.scrollTo({ top: 450, behavior: "smooth" });
  };

  const scrollToBookEvent = () => {
    window.scrollTo({ top: 800, behavior: "smooth" });
    // bookingRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToEventPlace = () => {
    window.scrollTo({ top: 1310, behavior: "smooth" });

    // placeRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContactUs = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Disclosure
        as="nav"
        className="bg-white-800 w-full"
        style={{
          borderBottom: "1px solid red",
          padding: "14px 33px",
          position: "fixed",
          zIndex: "10",
          background: "white",
          marginTop: "-58px",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <h1
              onClick={scrollToHome}
              className="cursor-pointer"
              style={{ fontSize: "20px", fontWeight: "700" }}
            >
              <span className="text-black-900">UBooking</span>
              <span className="text-red-600">.com</span>
            </h1>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <a
                // href="/home"
                onClick={scrollToHome}
                className="text-black-900 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Home
              </a>
              <a
                // href="#about"
                onClick={scrollToAbout}
                className="text-black-900 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              >
                About
              </a>
              <a
                // href="#book"
                onClick={scrollToBookEvent}
                className="text-black-900 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Book Event
              </a>

              <a
                // href="#book"
                onClick={scrollToEventPlace}
                className="text-black-900 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Event Places
              </a>

              <a
                // href="#book"
                onClick={scrollToContactUs}
                className="text-black-900 hover:bg-red-500 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              >
                Contact Us
              </a>

            </div>
          </div>
        </div>
      </Disclosure>
      <div style={{ marginTop: "58px" }}>
        <div>
          <ImageSlider />
        </div>

        <div ref={aboutRef}>
          <AboutComponent component={"about"} />
        </div>

        <div ref={bookingRef}>
          <BookingComponent component={"booking"}/>
        </div>

        <div ref={placeRef}>
          <AboutComponent component={"places"} />
        </div>

        <div ref={contactRef}>
          <BookingComponent component={"contact"}/>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
