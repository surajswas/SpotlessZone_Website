import React from "react";
import { Routes, Route } from "react-router-dom";
import EmailVerify from "../Components/EmailVerify";
import Homepage from "../Components/Homepage/Homepage";
import Login from "../Components/Login";
import Addproduct from "../Components/Products/AddProduct";
import UpdateProduct from "../Components/Products/UpdateProduct";
import Product from "../Components/Products/ViewProduct";
import EditProfile from "../Components/Profile/EditProfile";
import SignUp from "../Components/SignUp";

export const Container = () => {
  //in login branch
  // const user = localStorage.getItem("token");
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/addProduct" element={<Addproduct />}></Route>
        {/* {user && (
          
        )} */}
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
        {/* <Route path="/" exact element={<Navigate replace to="/login" />} /> */}
        <Route
          path="/customer/register/:id/verify/:token"
          element={<EmailVerify />}
        />
        <Route path='/getproduct' element={<Product/>}></Route>
        <Route path='/update-product/:pid' element={<UpdateProduct/>}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>

      </Routes>
    </>
  );
};
