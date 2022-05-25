import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png";
import "./services.css"

const AllResidentialServices = () => {
  const [residentialData, setResidentialData] = useState([]);
  const [categoryName, setCategoryName] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/service/get-residential-services")
      .then((result) => {
        // console.log(result.data);
        setResidentialData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get("http://localhost:5000/service/residential-service")
      .then((result) => {
        // console.log(result.data.
        //   serviceCategoryName);
        setCategoryName(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div
        className="container-fluid homeImg py-3"
        style={{
          paddingTop: 70,
          backgroundColor: "#ebebeb",
          background: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Header />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">
            {categoryName.serviceCategoryName}
          </h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt;{" "}
              <span className="text-white">
                {categoryName.serviceCategoryName}
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {residentialData.map((rData) => {
            return (
              <div className="col-md-4">
                <div
                  className="resident-service-card card m-3 "
                  style={{
                    cursor: "pointer",
                    boxShadow: "2px 2px 2px 2px #94FFFF",
                  }}
                >
                  <div className="card-body">
                    <div className="service_image_part">
                      <img
                        src={`http://localhost:5000/${rData.image}`}
                        alt=""
                        className="img-fluid"
                        // style={{ height: "100px", minWidth: "100px" }}
                      />
                    </div>
                    <div className="product_text">
                      <h3 className="py-3">{rData.serviceName}</h3>
                      <p>{rData.serviceDesc}</p>
                    </div>
                    <Link
                      to={`/single-service/${rData._id}`}
                      className="btn btn-info text-center text-white text-uppercase my-3 fw-bold float-end"
                    >
                      Read More &gt;&gt;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllResidentialServices;
