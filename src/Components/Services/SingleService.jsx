import React, { useEffect, useState } from "react";
import bgImg from "../../Images/first.png";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BookService from "./BookService";
import { parseJwt } from "../../utils/parseJwt";
import UserHeader from "../UserDashboard/UserHeader";
import Header from "../Homepage/Header";

const SingleService = () => {
  const { sid } = useParams();
  const [singleServiceData, setSingleServiceData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/service/get-single-service/${sid}`)
      .then((result) => {
        setSingleServiceData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // for token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const userData = token?.user;

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
        {userData?._id ? <UserHeader /> : <Header />}

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">
            {singleServiceData.serviceName}
          </h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Dashboard &gt;&gt;{" "}
              <span className="text-white">
                {singleServiceData.serviceCategoryName} &gt;&gt;
              </span>
              <span className="text-white">
                {singleServiceData.serviceName}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 my-5">
            <p>{singleServiceData.serviceDesc}</p>
          </div>
          <div className="col-md-4 justify-content-center">
            <BookService
              serviceData={singleServiceData}
              userData={userData}
              sp={singleServiceData.servicePrice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleService;
