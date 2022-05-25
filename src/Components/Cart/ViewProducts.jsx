import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png";

const AllProducts = () => {
  const [productdata, setProductdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get/product")
      .then((result) => {
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
        <Header />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">Products</h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt; <span className="text-white">All Products</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5 text-center">
        <p className="fw-bold">
          We have wide ranges of truely satisfying customer favourite products
          <br />
          <span>
            Believing on{" "}
            <span className="text-info fst-italic fw-normal">
              "Don't find Customers for your products instead find products for
              your customers".
            </span>
          </span>{" "}
        </p>
      </div>

      {/* for product display */}
      <div className="allproduct_list container-fluid">
        <div className="row">
          {productdata.map((allProductsdata) => {
            return (
              <div className="col-md-4">
                <div
                  className="card m-3 "
                  style={{
                    cursor: "pointer",
                    boxShadow: "2px 2px 2px 2px #94FFFF",
                  }}
                >
                  <div className="card-body">
                    <div className="product_image_part">
                      <img
                        src={"http://localhost:5000/" + allProductsdata.pic}
                        alt=""
                        className="img-fluid"
                        style={{ minHeight: "300px", minWidth: "300px" }}
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
                      style={{ fontWeight: "bold" }}
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
