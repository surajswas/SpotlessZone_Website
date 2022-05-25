import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Header = () => {
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
                <i className="fa fa-instagram fs-4"></i>
              </button>
              <button className="btn btn-link text-white">
                <i className="fa fa-facebook fs-4"></i>
              </button>
              <button className="btn btn-link text-white">
                <i className="fa fa-twitter fs-4"></i>
              </button>
            </div>
          </div>
        </div>
        <hr className="d-xl-block d-none" />
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
          <div className="container-fluid col-md-10 col-14">
            <a className="navbar-brand text-white" href="home/">
              <span className="fs-1" style={{ color: "#25C6AA" }}>
                S
              </span>
              POTLESS{" "}
              <span className="fs-1" style={{ color: "#25C6AA" }}>
                Z
              </span>
              ONE
            </a>
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
                  <Link className="nav-link text-white " to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="/aboutus">
                    About
                  </a>
                </li>
                {/* adding dropdowns for other */}
                <li className="frontpage_drop_down nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white"
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
                <li className="nav-item mx-3">
                  <Link className="nav-link text-white" to={`/display-all-products`}>
                    Products
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="/gallery">
                    Gallery
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link text-white" href="/">
                    Contacts
                  </a>
                </li>
                {/* adding dropdowns for other */}
                <li className="frontpage_drop_down nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-white"
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
                    <Link className="dropdown-item" to="/">
                      FAQ
                    </Link>
                    <Link className="dropdown-item" to="/">
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
                <button className="btn btn-link text-white">
                  <i className="fa fa-search"></i>
                </button>
                <Link className="btn btn-link text-white" to={`/login`}>
                  <i className="fa fa-user"></i>
                </Link>
                <button className="btn btn-link text-white">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
