import React from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { AllRoutes } from "./Routes/AllRoutes";
import Footer from "./Components/Footer";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <AllRoutes />
      
    </React.Fragment>
  );
}

export default App;
