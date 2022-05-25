import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import bgImg from "../../Images/first.png";
import Header from "../Homepage/Header";

const SingleProductInfo = () => {
  const { pid } = useParams();
  const [singleproductdata, setSingleproductdata] = useState([]);
  const [msg, setMsg] = useState("");

  const addCart = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/add-to-cart", {
        pid: pid,
        // userid
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.success) {
          setMsg("You have added product to cart");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/singleproduct/" + pid)
      .then((result) => {
        // console.log(result.data[0].pname)
        setSingleproductdata(result.data);
      })
      .catch((e) => {
        console.log("Something Went Wrong!!");
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
            {singleproductdata.pname}
          </h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt;{" "}
              <span className="text-white">{singleproductdata.pname}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center my-5">
          <div className="col-md-4 ">
            <div className="card mt-4">
              <img
                src={"http://localhost:5000/" + singleproductdata.pic}
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card my-4 shadow-lg">
              <h4 className="text-center my-3">
                Details of <span>{singleproductdata.pname}</span>
              </h4>
              <div className="card-body">
                <h6 style={{ fontWeight: "bold" }}>
                  Product Name:{" "}
                  <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
                    {singleproductdata.pname}
                  </span>
                </h6>

                <h6 style={{ fontWeight: "bold" }}>
                  Brand:{" "}
                  <span style={{ fontStyle: "italic", fontWeight: "normal" }}>
                    brand name
                  </span>
                </h6>

                <h6 style={{ fontWeight: "bold" }}>
                  Ratings:{" "}
                  <span>
                    <i className="bi bi-star-fill text-warning mx-1"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i className="bi bi-star-fill text-warning mx-1"></i>
                    <i className="bi bi-star-fill text-warning"></i>
                    <i class="bi bi-star-half text-warning mx-1"></i>
                  </span>
                </h6>

                <h6 style={{ fontWeight: "bold" }}>
                  Price:{" "}
                  <span style={{ fontWeight: "normal", fontStyle: "italic" }}>
                    Rs. {singleproductdata.pprice}
                  </span>
                </h6>

                <h6 style={{ fontWeight: "bold" }}>
                  Quantity:{" "}
                  <span style={{ fontWeight: "normal", fontStyle: "italic" }}>
                    {singleproductdata.pqty}
                  </span>
                </h6>

                <div>
                  <button
                    className="btn btn-outline-success m-"
                    style={{ width: "45%", fontWeight: "bold" }}
                    onClick={addCart}
                  >
                    Add To Cart
                  </button>
                  <Link
                    to="/cart"
                    className="btn  text-white m-2 "
                    style={{
                      width: "45%",
                      fontWeight: "bold",
                      backgroundColor: "#FF7518",
                    }}
                  >
                    Go To Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-success text-center">{msg}</h2>
    </>
  );
};
export default SingleProductInfo;
