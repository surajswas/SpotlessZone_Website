import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseJwt } from "../../utils/parseJwt";
import { Link, useNavigate } from "react-router-dom";

import "../Homepage/Homepage.css";

const UserHeader = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);
  const [query, setQuery] = useState();
  const [isHover, setHover] = useState(false);
  const [serviceOrder, setServiceOrders] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);

  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user?._id;

  // console.log(user);

  const searching = (query) => {
    if (query === undefined) {
      return;
    } else {
      navigate("/search-service/" + query);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/booked-service-info/" + user)
      .then((response) => {
        // console.log(response.data);
        setServiceOrders(response.data);
      })
      .catch(() => {
        console.log("error occur");
      });
    axios
      .get("http://localhost:5000/service/pending-service-orders/" + user)
      .then((result) => {
        // console.log(result.data.length);
        setPendingOrder(result.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:5000/get-products-cart/" + user)
      .then((response) => {
        // console.log(response.data)
        setCart(response.data);
      })
      .catch(() => {
        console.log("error occur");
      });
  }, [pendingOrder, serviceOrder]);

  useEffect(() => {
    calculation();
  });

  // calculating total products number in cart
  const calculation = () => {
    setProductQtyCart(
      cart.map((x) => x.productQuantity).reduce((x, y) => x + y, 0)
    );
  };

  // const [search, setSearch] = React.useState('')

  // const  searchApi = () => {
  //   navigate(`/services/${search}`)
  //   // console.log(search)
  // }

  return (
    <>
      <div className="container-fluid bg-transparent text-white">
        <div className="container col-md-10 d-xl-block d-none text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center ms-4">
              <div className="d-flex justify-content-start align-items-center me-5">
                <i className="fa fa-map-marker me-2"></i>
                <p className="text mb-0">Kathmandu</p>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <i className="fa fa-phone me-2"></i>
                <p className="text mb-0">+977-980959895</p>
              </div>
            </div>
            <div>
              <button className="btn btn-link text-white">
                <a href="https://www.instagram.com">
                  <i className="fa fa-instagram fs-4 text-white"></i>
                </a>
              </button>
              <button className="btn btn-link text-white">
                <a href="https://www.facebook.com">
                  <i className="fa fa-facebook fs-4 text-white"></i>
                </a>
              </button>
              <button className="btn btn-link text-white">
                <a href="https://twitter.com">
                  <i className="fa fa-twitter fs-4 text-white"></i>
                </a>
              </button>
            </div>
          </div>
        </div>
        <hr className="d-xl-block d-none" />
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
          <div className="container-fluid col-md-10 col-14">
            <Link className="navbar-brand text-white" to="/user-dashboard">
              <span className="fs-1" style={{ color: "#25C6AA" }}>
                S
              </span>
              POTLESS{" "}
              <span className="fs-1" style={{ color: "#25C6AA" }}>
                Z
              </span>
              ONE
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link text-white header-link"
                    to="/user-dashboard"
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item mx-3">
                  <Link
                    className="nav-link text-white header-link"
                    to="/aboutus"
                  >
                    About
                  </Link>
                </li>
                {/* adding dropdowns for other */}
                <li className="frontpage_drop_down nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white header-link"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Services
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link
                      className="dropdown-item"
                      to="/all-commercial-services"
                    >
                      Commercial Services
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/all-residential-services"
                    >
                      Residential Services
                    </Link>
                  </div>
                </li>

                {/* closing dropdowns  */}
                {/* {localStorage.getItem("token") && <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to={`/display-all-products`}>
                    Products
                  </Link>
                </li>} */}
                <Link
                  className="nav-link text-white header-link"
                  to={`/display-all-products`}
                >
                  Products
                </Link>
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link text-white header-link"
                    to="/gallery"
                  >
                    Gallery
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link text-white header-link"
                    to="/contactus"
                  >
                    Contacts
                  </Link>
                </li>
                {/* adding dropdowns for other */}
                <li className="frontpage_drop_down nav-item dropdown ">
                  <Link
                    className="nav-link dropdown-toggle text-white header-link"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Others
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/faq">
                      FAQ
                    </Link>
                    <Link className="dropdown-item" to="/blogs">
                      Blogs
                    </Link>
                    <Link className="dropdown-item" to="/job-form-submit">
                      Job Recruit
                    </Link>
                  </div>
                </li>

                {/* closing dropdowns  */}
              </ul>
              <form className="d-flex justify-content-start align-items-center">
                <div className="input-group my-3">
                  {/* <span className="input-group-text" id="basic-addon1">@</span> */}
                  <input
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    className="form-control form-control-solid"
                    placeholder="Search services here..."
                    aria-label="search"
                    aria-describedby="basic-addon1"
                  />
                  <button
                    onClick={() => searching(query)}
                    className="btn btn-secondary"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>

                {/* {!user && (
                  <Link className="btn btn-link text-white" to={`/login`}>
                    <i className="fa fa-user fa-2x"></i>
                  </Link>
                )} */}
                {user ? (
                  <>
                    <div
                      className="cart-wishlist"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        to={`/cart`}
                        className="position-relative ps-2 pt-0 "
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        // onMouseEnter={() => setCartHover(true)}
                      >
                        <i className="fa fa-shopping-cart fa-2x text-white"></i>
                        <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger ms-2 py-1">
                          {productQtyCart}
                        </span>
                      </Link>
                      <Link
                        to={`/user-dashboard`}
                        className="position-relative ps-2 pt-0 "
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onMouseEnter={() => setHover(true)}
                      >
                        <i className="bi bi-chat-dots fa-2x text-white"></i>
                        <span
                          className="position-absolute badge rounded-pill bg-danger ms-2 py-1"
                          style={{ left: "23px", top: "-3px" }}
                        >
                          {pendingOrder}
                        </span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link className="btn btn-link text-white" to={`/login`}>
                    <i className="fa fa-user fa-2x"></i>
                  </Link>
                )}
              </form>
            </div>
          </div>
        </nav>

        {isHover ? (
          <>
            {" "}
            <div className="container-fluid">
              <div className="row justify-content-end">
                <div
                  className="col-md-4 text-dark p-3"
                  onMouseLeave={() => setHover(false)}
                  style={{
                    borderRadius: "15px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  {serviceOrder?.map((x, _id) => {
                    return (
                      <div key={x._id}>
                        <h5>{x.serviceDetails[0].serviceName}</h5>
                        {x.deliveryStatus && (
                          <p>
                            Your request is already{" "}
                            <span className="fw-bold text-success">
                              Approved
                            </span>{" "}
                            <br /> You will be contacted soon by our team
                            members for providing your requested service <br />{" "}
                            Please be at home
                            <br />
                            <span className="fw-bold fs-7">Thank You !</span>
                          </p>
                        )}
                        {!x.deliveryStatus && (
                          <p>
                            Your request is still in{" "}
                            <span className="fw-bold text-warning">
                              Pending
                            </span>
                            <br />
                            <span className="fw-bold fs-7">
                              {" "}
                              Please be patience !
                            </span>
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default UserHeader;
