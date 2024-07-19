import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp,  Order} from "@pages";
// import { Drawer } from "../components";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<App />}>
        <Route index element={<SignIn />} />
          <Route path="orders" element={<Order />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
