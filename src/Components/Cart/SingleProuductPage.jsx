import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./sp.css";
import axios from "axios";
import bgImg from "../../Images/first.png";
import Header from "../Homepage/Header";
import ReactStars from "react-rating-stars-component";
import UserHeader from "../UserDashboard/UserHeader";

export const SuccessMsg = () => {
  return (
    <>
      <p className="fw-bold text-success fst-italic">
        You have added product to cart successfully!
      </p>
    </>
  );
};

export const WishlistMsg = () => {
  return (
    <>
      <p className="fw-bold text-success fst-italic">
        You have successfully added item to your wishlist
      </p>
    </>
  );
};

export const ReviewSuccessMsg = () => {
  return (
    <>
      <p className="fw-bold text-success fst-italic">
        You have added review for this product.
      </p>
    </>
  );
};

const SingleProductInfo = () => {
  const { pid } = useParams();
  const [singleproductdata, setSingleproductdata] = useState({});
  const [msg, setMsg] = useState(false);
  const [isMark, setIsMark] = useState(false);

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
  const user = token?.user._id;

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [reviewdata, setReviewData] = useState([]);
  const [calRating, setCalRating] = useState([]);

  // console.log(token);
  const addCart = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/add-to-cart", {
        pid: pid,
        userId: user,
        productQuantity: singleproductdata.pqty,
      })
      .then((result) => {
        toast.success(<SuccessMsg />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addToWishlist = (e) => {
    e.preventDefault();
    console.log("click");

    setIsMark(true);
    axios
      .post("http://localhost:5000/add-to-wishlist", {
        pid: pid,
        user: user,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.success) {
          toast.success(<WishlistMsg />, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log(object);
  const Reatingreview = () => {
    axios
      .put("http://localhost:5000/reviewandrating/" + pid, {
        review,
        rating,
        user,
        userName: token?.user?.name,
        pic: token?.user?.pic,
        productName: singleproductdata.pname,
        productPic: singleproductdata.pic
      })
      .then((result) => {
        console.log(result.data);
        setReview("");
        toast.success(<ReviewSuccessMsg />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onEnterCart = () => {
    let addCart = document.getElementById("addToCart");
    let goCart = document.getElementById("goToCart");
    addCart.disabled = true;
    goCart.disabled = true;
    setMsg(true);
  };

  const onLeaveCart = () => {
    let addCart = document.getElementById("addToCart");
    let goCart = document.getElementById("goToCart");
    addCart.disabled = false;
    goCart.disabled = false;
    setMsg(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/singleproduct/" + pid)
      .then((result) => {
        // console.log(result.data);
        setSingleproductdata(result.data);

        setReviewData(result.data?.reviewandrating);
      })
      .catch((e) => {
        console.log("Something Went Wrong!!");
      });
  }, [reviewdata]);

  useEffect(() => {
    setCalRating(reviewdata.map((x) => x.rating).reduce((x, y) => x + y, 0));
  });
  const totalRating = calRating / reviewdata.length;

  // console.log(calRating/reviewdata.length)

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
            {singleproductdata.pname}
          </h1>
          <div className="row text-center">
            {user ? (
              <Link
                className="text-success fw-bold text-decoration-none"
                to="/user-dashboard"
              >
                Dashboard &gt;&gt;{" "}
                <span className="text-white">All Products</span> &gt;&gt;{" "}
                <span className="text-white">{singleproductdata.pname}</span>
              </Link>
            ) : (
              <Link
                className="text-success fw-bold text-decoration-none"
                to="/"
              >
                Home &gt;&gt;{" "}
                <span className="text-white">{singleproductdata.pname}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center my-5">
          <div className="col-md-6">
            <div className=" mt-4">
              <img
                style={{ height: "500px", minWidth: "100%" }}
                src={"http://localhost:5000/" + singleproductdata.pic}
                alt=""
                className="img-fluid rounded-4"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card my-4 shadow-lg">
              <div
                className="pname-favourite-icon"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h4 className="my-3" style={{ textAlign: "start" }}>
                  Details of <span>{singleproductdata.pname}</span>
                </h4>
                {isMark ? (
                  <span
                    // onClick={(e)=>addToWishlist(e, singleproductdata._id)}
                    onClick={addToWishlist}
                    className="mx-3 mt-3"
                    style={{ cursor: "pointer" }}
                    id="wishlistIcon"
                  >
                    <i className="fas fa-heart fs-2 text-danger"></i>
                  </span>
                ) : (
                  <span
                    onClick={addToWishlist}
                    className="mx-3 mt-3"
                    style={{ cursor: "pointer" }}
                    id="wishlistIcon"
                  >
                    <i className="fas fa-heart fs-2"></i>
                  </span>
                )}
              </div>

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
                    {totalRating === 1 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i
                          class="bi bi-star-fill "
                          style={{ color: "#e5e5e5" }}
                        ></i>

                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill "
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating > 1 && totalRating < 2 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i class="bi bi-star-half text-warning "></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill "
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating === 2 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>

                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill "
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating > 2 && totalRating < 3 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i class="bi bi-star-half text-warning mx-1"></i>
                        <i
                          class="bi bi-star-fill "
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating === 3 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>

                        <i className="bi bi-star-fill text-warning mx-1"></i>

                        <i
                          class="bi bi-star-fill "
                          style={{ color: "#e5e5e5" }}
                        ></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating > 3 && totalRating < 4 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning mx-1"></i>

                        <i class="bi bi-star-half text-warning"></i>
                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating === 4 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>

                        <i
                          class="bi bi-star-fill mx-1"
                          style={{ color: "#e5e5e5" }}
                        ></i>
                      </>
                    )}

                    {totalRating > 4 && totalRating < 5 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>

                        <i class="bi bi-star-half text-warning mx-1"></i>
                      </>
                    )}

                    {totalRating === 5 && (
                      <>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning mx-1"></i>
                      </>
                    )}
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

                {user ? (
                  <>
                    <div>
                      <button
                        className="btn btn-outline-success m-"
                        style={{ width: "45%", fontWeight: "bold" }}
                        onClick={addCart}
                      >
                        Add To Cart
                      </button>
                      <Link
                        to={`/cart`}
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
                  </>
                ) : (
                  <>
                    <div onMouseEnter={onEnterCart}>
                      <button
                        id="addToCart"
                        className="btn btn-success m-2"
                        style={{ width: "45%", fontWeight: "bold" }}
                      >
                        Add To Cart
                      </button>
                      <button
                        id="goToCart"
                        className="disabledCartBtn btn  text-white m-2 "
                        style={{
                          width: "45%",
                          fontWeight: "bold",
                          backgroundColor: "#FF7518",
                        }}
                      >
                        Go To Cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white rounded my-2 p-2">
              {/* Button trigger modal */}
              {
                user && (
<button
                type="button"
                className="btn text-white mx-3 my-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{
                  width: "45%",
                  fontWeight: "bold",
                  backgroundColor: "#FF7518",
                  borderRadius: "0px",
                }}
              >
                Review and Rating
              </button>
                )
              }
              
              {/* Modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Review Box for {singleproductdata.pname}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <form>
                      <div className="modal-body">
                        <div className="review-ratighn">
                          <ReactStars
                            count={5}
                            onChange={(e) => {
                              setRating(e);
                            }}
                            size={24}
                            activeColor="#ffd700"
                          />

                          <input
                            onChange={(e) => setReview(e.target.value)}
                            className="form-control form-sm mt-3"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={Reatingreview}
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                        >
                          Save changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {reviewdata?.map((data, _id) => {
                return (
                  <div
                    className="bg-white rounded shadow-sm border border-muted p-3 mb-3"
                    key={data._id}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-start align-items-center">
                        {data?.pic ? (
                          <img
                            src={"http://localhost:5000/" + data?.pic}
                            alt=""
                            className="me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <img
                            src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-20.jpg"
                            alt=""
                            className="me-2"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        )}

                        <p className="text text-secondary mb-0 fw-bold">
                          {data?.userName}
                        </p>
                      </div>
                      <div className="show-rating d-flex justify-content-start align-items-start">
                        {data.rating === 1 ? (
                          <>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i
                              class="bi bi-star-fill "
                              style={{ color: "#e5e5e5" }}
                            ></i>
                            <i
                              class="bi bi-star-fill mx-1"
                              style={{ color: "#e5e5e5" }}
                            ></i>
                            <i
                              class="bi bi-star-fill "
                              style={{ color: "#e5e5e5" }}
                            ></i>
                            <i
                              class="bi bi-star-fill mx-1"
                              style={{ color: "#e5e5e5" }}
                            ></i>
                          </>
                        ) : data.rating === 2 ? (
                          <>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning"></i>{" "}
                            <i
                              class="bi bi-star-fill mx-1"
                              style={{ color: "#e5e5e5" }}
                            ></i>
                            <i
                              class="bi bi-star-fill "
                              style={{ color: "#e5e5e5" }}
                            ></i>
                            <i
                              class="bi bi-star-fill mx-1"
                              style={{ color: "#e5e5e5" }}
                            ></i>
                          </>
                        ) : data.rating === 3 ? (
                          <>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i
                              class="bi bi-star-fill "
                              style={{ color: "#e5e5e5" }}
                            ></i>
                            <i
                              class="bi bi-star-fill mx-1"
                              style={{ color: "#e5e5e5" }}
                            ></i>
                          </>
                        ) : data.rating === 4 ? (
                          <>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i
                              class="bi bi-star-fill mx-1"
                              style={{ color: "#e5e5e5" }}
                            ></i>
                          </>
                        ) : data.rating === 5 ? (
                          <>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                            <i class="bi bi-star-fill text-warning mx-1"></i>
                          </>
                        ) : null}
                      </div>
                    </div>
                    <p className="text text-secondary mb-0 ms-5">
                      {data.review}
                    </p>
                  </div>
                );
              })}
            </div>
            {msg ? (
              <div
                className="messagebox text-center"
                id="messageBox"
                onMouseLeave={onLeaveCart}
              >
                <div className="card cardBox">
                  <p className="loginInfoText">
                    Currently, it seems you are not logged in <br />
                    Please login to add and view products in cart <br />
                    <span className="ty">Thank You !</span>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <h2 className="text-success text-center">{msg}</h2>
    </>
  );
};
export default SingleProductInfo;
