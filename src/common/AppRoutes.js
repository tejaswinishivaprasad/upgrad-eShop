/* This component holds all the Route details of the EShop Application.
It uses react-router-dom for Routing logic*/

import { Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Home from "../components/home/Home";
import ProductForm from "../components/addEditProduct/ProductForm";
import AddAddress from "../components/addAddress/AddAddress";
import ProductDetails from "../components/productdetails/ProductDetails";
import Footer from "../common/footer/Footer";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:name" element={<Home />} />
        <Route path="/addproduct" element={<ProductForm mode="add" />} />
        <Route path="/editproduct/:id" element={<ProductForm mode="edit" />} />
        <Route path="/addaddress/:id/:qty" element={<AddAddress />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;
