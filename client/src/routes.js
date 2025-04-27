import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Stats from "./pages/Stats";
import {
  MAIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  STATS_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: STATS_ROUTE,
    Component: Stats,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
