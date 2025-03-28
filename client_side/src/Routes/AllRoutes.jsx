import React from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "../Pages/Signup";
import { Login } from "../Pages/Login";
import { Home } from "../Pages/Home";
import VideoDisplayPage from "../Pages/VideoDisplayPage";
import VideoUploadPage from "../Pages/VideoUploadPage";
import PrivateRoutes from "./PrivateRoutes";
export const AllRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/videos"
          element={
            <PrivateRoutes>
              <VideoDisplayPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/videos/upload"
          element={
            <PrivateRoutes>
              <VideoUploadPage />
            </PrivateRoutes>
          }
        />
      </Routes>
    </React.Fragment>
  );
};
