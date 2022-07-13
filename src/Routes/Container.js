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
import UpdateProduct from "../Components/Products/AdminUpdateproduct";
import Product from "../Components/Products/ViewProduct";
import EditProfile from "../Components/Profile/EditProfile";
import UserProfile from "../Components/Profile/UserProfile";
import AllServices from "../Components/Services/AllServices";
import AddServiceCategory from "../Components/Services/AddServiceCategory";
import UpdateCategoryService from "../Components/Services/UpdateCategoryService";
import SignUp from "../Components/SignUp";
import { parseJwt } from "../utils/parseJwt";
import AddService from "../Components/Services/AddService";
import AllCommercialServices from "../Components/Services/AllCommercialServices";
import AllResidentialServices from "../Components/Services/AllResidentialServices";
import SingleService from "../Components/Services/SingleService";
import AddPicture from "../Components/Gallery/AddPicture";
import DisplayGallery from "../Components/Gallery/DisplayGallery";
import UserDashboard from "../Components/UserDashboard/UserDashboard";
import TestingService from "../Components/Services/TestingService";
import TestBookService from "../Components/Services/TestingBookService";
import { ToastContainer } from "react-toastify";
import Accordion from "../Components/Faq/Accordion";
import Productfaq from "../Components/Faq/Productfaq";
import Trainingfaq from "../Components/Faq/Trainingfaq";
// import Contactus from "../Components/Contactus/Contactus";
import Contactus from "../Components/Contactus/Contactus";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import Blogs from "../Components/Blogs/Blogs";
import BlogDetail from "../Components/Blogs/BlogDetail";
import AdminBlogDetail from "../Components/Admin/AdminBlogDetail";
import AdminBlogHome from "../Components/Admin/AdminBlogHome";
import AdminProducts from "../Components/Products/AdminViewProducts";
import AdminUpdateProduct from "../Components/Products/AdminUpdateproduct";
import Notification from "../Components/Admin/Notification";
import ToolTip from "../Components/ToolTIp";
import Gallery from "../Components/galleryy/Gallery";
import Checkout from "../Components/BuyProduct/Checkout";
import ServiceOrderHistory from "../Components/Admin/ServiceOrderHistory";
import AdminGallery from "../Components/Gallery/AdminGallery";
import AdminUpdateGallery from "../Components/Gallery/UpdateGallery";
import AdminBlogPost from "../Components/Admin/AdminBlogPost";
import ForgotPasswort from "../Components/ForgotPassword";
import PasswordReset from "../Components/PasswordReset";
// import ProductHistory from "../Components/Admin/ProductHistory";
import AdminServiceCategory from "../Components/Services/AdminServiceCategory";
import AdminService from "../Components/Services/AdminService";
import AdminUpdateService from "../Components/Services/UpdateService";
import UserProfileView from "../Components/Profile/ProfileView";
import Search from "../Components/Search/Search";
import ServiceSearch from "../Components/Search/ServiceSearch";
import ProductOrderHistory from "../Components/Profile/ProductOrderHistory";
import ProductWishlist from "../Components/Wishlist/ProductWishlist";
import AddressBook from "../Components/Profile/AddressBook";
import { UserProvider } from "../Components/context/UserContext";


