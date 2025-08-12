import React from "react";
import ShopSidebar from "../../features/ShopFeature/ShopSidebar";
import ShopProductList from "../../features/ShopFeature/ShopProductList";

const ShopPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto py-8">
      {/* Sidebar */}
      <div className="md:w-1/4 w-full">
        <ShopSidebar />
      </div>
      {/* Main content */}
      <div className="flex-1">
        <ShopProductList />
      </div>
    </div>
  );
};

export default ShopPage;
