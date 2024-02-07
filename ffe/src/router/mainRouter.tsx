import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Landing from "../screens/Landing";
import Login from "../screens/auth/login";
import Register from "../screens/auth/reister";
import OnSuccessScreen from "../screens/success/OnSuccessScreen";
import OnCancelScreen from "../screens/success/OnCancelScreen";
import MainScreen from "../screens/main/MainScreen";
import PricingCard from "../screens/main/PricingCard";
import ActionCard from "../screens/main/ActionCard";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        index: true,
        path: "/login",
        element: <Login />,
      },
      {
        index: true,
        path: "/register",
        element: <Register />,
      },
      {
        index: true,
        path: "/success",
        element: <OnSuccessScreen />,
      },
      {
        index: true,
        path: "/failed",
        element: <OnCancelScreen />,
      },
      {
        index: true,
        path: "/main",
        element: <MainScreen />,
      },
      {
        index: true,
        path: "/price",
        element: <PricingCard />,
      },
      {
        index: true,
        path: "/action",
        element: <ActionCard />,
      },
    ],
  },
]);
