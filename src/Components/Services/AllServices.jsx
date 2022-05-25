import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommercialServiceItem from "./CommercialServiceItem";
import ResidentialServiceItem from "./ResidentialServiceItem";
import Widgets from "./Widgets";
import axios from "axios";

const AllServices = () => {
  const [commercialServiceData, setCommercialServiceData] = useState([]);
  const [residentialServiceData, setResidentialServiceData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/get-commercial-services")
      .then((result) => {
        // console.log(result.data);
        setCommercialServiceData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/service/get-Residential-services")
      .then((result) => {
        setResidentialServiceData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* for residential use */}
          <div className="col-md-2 col-12 me-4 ">
            <div
              className="card shadow-lg "
              style={{
                boxSizing: "border-box",
                backgroundColor: "#00008B",
                borderRadius: "25px",
                height: "300px",
              }}
            >
              <div className="text-white mt-4 ms-4">
                <span>
                  <i className="bi bi-building fa-3x"></i>
                </span>
                <h4 className="mt-2">
                  Commercial <br /> Services
                </h4>
              </div>
              <Link
                className="text-white fw-bold ms-auto pe-4 mt-5 text-decoration-none"
                to="/all-commercial-services"
              >
                <small>View All &gt;&gt;</small>
              </Link>
            </div>
          </div>

          {commercialServiceData
            ?.slice(0, 3)
            // ?.filter((commSData, idx) => idx < 3)
            .map((commSData) => {
              return (
                <div className="col-md-3 me-4">
                  <CommercialServiceItem cData={commSData} />
                </div>
              );
            })}
        </div>
      </div>

      {/* for residential services */}
      <div className="container my-5">
        <div className="row">
          {/* for residential use */}
          <div className="col-md-2 col-12 me-4 ">
            <div
              className="card shadow-lg "
              style={{
                boxSizing: "border-box",
                backgroundColor: "#00008B",
                borderRadius: "25px",
                height: "300px",
              }}
            >
              <div className="text-white mt-4 ms-4">
                <span>
                  <i class="bi bi-house-fill fa-3x"></i>
                </span>
                <h4 className="mt-2">
                  Residential <br /> Services
                </h4>
              </div>
              <Link
                className="text-white fw-bold ms-auto pe-4 mt-5 text-decoration-none"
                to="/all-residential-services"
              >
                <small>View All &gt;&gt;</small>
              </Link>
            </div>
          </div>

          {residentialServiceData
            ?.filter((resiSData, idx) => idx < 3)
            .map((resiSData) => {
              return (
                <div className="col-md-3 me-4">
                  <ResidentialServiceItem
                    key={resiSData._id}
                    rData={resiSData}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllServices;
