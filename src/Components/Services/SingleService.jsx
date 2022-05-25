import React, { useEffect, useState } from "react";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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
            {singleServiceData.serviceName}
          </h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt;{" "}
              <span className="text-white">
                {singleServiceData.serviceName}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 my-5">
            <p>{singleServiceData.serviceDesc}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleService;