export const Container = () => {
  //in login branch
  const token = localStorage.getItem("token");
  const decodeUser = parseJwt(token);

  return (
    <>
      <ToastContainer />

      <UserProvider>
        <Routes>
          <Route path="/tooltip" element={<ToolTip />} />
          {/* for admin purpose only */}
          {token && decodeUser.user?.role === "admin" && (
            <>
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/update-product/:pid"
                element={<AdminUpdateProduct />}
              ></Route>
              <Route
                exact
                path="/view-admin-products"
                element={<AdminProducts adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/addProduct"
                element={<Addproduct adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/update-product/:pid"
                element={<UpdateProduct adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/notifications"
                element={<Notification adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/admin-gallery"
                element={<AdminGallery adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/add-picture"
                element={<AddPicture adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/update-image/:gid"
                element={<AdminUpdateGallery adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/admin-blog-home"
                element={<AdminBlogHome adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/admin-blog-post"
                element={<AdminBlogPost adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/service-order-history"
                element={<ServiceOrderHistory adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/product-order-history"
                element={<ProductOrderHistory />}
              ></Route>

              <Route
                path="/add-service-category"
                element={<AddServiceCategory adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/view-service-category"
                element={<AdminServiceCategory adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/add-service"
                element={<AddService adminData={decodeUser.user} />}
              ></Route>
              <Route
                path="/view-services"
                element={<AdminService adminData={decodeUser.user} />}
              ></Route>

              <Route
                path="/update-service/:sid"
                element={<AdminUpdateService adminData={decodeUser.user} />}
              ></Route>
            </>
          )}

          {/* for customer activity only */}
          {token && decodeUser.user?.role === "user" && (
            <>
              <Route path="/all-services" element={<AllServices />}></Route>
              <Route
                path="/user-dashboard"
                element={<UserDashboard userData={decodeUser.user} />}
              ></Route>
              <Route path="/cart" element={<ProductCart />}></Route>
              <Route path="/profile-creation" element={<UserProfile />}></Route>
              <Route path="/edit-profile" element={<EditProfile />}></Route>
              <Route path="/view-profile" element={<UserProfileView />}></Route>
              <Route path="/product-order-history" element={<ProductOrderHistory />}></Route>
              <Route path="/product-wishlist" element={<ProductWishlist />}></Route>
              <Route path="/address-book" element={<AddressBook />}></Route>



            </>
          )}
          <Route path="/single-service/:sid" element={<SingleService />}></Route>
          <Route
            path="/all-commercial-services"
            element={<AllCommercialServices />}
          ></Route>
          <Route
            path="/all-residential-services"
            element={<AllResidentialServices />}
          ></Route>
          <Route path="/display-all-products" element={<AllProducts />}></Route>
          <Route
            path="/single-product/:pid"
            element={<SingleProductInfo />}
          ></Route>

          <Route
            path="/search-product/:query"
            element={<Search />}
          ></Route>

          <Route
            path="/search-service/:query"
            element={<ServiceSearch />}
          ></Route>

          <Route path="/" exact element={<Homepage />} />

          <Route path="/getproduct" element={<Product />}></Route>

          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/customer/register/:id/verify/:token"
            element={<EmailVerify />}
          />

          <Route path="/job-form-submit" element={<Hiring />}></Route>

          <Route
            path="/update-service-category/:scid"
            element={<UpdateCategoryService />}
          ></Route>

          <Route path="/add-services" element={<TestingService />}></Route>
          <Route path="/book-services" element={<TestBookService />}></Route>

          <Route path="/gallery" element={<DisplayGallery />}></Route>

          <Route path="/aboutus" element={<AboutUs></AboutUs>}></Route>

          <Route path="/getproduct" element={<Product />}></Route>

          <Route path="/edit-profile" element={<EditProfile />}></Route>

          <Route path="/faq" element={<Accordion />}></Route>
          <Route path="/productfaq" element={<Productfaq></Productfaq>}></Route>
          <Route
            path="/trainingfaq"
            element={<Trainingfaq></Trainingfaq>}
          ></Route>
          <Route path="/contactus" element={<Contactus></Contactus>}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/blogdetail/:id" element={<BlogDetail />}></Route>

          <Route path="/admin-blog-detail" element={<AdminBlogDetail />}></Route>

          <Route path="/blogs/blog-details" element={<BlogDetail />}></Route>

          <Route path="/gall" element={<Gallery />}></Route>
          {/* checkout */}
          <Route path="/checkout" element={<Checkout />}></Route>

          {/* forgot pass */}
          <Route path="/forgot-password" element={<ForgotPasswort />}></Route>

          {/* pass reset */}
          <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
          {/* pass reset */}
          <Route path="/password-reset/:id/:token" element={<PasswordReset />} />

        </Routes>
      </UserProvider>
    </>
  );
};
