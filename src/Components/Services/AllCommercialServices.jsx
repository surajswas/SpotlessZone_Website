import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png";
import "./services.css";
import Spinner from "../Spinner/Spinner";
import UserHeader from "../UserDashboard/UserHeader";
import { parseJwt } from "../../utils/parseJwt";

const AllCommercialServices = () => {
  const [commercialData, setCommercialData] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [loading, setLoading] = useState(true);

  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user?._id;

  const myTimeOut = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/service/get-commercial-services")
      .then((result) => {
        myTimeOut();
        setCommercialData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/service/commercial-service")
      .then((result) => {
        // console.log(result.data.
        //   serviceCategoryName);
        myTimeOut();
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
        {user ? <UserHeader /> : <Header />}

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">
            {categoryName.serviceCategoryName}
          </h1>
          <div className="row text-center">
            {user ? (
              <Link
                className="text-success fw-bold text-decoration-none"
                to="/user-dashboard"
              >
                Dashboard &gt;&gt;{" "}
                <span className="text-white">
                  {categoryName.serviceCategoryName}
                </span>
              </Link>
            ) : (
              <Link
                className="text-success fw-bold text-decoration-none"
                to="/"
              >
                Home &gt;&gt;{" "}
                <span className="text-white">
                  {categoryName.serviceCategoryName}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        {loading && <Spinner />}
        <div className="row">
          {!loading &&
            commercialData.map((cData) => {
              return (
                <div className="col-md-4 col-sm-12">
                  <div
                    className="commercial-service-card card m-3 "
                    style={{
                      cursor: "pointer",
                      boxShadow: "2px 2px 2px 2px #25C6AA",
                      height: "50vh",
                    }}
                  >
                    <div className="card-body">
                      <div className="service_image_part c-image">
                        <img
                          src={`http://localhost:5000/${cData.image}`}
                          alt=""
                          className="img-fluid c-image"
                          // style={{ height: "100px", minWidth: "100px" }}
                        />
                      </div>
                      <div className="product_text">
                        <h3 className="py-3">{cData.serviceName}</h3>

                        <p>{cData.serviceDesc.slice(0, 60)}...</p>
                      </div>
                      <Link
                        to={`/single-service/${cData._id}`}
                        className="btn text-center text-white text-uppercase mb-3 fw-bold float-end w-24" style={{backgroundColor: "teal"}}
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

export default AllCommercialServices;
