import React from "react";
import Ads from "../../features/HomeFeature/Ads";
import CategoryHome from "../../features/HomeFeature/CategoryHome";
import Clothing from "../../features/HomeFeature/Clothing";
import Foodies from "../../features/HomeFeature/Foodies";
import Promotion from "../../features/HomeFeature/Promotion";
import Feedback from "../../features/HomeFeature/Feedback";
import Selling from "../../features/HomeFeature/Selling";
import Blog from "../../features/HomeFeature/Blog";
import Service from "../../features/HomeFeature/Service";

const HomePage = () => {
  return (
    <>
      <Ads />
      <CategoryHome />
      <Clothing />
      <Foodies />
      <Promotion />
      <Feedback />
      <Selling />
      <Blog />
      <Service />
    </>
  );
};

export default HomePage;
