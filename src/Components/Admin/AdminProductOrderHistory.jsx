import axios from "axios";
import React, { useState, useEffect } from "react";
import { parseJwt } from "../../utils/parseJwt";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminProductOrderHistory = ({ adminData }) => {
  const [productOrder, setProductOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);
  const [unSeenNoti, setUnseenNoti] = useState([]);

  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user?._id;

  console.log(user);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-orders`)
      .then((result) => {
        setProductOrder(result.data);
      })
      .catch((err) => {
        console.log(err);
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
  }, [unSeenNoti]);

  useEffect(() => {
    calculation();
  });
  // calculating total products number in cart
  const calculation = () => {
    setProductQtyCart(
      cart.map((x) => x.productQuantity).reduce((x, y) => x + y, 0)
    );
  };
  return (
    <>
      <div className="container-fluid ps-0 py-3">
        <AdminHeader noti={unSeenNoti} productQtyCart={productQtyCart} />

        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />

          <div className="col-md-9">
            {productOrder.length === 0 ? (
              <div className="container">
                <div className="row">
                  <div className="col-md-10 col-12">
                    <h3 className="m-5">There is no any new orders...</h3>
                  </div>
                </div>
              </div>
            ) : (
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
                      <th scope="col">Total Cost</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productOrder &&
                      productOrder.map((proOrder, _id) => {
                        return (
                          <tr key={proOrder._id}>
                            <td>{proOrder.fullname}</td>
                            <td>
                              {proOrder.address_detail.address +
                                " , " +
                                proOrder.address_detail.state +
                                " , " +
                                proOrder.address_detail.city}
                            </td>
                            <td>{proOrder._id}</td>
                            <td>{proOrder.orderAt}</td>
                            <td>Rs. {proOrder.total}</td>
                            <td
                              className="fw-bold text-info"
                              style={{
                                borderRadius: "50px",
                                padding: "7px 10px 7px 10px",
                                cursor: "pointer",
                              }}
                            >
                              Purchased
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductOrderHistory;
