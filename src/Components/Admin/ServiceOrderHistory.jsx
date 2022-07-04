import { useState, useEffect } from "react";
import "./ServiceOrderHistory.css";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const ServiceOrderHistory = ({ adminData }) => {
  const [pdata, setProductData] = useState([]);
  const [unSeenNoti, setUnseenNoti] = useState([]);
  const [serviceOrder, setServiceOrders] = useState([]);
  const [deliveryStatus, setStatus] = useState(false);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);

  // const orderTypes = ["All", "Pending", "In transit", "Delivered"]
  // const [setOrderType, setOrderTypes] = useState("")
  // const { pid } = useParams();

  useEffect(() => {

    // for all order services data
    axios
      .get("http://localhost:5000/service/get-booked-service-details")
      .then((response) => {
        if (response) {
          // console.log(`checking 2nd cond: ${l.length}`)
          //   setNotiData(response.data);
          if (response.data) {
            setServiceOrders(response.data);
            // console.log(response.data);
          }
        } else {
          console.log("all true");
        }
      })

      .catch(() => {
        console.log("error occur");
      });

    // only for pending order services
    axios
      .get("http://localhost:5000/service/pending-service-orders")
      .then((response) => {
        if (response) {
          // console.log(`checking 2nd cond: ${l.length}`)
          //   setNotiData(response.data);
          if (response.data) {
            setPendingOrder(response.data);
            // console.log(response.data);
          }
        } else {
          console.log("all true");
        }
      })

      .catch(() => {
        console.log("error occur");
      });

    // only for pending order services
    axios
      .get("http://localhost:5000/service/delivered-service-orders")
      .then((response) => {
        if (response) {
          // console.log(`checking 2nd cond: ${l.length}`)
          //   setNotiData(response.data);
          if (response.data) {
            setDeliveredOrder(response.data);
            // console.log(response.data);
          }
        } else {
          console.log("all true");
        }
      })

      .catch(() => {
        console.log("error occur");
      });

    axios
      .get("http://localhost:5000/get-total-products-cart")
      .then((response) => {
        if (response) {
          console.log(response.data[0].productQuantity);
          setCart(response.data);
        } else {
          console.log("Something went wrong");
        }
      })

      .catch(() => {
        console.log("error occur");
      });
    axios
      .get("http://localhost:5000/service/all-noti-unseen")
      .then((response) => {
        setUnseenNoti(response.data);
      })

      .catch(() => {
        console.log("error occur");
      });
  }, [serviceOrder, pendingOrder, deliveredOrder, unSeenNoti]);

  useEffect(() => {
    calculation();
  });
  // calculating total products number in cart
  const calculation = () => {
    setProductQtyCart(
      cart.map((x) => x.productQuantity).reduce((x, y) => x + y, 0)
    );
  };

  const handleApprove = (e, soid) => {
    e.preventDefault();
    const sod = {
      deliveryStatus: !deliveryStatus,
    };
    axios
      .put("http://localhost:5000/service/service-order-history/" + soid, sod)
      .then((result) => {
        if (result) {
          console.log("success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeny = (e, soid) => {
    e.preventDefault();
    const sod = {
      deliveryStatus: deliveryStatus,
    };
    axios
      .put("http://localhost:5000/service/service-order-history/" + soid, sod)
      .then((result) => {
        if (result) {
          console.log("success");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* top wala */}

      <div className="container-fluid ps-0 py-3">
        <AdminHeader noti={unSeenNoti} productQtyCart={productQtyCart} />

        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />

          <div className="col-md-9">
            {/* implementing conditions for products in cart */}
            {serviceOrder.length === 0 ? (
              <div className="container">
                <div className="row">
                  <div className="col-md-10 col-12">
                    <h3 className="m-5">There is no any new orders...</h3>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="container p-4 mt-5 orderContainer"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="row">
                    <div className="text">
                      <h1>Orders</h1>
                      {pendingOrder.length > 0 && (
                        <small>
                          Good Afternoon{" "}
                          <span className="fw-bold me-2">
                            {adminData.name}!
                          </span>
                          You have{" "}
                          <span className="fw-bold">{pendingOrder.length}</span>{" "}
                          pending orders.
                        </small>
                      )}
                      {pendingOrder.length === 0 && (
                        <small>
                          Good Afternoon{" "}
                          <span className="fw-bold me-2">
                            {adminData.name}!
                          </span>
                          You don't have any pending orders.
                        </small>
                      )}
                    </div>

                    {/* for card */}
                    {serviceOrder &&
                      serviceOrder.map((x) => {
                        return (
                          <div className="col-md-4" key={x._id}>
                            <div className="card p-2 orderCard m-3">
                              <div className="cusname-address-cost">
                                <div className="cusname-address">
                                  <h6>{x.userName}</h6>
                                  <div className="address-date">
                                    <div>
                                      <span className="fw-bold">
                                        {x.address}
                                      </span>
                                    </div>
                                    <small>{x.createdAt}</small>
                                  </div>
                                </div>

                                <div className="cost">
                                  <small className="fw-bold">
                                    ${x.totalServiceCost}
                                  </small>
                                </div>
                              </div>

                              <div className="image">
                                <img
                                  src={
                                    "http://localhost:5000/" +
                                    x.serviceDetails[0].image
                                  }
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>

                              <hr />
                              <div className="deny-approve-buttons d-flex gap-4 ms-auto ">
                                <p
                                  className="text-muted fw-bold"
                                  onClick={(e) => handleDeny(e, x._id)}
                                >
                                  Deny
                                </p>
                                {x.deliveryStatus ? (
                                  <p
                                    className="text-success fw-bold"
                                    onClick={(e) => handleApprove(e, x._id)}
                                  >
                                    Approved
                                  </p>
                                ) : (
                                  <p
                                    className="text-primary fw-bold"
                                    onClick={(e) => handleApprove(e, x._id)}
                                  >
                                    Approve
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="row pt-5 pb-3 orderType">
                    <div className="col-md-1 fw-bold">
                      <div className="all">
                        <small>All</small>
                      </div>
                    </div>

                    <div className="col-md-1 fw-bold">
                      <div className="pending">
                        <small>Pending</small>
                        <div className="number">{pendingOrder.length}</div>
                      </div>
                    </div>

                    <div className="col-md-2 fw-bold">
                      <div className="transit">
                        <small>In transit</small>
                        <div className="number">1</div>
                      </div>
                    </div>

                    <div className="col-md-1 fw-bold">
                      <div className="delivered">
                        <small>Delivered</small>
                        <div className="number">{deliveredOrder.length}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row m-0 p-0"
                    style={{ backgroundColor: "#fffcf7", borderRadius: "10px" }}
                  >
                    {/* search and filter */}
                    <div className="container search-filter-container">
                      <div className="search-input-filter">
                        <div className="search-input">
                          <i className="bi bi-search"></i>
                          <input
                            type="text"
                            placeholder="Type to filter orders..."
                            className="search"
                          />
                        </div>

                        <div className="filter-icon">
                          <i className="bi bi-filter"></i>
                          <small>Filters</small>
                        </div>
                      </div>
                    </div>
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th scope="col">Ordered By</th>
                          <th scope="col">Address</th>
                          <th scope="col">Order ID</th>
                          <th scope="col">Date</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceOrder &&
                          serviceOrder.map((x) => {
                            return (
                              <tr>
                                <td>{x.userName}</td>
                                <td>{x.address}</td>
                                <td>{x._id}</td>
                                <td>{x.createdAt}</td>
                                <td>$ {x.totalServiceCost}</td>
                                <div className="statusBtn">
                                  {x.deliveryStatus ? (
                                    <td className="deliveredBtn">Delivered</td>
                                  ) : (
                                    <td className="pendingBtn">Pending</td>
                                  )}
                                </div>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceOrderHistory;
