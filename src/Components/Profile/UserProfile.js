import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { parseJwt } from "../../utils/parseJwt";
import "./UserProfile.css";
import bgImg from "../../Images/first.png";
import UserSideBar from "./UserSideBar";
import UserHeader from "../UserDashboard/UserHeader";

const UserProfile = () => {
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const id = token?.user._id;

  const [userdata, setuserdata] = React.useState({});
  const [addressData, setAddressData] = React.useState({});
  const [billingData, setBillingData] = React.useState({});

  const getProfile = () => {
    axios.get("http://localhost:5000/getprofile/" + id).then((data) => {
      setuserdata(data.data);
    });
  };
  const getAddress = () => {
    axios
      .get(`http://localhost:5000/show-own-delivery-address/${id}`)
      .then((res) => {
        setAddressData(res.data);
        // console.log(res.data);
      })
      .catch((e) => [console.log(e)]);
  };
  useEffect(() => {
    getProfile();
    getAddress();
    axios
      .get(`http://localhost:5000/show-own-order/${id}`)
      .then((res) => {
        setBillingData(res.data);
      })
      .catch((e) => [console.log(e)]);
  }, [userdata]);
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
          height: "30vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <UserHeader />
      </div>

      <div className="container-fluid" style={{ backgroundColor: "#d9d9d9" }}>
        <div className="row">
          <UserSideBar />
          <div className="col-md-9">
            <h4 className="fw-normal mt-5 mb-4">Manage My Account</h4>
            <div className="row d-flex gap-4">
              <div
                className="col-md-4 bg-white"
                style={{ borderRadius: "5px" }}
              >
                <div className="container p-3">
                  <p>
                    Personal Profile <span>|</span>{" "}
                    <Link
                      to="/edit-profile"
                      className="text-decoration-none fw-bold"
                      style={{ color: "teal" }}
                    >
                      EDIT
                    </Link>
                  </p>
                  {/* <div className="personal-details"> */}
                  <span>{userdata?.name}</span>
                  <p>{userdata?.email}</p>
                  {/* </div> */}
                </div>
              </div>

              <div
                className="col-md-7 bg-white d-flex"
                style={{ borderRadius: "5px" }}
              >
                {addressData ? (
                  <>
                    <div className="container p-3">
                      <p>
                        Address Book <span>|</span>{" "}
                        <Link
                          to="/edit-address"
                          className="text-decoration-none fw-bold"
                          style={{ color: "teal" }}
                        >
                          EDIT
                        </Link>
                      </p>
                      <small className="text-uppercase">
                        Default Shipping Address
                      </small>
                      <br />
                      <div className="mt-2">
                        <span className="fw-bold">{addressData?.fullname}</span>
                        <br />
                        <span>{addressData?.address_detail?.address}</span>
                        <br />

                        <span>
                          {addressData?.address_detail?.region +
                            " , " +
                            addressData?.address_detail?.city +
                            " , " +
                            addressData?.address_detail?.area}
                        </span>
                        <br />
                        <span>(+977) {addressData?.phone}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="container p-3">
                      <p>
                        Address Book <span>|</span>{" "}
                        <Link
                          to="/add-address-book"
                          className="text-decoration-none fw-bold"
                          style={{ color: "teal" }}
                        >
                          ADD
                        </Link>
                      </p>

                      <p>Save Your Shipping Address Here</p>
                      <i className="bi bi-geo-alt fa-2x text-success"></i>
                    </div>
                  </>
                )}

                <div className="verticle-line"></div>
                <div className="container p-3">
                  {billingData ? (
                    <>
                      <div className="mt-4">
                        <small className="text-uppercase mb-5">
                          Default Billing Address
                        </small>
                        <br />

                        <span className="fw-bold mt-5">{billingData?.fullname}</span>
                        <br />
                        <span>{billingData?.address_detail?.address}</span>
                        <br />

                        <span>
                          {billingData?.address_detail?.region +
                            " , " +
                            billingData?.address_detail?.city +
                            " , " +
                            billingData?.address_detail?.area}
                        </span>
                        <br />
                        <span>(+977) {billingData?.phone}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>Save Your Billing Address Here</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
