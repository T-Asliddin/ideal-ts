import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, SignUp,  Order,Asosiy,Service} from "@pages";
 import { Drawer } from "@ui";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/drawer/*" element={<Drawer/>}>
          <Route index element={<Asosiy />} />
          <Route path="order" element={<Order />} />
          <Route path="servise" element={<Service />} />
        </Route>
          <Route path="orders" element={<Order />} />
        
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
