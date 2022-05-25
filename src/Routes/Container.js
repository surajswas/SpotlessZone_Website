import React from "react";
import { Routes, Route } from "react-router-dom";
import AboutUs from "../Components/AboutUs/AboutUs";
import ProductCart from "../Components/Cart/Cart";
import SingleProductInfo from "../Components/Cart/SingleProuductPage";
import AllProducts from "../Components/Cart/ViewProducts";
import EmailVerify from "../Components/EmailVerify";
import Hiring from "../Components/Hiring/Hiring";
import Homepage from "../Components/Homepage/Homepage";
import Login from "../Components/Login";
import Addproduct from "../Components/Products/AddProduct";
import AdminUpdate from "../Components/Products/AdminUpdateproduct";
import UpdateProduct from "../Components/Products/UpdateProduct";
import Product from "../Components/Products/ViewProduct";
import EditProfile from "../Components/Profile/EditProfile";
import UserProfile from "../Components/Profile/UserProfile";
import AllServices from "../Components/Services/AllServices";
import AddServiceCategory from "../Components/Services/AddServiceCategory";
import UpdateCategoryService from "../Components/Services/UpdateCategoryService";
import ViewServiceCategory from "../Components/Services/ViewServiceCategory";
import SignUp from "../Components/SignUp";
import { parseJwt } from "../utils/parseJwt";
import AddService from "../Components/Services/AddService";
import AllCommercialServices from "../Components/Services/AllCommercialServices";
import AllResidentialServices from "../Components/Services/AllResidentialServices";
import SingleService from "../Components/Services/SingleService";
import AddPicture from "../Components/Gallery/AddPicture";
import DisplayGallery from "../Components/Gallery/DisplayGallery";
export const Container = () => {
  //in login branch
  const user = localStorage.getItem("token");
  const decodeUser = parseJwt(user)
  // console.log(decodeUser.user)
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Homepage />} />


        {/* Admin route for product */}
        <Route path="/addProduct" element={<Addproduct />}></Route>
        <Route path='/getproduct' element={<Product/>}></Route>
        <Route path='/adminUpdateproduct' element={<AdminUpdate/>}></Route>
        <Route path='/update-product/:pid' element={<UpdateProduct/>}></Route>
        
        
        {/* {user && (
          
        )} */}

        {/* {
          decodeUser.user?.role === "admin"?
          <Route path="/edit-profile" element={<EditProfile />}></Route>
          :
          <></>
        } */}


        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<Login />} />
        {/* <Route path="/" exact element={<Navigate replace to="/login" />} /> */}
        <Route
          path="/customer/register/:id/verify/:token"
          element={<EmailVerify />}
        />

        {/* <Route path='/update-product' element={<Update/>}></Route> */}

        {/* <Route path='/update-product' element={<UpdateProduct/>}></Route> */}

        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/profile-creation" element={<UserProfile />}></Route>


       

        <Route path='/job-form-submit' element={<Hiring/>}></Route>
        <Route path='/cart' element={<ProductCart/>}></Route>

        <Route path='/display-all-products' element={<AllProducts/>}></Route>
        <Route path='/single-product/:pid' element={<SingleProductInfo/>}></Route>


        <Route path='/all-services' element={<AllServices/>}></Route>


        <Route path='/add-service-category' element={<AddServiceCategory/>}></Route>
        <Route path='/view-service-category' element={<ViewServiceCategory/>}></Route>
        <Route path='/update-service-category/:scid' element={<UpdateCategoryService/>}></Route>

        <Route path='/add-service' element={<AddService/>}></Route>
        <Route path='/all-commercial-services' element={<AllCommercialServices/>}></Route>
        <Route path='/all-residential-services' element={<AllResidentialServices/>}></Route>

        <Route path='/single-service/:sid' element={<SingleService/>}></Route>

        <Route path='/add-picture' element={<AddPicture/>}></Route>
        <Route path='/gallery' element={<DisplayGallery/>}></Route>








        <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>




        <Route path='/getproduct' element={<Product/>}></Route>
        <Route path='/update-product/:pid' element={<UpdateProduct/>}></Route>

        <Route path="/edit-profile" element={<EditProfile />}></Route>


      </Routes>
    </>
  );
};
