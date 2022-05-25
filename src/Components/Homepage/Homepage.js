import React from "react";
import Header from "./Header";
import First from "../../Images/first.png";
import Testimonial from "./Testimonial";
import ChooseUs from "./ChooseUs";
import AllServices from "../Services/AllServices";
import HomeGallery from "./HomeGallery";
// import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      {/* <Header /> */}
      <div>
        <div
          className="container-fluid homeImg py-3"
          style={{
            paddingTop: 0,
            backgroundColor: "#ebebeb",
            background: `url(${First})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <Header />
          <div className="container col-md-10 mt-md-5 pt-md-5">
            <p
              className="text text-white h1 text-center"
              style={{ fontSize: "4rem" }}
            >
              Lets Clean Our Houses
              <br />
              By Using Spotless <br />
              Zone
            </p>
          </div>
        </div>
        <div
          className="d-flex flex-wrap justify-content-center align-items-center w-100"
          style={{ position: "absolute", bottom: "-6%" }}
        >
          <div
            className="text-center bg-light rounded shadow"
            style={{ height: "auto" }}
          >
            <div className="d-flex flex-wrap justify-content-center align-items-center mx-4 my-3">
              <div className="me-md-5 me-2 mb-3">
                <p className="text text-secondary h5 mb-3">Choose Packages</p>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Select Packages</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </div>
              <div className="me-md-5 me-2 mb-3">
                <p className="text text-secondary h5 mb-3">Choose Packages</p>
                <input type="date" className="form-control" />
              </div>
              <div className="me-md-5 me-2 mb-3">
                <p className="text text-secondary h5 mb-3">Phone Number</p>
                <input type="number" className="form-control" />
              </div>
              <div className="me-md-5 me-2 mb-3">
                <button className="btn btn-primary px-4">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChooseUs />
      <div
        className="container-fluid p-4"
        style={{ backgroundColor: "#EBEFED" }}
      >
        <div className="row text-center">
          <h1>Providing the Best Services for Our Customers</h1>
          <hr
            className=" bg-success w-50 m-auto my-3"
            style={{ height: "2px" }}
          />
        </div>
        <AllServices />
      </div>
      <Testimonial />
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <HomeGallery />
      </div>
    </>
  );
};

export default Homepage;
