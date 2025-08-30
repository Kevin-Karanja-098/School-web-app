import React, { useState, useEffect, useRef } from "react";
import { Button, Typography,  Grid, Box  } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const images = [
  "/images/kfee.jpg",
  "/images/minee.jpg",
  "/images/kevin.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvh2oa_SCn6vWq93rKgk0HsQrM-pao8vUFpA&s",
  "/images/kev.jpg",
  "https://media.istockphoto.com/id/1452736789/photo/mature-man-helps-younger-man-verbalize-problems-in-therapy.jpg?s=612x612&w=0&k=20&c=sLU2wcEE-TLYYPjYXfXThoBcafbNGU3n7DUzPF1FOwc=",
   "/images/kiv.jpg",
  "https://media.istockphoto.com/id/1389444855/photo/shot-of-an-attractive-young-woman-sitting-and-talking-to-her-psychologist-during-a.jpg?s=612x612&w=0&k=20&c=LpV9HmdD0_Udg4YlttvwoJyLZWJThxXq-IJKeiy3zbs=",
];

const sections = [
  { 
    title: "Vision", 
    bgColor: "#f8bbd0", 
    content: "Our vision is to create a world where mental health support is accessible to everyone, empowering individuals to lead fulfilling lives."
  },
  { 
    title: "Mission", 
    bgColor: "#c5e1a5", 
    content: "Our mission is to provide a safe and inclusive space for peer counseling, fostering emotional well-being and resilience through meaningful conversations."
  },
  { 
    title: "Dreams", 
    bgColor: "#90caf9", 
    content: "We dream of a future where stigma around mental health is eradicated, and every person feels supported and understood."
  }
];

const HomePage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const swiperRef = useRef(null); // Reference for the Swiper instance

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", () => {});
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA Installed");
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Function to handle next slide
  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  // Function to handle previous slide
  const handleBack = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <Box style={{ paddingBottom: "64px",paddingTop: "64px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ backgroundColor: "#4caf50", marginTop: "50px" }}>
            <Typography 
              variant="h3"  
              sx={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}
            >
              Welcome to Karatina University Counseling
            </Typography>
            <Typography variant="body1"  style={{ marginTop: "10px", color: "#fff" }}>
              We're here to provide a safe and supportive space for students to talk about their mental health and well-being.
            </Typography>
          </Grid>
        {/* Image Carousel with custom navigation */}
        <Grid item xs={12} style={{ position: "relative" }}> {/* Add position relative */}
          <Swiper 
            ref={swiperRef}
            spaceBetween={30} 
            slidesPerView={1} 
            autoplay={{ delay: 1000 }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={img} 
                  alt={`Slide ${index}`} 
                  style={{ width: "100%", height: "300px", objectFit: "cover" }} 
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <Box 
            marginLeft={"20px"}
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            position="absolute" 
            top="50%" 
            left="0" 
            right="0" 
            zIndex="10"
          >
            <Button onClick={handleBack} style={{ backgroundColor: "#ffffff", borderRadius: "50%" }}>
              <ArrowBackIos />
            </Button>
            <Button onClick={handleNext} style={{ backgroundColor: "#ffffff", borderRadius: "50%" }}>
              <ArrowForwardIos />
            </Button>
          </Box>
        </Grid>
        
        {/* Sections with different BG colors */}
        {sections.map((section, index) => (
          <Grid item xs={12} key={index} style={{ backgroundColor: section.bgColor, padding: "20px", marginBottom: "20px" }}>
            <Typography variant="h4" align="center">{section.title}</Typography>
            <Typography variant="body1" align="center" style={{ marginTop: "10px" }}>
              {section.content}
            </Typography>
          </Grid>
        ))}
        
        {/* Welcome Section with Green Background */}
       
      </Grid>
      
      {/* PWA Install Button */}
      {deferredPrompt && (
        <Button variant="contained" color="primary" onClick={handleInstall} style={{ margin: "20px auto", display: "block" }}>
          Install App
        </Button>
      )}
    </Box>
  );
};

export default HomePage;