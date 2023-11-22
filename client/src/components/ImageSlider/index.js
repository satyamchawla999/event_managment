import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    require("../../assets/images/photo1.jpg"),
    require("../../assets/images/photo2.jpg"),
    require("../../assets/images/photo3.jpg"),
    require("../../assets/images/photo4.jpg"),
  ];

  useEffect(() => {
    // Function to handle automatic image rotation
    const rotateImages = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };

    // Set an interval to rotate images every 5 seconds
    const intervalId = setInterval(rotateImages, 5000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="image-slider"
      style={{
        width: "100%",
        height: "450px",
        display: "flex",
        borderBottom: "1px solid red",
        // backgroundColor:"#e1edfa",
        backgroundColor:"#F3F3F3"
      }}
    >
      <div
        className="flex item-center , justify-center"
        style={{ width: "50%", padding: "30px", flexDirection: "column" }}
      >
        <h1
          style={{
            fontSize: "35px",
            fontWeight: "650",
            // color: "#6366F1",
            lineHeight: "1.3",
          }}
          // className="text-blue-1000"
        >
          <span className="text-black-900">Welcome to </span>
          <br></br>
          <span className="text-red-600">Chitkara University</span>
          <span className="text-black-900"> Event Booking</span>
        </h1>
        <p>Discover and Reserve the Best Events on Campus!</p>

        <br></br>

        <div className="flex items-center">
          <h1 style={{ fontSize: "30px", fontWeight: "700" }}>
            <span className="text-black-900">UBooking</span>
            <span className="text-red-600">.com</span>
          </h1>
          <p
            className="mr-4 ml-4"
            style={{ fontWeight: "800px", fontSize: "30px" }}
          >
            x
          </p>
          <img
            style={{ height: "30px" }}
            src="https://www.chitkara.edu.in/chitkara-university-logo.png"
            alt="logo"
          ></img>
        </div>
      </div>
      <div style={{ width: "50%", padding: "30px" }}>
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "5px",
            border: "1px solid red",
          }}
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
