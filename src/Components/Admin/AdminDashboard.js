import React from "react";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
// weekly like data here
const ddata = [
  {
    day: "Jan",
    earn: 500,
  },
  {
    day: "Feb",
    earn: 2500,
  },
  {
    day: "Mar",
    earn: 600,
  },
  {
    day: "Apr",
    earn: 1500,
  },
  {
    day: "May",
    earn: 4500,
  },
  {
    day: "Jun",
    earn: 3500,
  },
  {
    day: "Jul",
    earn: 5568,
  },
  {
    day: "Aug",
    earn: 4500,
  },
  {
    day: "Sept",
    earn: 3588,
  },
  {
    day: "Oct",
    earn: 123,
  },
  {
    day: "Nov",
    earn: 2586,
  },
  {
    day: "Dec",
    earn: 5880,
  },
];
// weekly like data here
const AdminDashboard = ({ adminData }) => {
  const { pid } = useParams();

  const [noti, setNoti] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [productQtyCart, setProductQtyCart] = React.useState([]);
  const [reviews, setReviews] = React.useState(0);
  const [productData, setProductData] = React.useState([]);

  useEffect(() => {
    //   for all notification either visible or not
    axios
      .get("http://localhost:5000/service/all-noti-unseen")
      .then((response) => {
        if (response) {
          // console.log(`checking 2nd cond: ${l.length}`)
          //   setNotiData(response.data);
          if (response.data) {
            setNoti(response.data);
            // console.log(response.data);
          }
        } else {
          console.log("all true");
        }
      })
      .catch(() => {
        console.log("error occur");
      });
    // for total number of registered users
    axios
      .get("http://localhost:5000/customer/register/get-total-users")
      .then((response) => {
        if (response) {
          setUsers(response.data);
        } else {
          console.log("all true");
        }
      })
      .catch(() => {
        console.log("error occur");
      });
    // for total number of pending orders
    axios
      .get("http://localhost:5000/service/pending-service-orders")
      .then((response) => {
        if (response) {
          setOrders(response.data);
        } else {
          console.log("all true");
        }
      })
      .catch(() => {
        console.log("error occur");
      });
    // for total number of registered users
    axios
      .get("http://localhost:5000/get-total-products-cart")
      .then((response) => {
        if (response) {
          // console.log(response.data[0].productQuantity);
          setCart(response.data);
        } else {
          console.log("Something went wrong");
        }
      })
      .catch(() => {
        console.log("error occur");
      });
    axios
      .get("http://localhost:5000/get/product")
      .then((result) => {
        setProductData(result.data);
      })
      .catch((e) => {
        console.log("Something Went Wrong!!");
      });
  }, [productData]);

  useEffect(() => {
    calculation();
    reviewCal();
  });
  // calculating total products number in cart
  const calculation = () => {
    setProductQtyCart(
      cart.map((x) => x.productQuantity).reduce((x, y) => x + y, 0)
    );
  };

  const reviewCal = () => {
    const totalReviews = productData
      .map((val) => val?.reviewandrating?.length)
      .reduce((x, y) => x + y, 0);
    setReviews(totalReviews);
  };

  return (
    <>
      <div className="container-fluid ps-0 py-3 bg-light">
        <AdminHeader noti={noti} productQtyCart={productQtyCart} />
        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />
          <div className="col-md-9">
            <div className="p-1">
              <div className="row mb-5">
                <div className="col-md-3">
                  <div className="bg-white rounded py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text text-secondary fw-bold text-uppercase">
                        Users
                      </p>
                      <div className="d-flex justify-content-start align-items-center">
                        <i className="fa fa-chevron-up text-danger me-2"></i>
                        <p className="text text-success fw-bold mb-0">14%</p>
                      </div>
                    </div>
                    <p className="text text-dark fw-bold fs-3">
                      {users.length}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <a href="#" className="cart-link">
                        See all users
                      </a>
                      <p className="text text-danger mb-0 bg-warning py-1 px-2 rounded">
                        <i className="fa fa-user"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-white rounded py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text text-secondary fw-bold text-uppercase">
                        Reviews
                      </p>
                      <div className="d-flex justify-content-start align-items-center">
                        <i className="fa fa-chevron-up text-danger me-2"></i>
                        <p className="text text-success fw-bold mb-0">40%</p>
                      </div>
                    </div>
                    <p className="text text-dark fw-bold fs-3">{reviews}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <a href="#" className="cart-link">
                        See all reviews
                      </a>
                      <p className="text text-danger mb-0 bg-warning py-1 px-2 rounded">
                        <i className="fa fa-comment"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-white rounded py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text text-secondary fw-bold text-uppercase">
                        Earning
                      </p>
                      <div className="d-flex justify-content-start align-items-center">
                        <i className="fa fa-chevron-down text-danger me-2"></i>
                        <p className="text text-danger fw-bold mb-0">60%</p>
                      </div>
                    </div>
                    <p className="text text-dark fw-bold fs-3">81</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <a href="#" className="cart-link">
                        See all earning
                      </a>
                      <p className="text text-danger mb-0 bg-warning py-1 px-2 rounded">
                        <i className="fa fa-dollar"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="bg-white rounded py-2 px-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text text-secondary fw-bold text-uppercase">
                        Orders
                      </p>
                      <div className="d-flex justify-content-start align-items-center">
                        <i className="fa fa-chevron-up text-danger me-2"></i>
                        <p className="text text-success fw-bold mb-0">14%</p>
                      </div>
                    </div>
                    <p className="text text-dark fw-bold fs-3">
                      {orders.length}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/service-order-history" className="cart-link">
                        See all Orders
                      </Link>
                      <p className="text text-danger mb-0 bg-warning py-1 px-2 rounded">
                        <i className="fa fa-shopping-cart"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="py-2 px-3 bg-white rounded">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <div className="d-flex justify-content-start align-items-center">
                        <i className="fa fa-shopping-bag fw-bld fs-2 text-secondary me-2"></i>
                        <p className="text text-secondary fw-bold fs-2 mb-0">
                          Rs. 100000
                        </p>
                        <div className="d-flex justify-content-start align-items-center ms-3">
                          <i className="fa fa-arrow-up text-success me-1"></i>
                          <p className="text text-success mb-0">81</p>
                        </div>
                      </div>
                      <div className="drpdwn">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected="">May</option>
                          <option value={1}>Jan</option>
                          <option value={2}>Feb</option>
                          <option value={3}>Mar</option>
                        </select>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" aspect="3">
                      <AreaChart
                        width={730}
                        height={250}
                        data={ddata}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="17%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="33%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="47%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="59%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="70%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="82%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#25C6AA"
                              stopOpacity={1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#25C6AA"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#25C6AA"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#d6d6d6",
                            borderRadius: "10px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="earn"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#colorUv)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <p className="text text-secondary h5 mb-0">
                    Recent Ratings &amp; Reviews on different products
                  </p>
                  {/* <button className="btn btn-link text-decoration-none">
                    See All
                  </button> */}
                </div>
                <div>
                  <div className="row">
                    <div className="container">
                      <div className="row">
                        {productData &&
                          productData?.map((val, _id) => {
                            return (
                              <>
                                {val && val?.reviewandrating.length === 0 ? (
                                  ""
                                ) : (
                                  <>
                                    <div className="col-md-10 " key={val._id}>
                                      <div className="row">
                                        <div className="col-md-4  align-items-center">
                                          <div className="product-name-image-rating-stars">
                                            <p className="fw-bold ms-2">
                                              {val?.pname}
                                            </p>

                                            {val?.pic ? (
                                              <img
                                                src={
                                                  "http://localhost:5000/" +
                                                  val?.pic
                                                }
                                                alt=""
                                                style={{
                                                  width: "100px",
                                                  height: "100px",
                                                  borderRadius: "50%",
                                                  objectFit: "cover",
                                                }}
                                              />
                                            ) : (
                                              <img
                                                src="https://cdn.pixabay.com/photo/2017/01/15/15/49/smiley-1981935__340.png"
                                                alt=""
                                                style={{
                                                  width: "40px",
                                                  height: "40px",
                                                  borderRadius: "50%",
                                                  objectFit: "cover",
                                                }}
                                              />
                                            )}
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="ratings-start d-flex flex-column gap-2">
                                            <span className="fs-3 fw-bold">

                                              {
                                                (val?.reviewandrating
                                                ?.map((x) => x.rating)
                                                .reduce((x, y) => x + y, 0) /
                                                val?.reviewandrating?.length) === 1 ? 
                                                (val?.reviewandrating
                                                  ?.map((x) => x.rating)
                                                  .reduce((x, y) => x + y, 0) /
                                                  val?.reviewandrating?.length) 
                                                  
                                                  
                                                  : 




                                                  (val?.reviewandrating
                                                    ?.map((x) => x.rating)
                                                    .reduce((x, y) => x + y, 0) /
                                                    val?.reviewandrating?.length) === 2 ? 
                                                    (val?.reviewandrating
                                                      ?.map((x) => x.rating)
                                                      .reduce((x, y) => x + y, 0) /
                                                      val?.reviewandrating?.length) 


                                                      : 



                                                      (val?.reviewandrating
                                                        ?.map((x) => x.rating)
                                                        .reduce((x, y) => x + y, 0) /
                                                        val?.reviewandrating?.length) === 3 ? 
                                                        (val?.reviewandrating
                                                          ?.map((x) => x.rating)
                                                          .reduce((x, y) => x + y, 0) /
                                                          val?.reviewandrating?.length) 




                                                          : 



                                                          (val?.reviewandrating
                                                            ?.map((x) => x.rating)
                                                            .reduce((x, y) => x + y, 0) /
                                                            val?.reviewandrating?.length) === 4 ? 
                                                            (val?.reviewandrating
                                                              ?.map((x) => x.rating)
                                                              .reduce((x, y) => x + y, 0) /
                                                              val?.reviewandrating?.length) 


                                                              : 

                                                              (val?.reviewandrating
                                                                ?.map((x) => x.rating)
                                                                .reduce((x, y) => x + y, 0) /
                                                                val?.reviewandrating?.length) === 5 ? 
                                                                (val?.reviewandrating
                                                                  ?.map((x) => x.rating)
                                                                  .reduce((x, y) => x + y, 0) /
                                                                  val?.reviewandrating?.length) 

                                                                  : 

                                                                  (val?.reviewandrating
                                                                    ?.map((x) => x.rating)
                                                                    .reduce((x, y) => x + y, 0) /
                                                                    val?.reviewandrating?.length).toFixed(1)

                                                }
                                              <span className="text-secondary fw-normal fs-5">
                                                /5
                                              </span>
                                            </span>

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length ===
                                              1 && (
                                              <>
                                                <div className="stars-icons d-flex flex-row fs-4">
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
                                                </div>
                                              </>
                                            )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length >
                                              1 &&
                                              val?.reviewandrating
                                                ?.map((x) => x.rating)
                                                .reduce((x, y) => x + y, 0) /
                                                val?.reviewandrating?.length <
                                                2 && (
                                                <>
                                                  <div className="stars-icons d-flex flex-row fs-4">
                                                    <i className="bi bi-star-fill text-warning mx-1"></i>
                                                    <i class="bi bi-star-half text-warning mx-1"></i>
                                                    <i
                                                      class="bi bi-star-fill "
                                                      style={{
                                                        color: "#e5e5e5",
                                                      }}
                                                    ></i>
                                                    <i
                                                      class="bi bi-star-fill "
                                                      style={{
                                                        color: "#e5e5e5",
                                                      }}
                                                    ></i>
                                                    <i
                                                      class="bi bi-star-fill "
                                                      style={{
                                                        color: "#e5e5e5",
                                                      }}
                                                    ></i>
                                                  </div>
                                                </>
                                              )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length ===
                                              2 && (
                                              <>
                                                <div className="stars-icons d-flex flex-row fs-4">
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
                                                </div>
                                              </>
                                            )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length >
                                              2 &&
                                              val?.reviewandrating
                                                ?.map((x) => x.rating)
                                                .reduce((x, y) => x + y, 0) /
                                                val?.reviewandrating?.length <
                                                3 && (
                                                <>
                                                  <div className="stars-icons d-flex flex-row fs-4">
                                                    <i className="bi bi-star-fill text-warning mx-1"></i>
                                                    <i className="bi bi-star-fill text-warning"></i>

                                                    <i class="bi bi-star-half text-warning mx-1"></i>

                                                    <i
                                                      class="bi bi-star-fill "
                                                      style={{
                                                        color: "#e5e5e5",
                                                      }}
                                                    ></i>
                                                    <i
                                                      class="bi bi-star-fill mx-1"
                                                      style={{
                                                        color: "#e5e5e5",
                                                      }}
                                                    ></i>
                                                  </div>
                                                </>
                                              )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length ===
                                              3 && (
                                              <>
                                                <div className="stars-icons d-flex flex-row fs-4">
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
                                                </div>
                                              </>
                                            )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length >
                                              3 &&
                                              val?.reviewandrating
                                                ?.map((x) => x.rating)
                                                .reduce((x, y) => x + y, 0) /
                                                val?.reviewandrating?.length <
                                                4 && (
                                                <>
                                                  <div className="stars-icons d-flex flex-row fs-4">
                                                    <i className="bi bi-star-fill text-warning mx-1"></i>
                                                    <i className="bi bi-star-fill text-warning"></i>
                                                    <i className="bi bi-star-fill text-warning mx-1"></i>

                                                    <i class="bi bi-star-half text-warning mx-1"></i>
                                                    <i
                                                      class="bi bi-star-fill mx-1"
                                                      style={{
                                                        color: "#e5e5e5",
                                                      }}
                                                    ></i>
                                                  </div>
                                                </>
                                              )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length ===
                                              4 && (
                                              <>
                                                <div className="stars-icons d-flex flex-row fs-4">
                                                  <i className="bi bi-star-fill text-warning mx-1"></i>
                                                  <i className="bi bi-star-fill text-warning"></i>
                                                  <i className="bi bi-star-fill text-warning mx-1"></i>
                                                  <i className="bi bi-star-fill text-warning"></i>

                                                  <i
                                                    class="bi bi-star-fill mx-1"
                                                    style={{ color: "#e5e5e5" }}
                                                  ></i>
                                                </div>
                                              </>
                                            )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length >
                                              4 &&
                                              val?.reviewandrating
                                                ?.map((x) => x.rating)
                                                .reduce((x, y) => x + y, 0) /
                                                val?.reviewandrating?.length <
                                                5 && (
                                                <>
                                                  <div className="stars-icons d-flex flex-row fs-4">
                                                    <i className="bi bi-star-fill text-warning mx-1"></i>
                                                    <i className="bi bi-star-fill text-warning"></i>
                                                    <i className="bi bi-star-fill text-warning mx-1"></i>
                                                    <i className="bi bi-star-fill text-warning"></i>

                                                    <i class="bi bi-star-half text-warning mx-1"></i>
                                                  </div>
                                                </>
                                              )}

                                            {val?.reviewandrating
                                              ?.map((x) => x.rating)
                                              .reduce((x, y) => x + y, 0) /
                                              val?.reviewandrating?.length ===
                                              5 && (
                                              <>
                                                <div className="stars-icons d-flex flex-row fs-4">
                                                  <i className="bi bi-star-fill text-warning mx-1"></i>
                                                  <i className="bi bi-star-fill text-warning"></i>
                                                  <i className="bi bi-star-fill text-warning mx-1"></i>
                                                  <i className="bi bi-star-fill text-warning"></i>
                                                  <i className="bi bi-star-fill text-warning mx-1"></i>
                                                </div>
                                              </>
                                            )}

                                            <span>
                                              {val?.reviewandrating?.filter(
                                                (x) => x.rating === 1
                                              ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 2
                                                ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 3
                                                ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 4
                                                ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 5
                                                ).length ===
                                                1 && (
                                                <>
                                                  <span>
                                                    {val?.reviewandrating?.filter(
                                                      (x) => x.rating === 1
                                                    ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 2
                                                      ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 3
                                                      ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 4
                                                      ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 5
                                                      ).length}
                                                    <span className="ms-1">
                                                      Rating
                                                    </span>
                                                  </span>
                                                </>
                                              )}
                                            </span>

                                            <span>
                                              {val?.reviewandrating?.filter(
                                                (x) => x.rating === 1
                                              ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 2
                                                ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 3
                                                ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 4
                                                ).length +
                                                val?.reviewandrating?.filter(
                                                  (x) => x.rating === 5
                                                ).length >
                                                1 && (
                                                <>
                                                  <span>
                                                    {val?.reviewandrating?.filter(
                                                      (x) => x.rating === 1
                                                    ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 2
                                                      ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 3
                                                      ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 4
                                                      ).length +
                                                      val?.reviewandrating?.filter(
                                                        (x) => x.rating === 5
                                                      ).length}{" "}
                                                    <span className="ms-1">
                                                      Ratings
                                                    </span>
                                                  </span>
                                                </>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="col-md-4 ">
                                          <div className="five-stars-icons-numbers d-flex flex-row gap-3">
                                            <span>
                                              <i className="bi bi-star-fill text-warning mx-1"></i>
                                              <i className="bi bi-star-fill text-warning"></i>
                                              <i className="bi bi-star-fill text-warning mx-1"></i>
                                              <i className="bi bi-star-fill text-warning"></i>
                                              <i className="bi bi-star-fill text-warning mx-1"></i>
                                            </span>
                                            <span className="fw-bold">
                                              {
                                                val?.reviewandrating?.filter(
                                                  (item) => item.rating === 5
                                                ).length
                                              }
                                            </span>
                                          </div>

                                          <div className="four-stars-icons-numbers d-flex flex-row gap-3">
                                            <span>
                                              <i className="bi bi-star-fill text-warning mx-1"></i>
                                              <i className="bi bi-star-fill text-warning"></i>
                                              <i className="bi bi-star-fill text-warning mx-1"></i>
                                              <i className="bi bi-star-fill text-warning"></i>
                                              <i
                                                class="bi bi-star-fill mx-1"
                                                style={{ color: "#e5e5e5" }}
                                              ></i>
                                            </span>
                                            <span className="fw-bold">
                                              {
                                                val?.reviewandrating?.filter(
                                                  (item) => item.rating === 4
                                                ).length
                                              }
                                            </span>
                                          </div>

                                          <div className="three-stars-icons-numbers d-flex flex-row gap-3">
                                            <span>
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
                                            </span>
                                            <span className="fw-bold">
                                              {
                                                val?.reviewandrating?.filter(
                                                  (item) => item.rating === 3
                                                ).length
                                              }
                                            </span>
                                          </div>

                                          <div className="two-stars-icons-numbers d-flex flex-row gap-3">
                                            <span>
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
                                            </span>
                                            <span className="fw-bold">
                                              {
                                                val?.reviewandrating?.filter(
                                                  (item) => item.rating === 2
                                                ).length
                                              }
                                            </span>
                                          </div>

                                          <div className="one-stars-icons-numbers d-flex flex-row gap-3">
                                            <span>
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
                                            </span>
                                            <span className="fw-bold">
                                              {
                                                // first filter
                                                val?.reviewandrating?.filter(
                                                  (item) => item.rating === 1
                                                ).length
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-md-12">
                                        <div className="row">
                                          <p className="text text-secondary h5 my-3">
                                            Products Reviews
                                          </p>

                                          {val?.reviewandrating?.map(
                                            (x, _id) => {
                                              return (
                                                <>
                                                  <div className="col-md-10 m-2">
                                                    <div className="userimg-review-details d-flex flex-row gap-3">
                                                      {
                                                        x?.pic ? (
<img
                                                        src={
                                                          "http://localhost:5000/" +
                                                          x?.pic
                                                        }
                                                        alt=""
                                                        className="img-fluid"
                                                        style={{
                                                          width: "100px",
                                                          height: "100px",
                                                          borderRadius: "100%",
                                                        }}
                                                      />
                                                        ): (
                                                          <img
                                                        src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-20.jpg"
                                                        alt=""
                                                        className="img-fluid"
                                                        style={{
                                                          width: "100px",
                                                          height: "100px",
                                                          borderRadius: "100%",
                                                        }}
                                                      />
                                                        )
                                                      }
                                                      
                                                      <div className="reviews-detail-only d-flex flex-column gap-2">
                                                        <p className="text text-secondary mb-0">
                                                          {x?.userName}
                                                        </p>
                                                        <div className="d-flex justify-content-start align-items-center">
                                                          {x?.rating === 1 ? (
                                                            <>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i
                                                                class="bi bi-star-fill "
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                              <i
                                                                class="bi bi-star-fill mx-1"
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                              <i
                                                                class="bi bi-star-fill "
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                              <i
                                                                class="bi bi-star-fill mx-1"
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                            </>
                                                          ) : x?.rating ===
                                                            2 ? (
                                                            <>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning"></i>{" "}
                                                              <i
                                                                class="bi bi-star-fill mx-1"
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                              <i
                                                                class="bi bi-star-fill "
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                              <i
                                                                class="bi bi-star-fill mx-1"
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                            </>
                                                          ) : x?.rating ===
                                                            3 ? (
                                                            <>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning"></i>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i
                                                                class="bi bi-star-fill "
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                              <i
                                                                class="bi bi-star-fill mx-1"
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                            </>
                                                          ) : x?.rating ===
                                                            4 ? (
                                                            <>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning"></i>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning"></i>
                                                              <i
                                                                class="bi bi-star-fill mx-1"
                                                                style={{
                                                                  color:
                                                                    "#e5e5e5",
                                                                }}
                                                              ></i>
                                                            </>
                                                          ) : x?.rating ===
                                                            5 ? (
                                                            <>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning"></i>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                              <i class="bi bi-star-fill text-warning mx-1"></i>
                                                            </>
                                                          ) : null}
                                                        </div>

                                                        <p className="text text-secondary mb-0">
                                                          {x?.review}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <hr className="my-4" />
                                  </>
                                )}
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
