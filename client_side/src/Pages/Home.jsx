import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Footer from "../Components/Footer";

export const Home = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <Features />
      <Footer />
    </React.Fragment>
  );
};
