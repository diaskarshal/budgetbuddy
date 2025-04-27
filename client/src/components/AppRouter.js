import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { authRoutes, publicRoutes } from "../routes";
import { Routes, Route, Navigate } from "react-router-dom";
import { MAIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth ? (
        <>
          {authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
        </>
      ) : (
        <>
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </>
      )}
    </Routes>
  );
};

export default observer(AppRouter);
