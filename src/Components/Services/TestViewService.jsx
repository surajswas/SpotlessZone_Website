import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader";
import AdminSidebar from "../Admin/AdminSidebar";
// import AdminDashboard from "../Admin/AdminDashboard"

// use reducer

const TestViewAdminService = ({ adminData }) => {
  const [sdata, setServiceData] = useState([]);
  const [unSeenNoti, setUnseenNoti] = useState([]);

  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);

  const { pid } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/get")
      .then((result) => {
        // console.log(result.data.pname);
        setServiceData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/service/all-noti-unseen")
      .then((response) => {
        setUnseenNoti(response.data);
      })

      .catch(() => {
        console.log("error occur");
      });

    // for total number of registered users
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
    // for total price
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

  const deleteAdminService = (sid) => {
    axios.delete("http://localhost:5000/service/delete/" + sid).then(() => {
      console.log("item deletex");
    });
    console.log(pid);
  };

  const headers = [
    { key: "image", label: "Service Image" },
    { key: "serviceName", label: "Service Name" },
    { key: "servicePrice", label: "Service Cost" },
    { key: "serviceCategoryName", label: "Service Category" },
    { key: "serviceDesc", label: "Description" },
    { key: "action", label: "Action" },
  ];

  return (
    <>
      <div className="container-fluid ps-0 py-3">
        <AdminHeader noti={unSeenNoti} productQtyCart={productQtyCart} />

        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />
          <div className="col-md-9">
            {/* implementing conditions for products in cart */}
            {sdata.length === 0 ? (
              <div className="container">
                <div className="row">
                  <div className="col-md-10 col-12">
                    <Link to="/add-service" className="btn btn-info">
                      Add Service
                    </Link>
                    <h3 className="m-5">
                      There is no any services to display!!!
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="container-fluid" id="displayServices">
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-12">
                      <div className="card">
                        <Link
                          to="/add-service"
                          className="btn btn-info w-25 ms-auto float-end m-3 text-white text-uppercase fw-bold"
                        >
                          Add Service
                        </Link>
                        <table class="table table-responsive">
                          <thead>
                            <tr>
                              {headers.map((row) => {
                                return <th key={row.key}>{row.label}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody style={{ justifyContent: "center" }}>
                            {/* for produdct added data  data : use loop*/}
                            {sdata.map((s) => {
                              return (
                                <tr>
                                  <td>
                                    <img
                                      src={"http://localhost:5000/" + s.image}
                                      alt=""
                                      className="img-fluid"
                                      style={{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </td>

                                  <td>
                                    <span
                                      style={{
                                        fontWeight: "600",
                                        marginLeft: "50px",
                                      }}
                                    >
                                      {s.serviceName}
                                    </span>
                                  </td>

                                  <td>
                                    <span
                                      style={{
                                        fontWeight: "600",
                                        marginLeft: "50px",
                                      }}
                                    >
                                      {s.servicePrice}
                                    </span>
                                  </td>

                                  <td>{s.serviceCategoryName}</td>

                                  <td>{s.serviceDesc}</td>

                                  <td>
                                    <Link
                                      to={`/update-service/${s._id}`}
                                      className="d-flex"
                                    >
                                      <i className="bi bi-pencil-square fa-2x text-primary"></i>
                                    </Link>
                                    <span
                                      onClick={deleteAdminService.bind(
                                        this,
                                        s._id
                                      )}
                                      style={{ cursor: "pointer" }}
                                      className="d-flex"
                                    >
                                      <i className="bi bi-trash-fill fa-2x text-danger"></i>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
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
export default TestViewAdminService;
