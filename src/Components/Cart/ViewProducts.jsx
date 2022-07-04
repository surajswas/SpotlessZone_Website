import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png";
import Spinner from "../Spinner/Spinner";
import "./viewproduct.css";
import { parseJwt } from "../../utils/parseJwt";
import UserHeader from "../UserDashboard/UserHeader";


const AllProducts = () => {
  const navigate = useNavigate();

  const [productdata, setProductdata] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [query, setQuery] = useState();

  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user?._id;

  const searching = (query) => {
    if (query === undefined) {
      return;
    } else {
      navigate("/search-product/" + query);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/get/product")
      .then((result) => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        console.log(result.data);
        setProductdata(result.data);
      })
      .catch((e) => {
        console.log("Something Went Wrong!!");
      });
  }, []);

  // for showing total products

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
          <h1 className="text-center text-white my-4 fw-bold">Products</h1>
          <div className="row text-center">
            {
              user ? (
                <Link className="text-success fw-bold text-decoration-none" to="/user-dashboard">
              Dashboard &gt;&gt; <span className="text-white">All Products</span>
            </Link>
              ) : (
                <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt; <span className="text-white">All Products</span>
            </Link>
              )
            }
          </div>
        </div>
      </div>

      <div className="container-fluid py-5 text-center">
        <h1 className="text-success">
          We have wide ranges of truely satisfying <br /> customer favourite
          products
        </h1>
        <div
          className="input-group mt-5 mb-3 w-25"
          style={{
            display: "display",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* <span className="input-group-text" id="basic-addon1">@</span> */}
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="form-control form-control-solid"
            placeholder="Search products here..."
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
      </div>

      {isloading && <Spinner />}

      {/* for product display */}

      <div className="container-fluid my-3">
        <div className="row mx-5 justify-content-center">
          {!isloading &&
            productdata.map((allProductsdata) => {
              return (
                <div
                  className="text-center col-md-4 "
                  style={{ width: "350px" }}
                >
                  <div
                    className="card my-3 px-0"
                    style={{
                      cursor: "pointer",
                      boxShadow: "2px 2px 2px 2px #25C6AA",
                      height: "400px",
                    }}
                  >
                    <div className="card-body">
                      <div
                        className="text-center"
                        style={{ width: "100%", height: "22vh" }}
                      >
                        <img
                          src={"http://localhost:5000/" + allProductsdata.pic}
                          alt=""
                          className="img-fluid bghv"
                          style={{ width: "100%", height: "22vh" }}
                        />
                      </div>
                      <div className="product_text">
                        <h3 className="text-center py-3">
                          {allProductsdata.pname}
                        </h3>
                        <h6
                          className="text-center"
                          style={{ fontStyle: "italic" }}
                        >
                          Rs{" "}
                          {allProductsdata.pprice +
                            " per " +
                            allProductsdata.pqty}
                        </h6>
                      </div>
                      <Link
                        to={"/single-product/" + allProductsdata._id}
                        className="btn btn-info text-center w-75 ms-5 text-white text-uppercase my-3"
                        style={{ fontWeight: "bold", backgroundColor: "teal" }}
                      >
                        Details
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
export default AllProducts;
