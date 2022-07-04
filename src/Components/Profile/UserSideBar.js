import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const id = token?.user._id;

  const [userdata, setuserdata] = React.useState({});

  const getProfile = () => {
    axios.get("http://localhost:5000/getprofile/" + id).then((data) => {
      setuserdata(data.data);
    });
  };
  React.useEffect(() => {
    getProfile();
  }, [userdata]);
  return (
    <>
      <div className="col-md-3">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 min-vh-100 gap-3 ms-5">
          <div className="w-100">
            <h6 className="user-name-section">Hello, {userdata?.name}</h6>
          </div>

          <div
            className="d-flex flex-column w-100 gap-2"
            style={{ cursor: "pointer" }}
          >
            <Link
              to={`/profile-creation`}
              className="fw-bold mt-2"
              style={{
                color: "teal",
                textDecoration: "none",
                fontSize: "1.1rem",
              }}
            >
              Manage My Account
            </Link>

            <Link
              to="/view-profile"
              className="text-decoration-none text-secondary ms-5"
            >
              <span className="text profileAccount active">My Profile</span>
            </Link>
            <Link to="/address-book" className="text-decoration-none text-secondary ms-5">
              <span className="text addressBook">Address Book</span>
            </Link>
          </div>
          <div className="w-100" style={{ cursor: "pointer" }}>
            <Link
              to={`/product-order-history`}
              className="text-decoration-none text-dark"
            >
              <h5 className="mt-2 ">Manage Orders</h5>
            </Link>
          </div>
          <div className="w-100 " style={{ cursor: "pointer" }}>
            <Link
              to={`/show-own-reviews`}
              className="text-decoration-none text-dark"
            >
            <h5 className="mt-2">My Reviews</h5>
            </Link>
          </div>
          <div className="w-100 " style={{ cursor: "pointer" }}>
            <Link
              to={`/product-wishlist`}
              className="text-decoration-none text-dark"
            >
              <h5 className="mt-2">My Wishlist</h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
