import React from "react";
import { Route, Routes } from "react-router-dom";
import publicRoutes from "./PublicRoutes.routes";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { SimpleRouter } from "./SimpleRouter.routes";

const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        />
      ))}
      {SimpleRouter.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
