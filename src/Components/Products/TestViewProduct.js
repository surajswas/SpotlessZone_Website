import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader";
import AdminSidebar from "../Admin/AdminSidebar";
// import AdminDashboard from "../Admin/AdminDashboard"

// use reducer

const AdminProducts = ({ adminData }) => {
  const [pdata, setProductData] = useState([]);
  const [unSeenNoti, setUnseenNoti] = useState([]);

  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);

  const { pid } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/get/product")
      .then((result) => {
        // console.log(result.data.pname);
        setProductData(result.data);
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

  const deleteAdminProduct = (pid) => {
    axios.delete("http://localhost:5000/product-delete/" + pid).then(() => {
      console.log("item deletex");
    });
    console.log(pid);
  };

  const headers = [
    { key: "pic", label: "Product Image" },
    { key: "pname", label: "Product Name" },
    { key: "pqty", label: "Quantity" },
    { key: "pdesc", label: "Description" },
    { key: "action", label: "Action" },
  ];

  return (
    <>
      <div className="container-fluid ps-0 py-3" id="displayProducts">
        <AdminHeader noti={unSeenNoti} productQtyCart={productQtyCart} />

        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />
          <div className="col-md-9">
            {/* implementing conditions for products in cart */}
            {pdata.length === 0 ? (
              <div className="container">
                <div className="row">
                  <div className="col-md-10 col-12">
                    <Link to="/addProduct" className="btn btn-info">
                      Add Product
                    </Link>
                    <h3 className="m-5">
                      There is no any products to display!!!
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="container-fluid" id="displayProducts">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-12">
                          <div className="card my-5">
                            <div className="card-body">
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
                                  {pdata.map((items) => {
                                    return (
                                      <tr>
                                        <td>
                                          <img
                                            src={
                                              "http://localhost:5000/" +
                                              items.pic
                                            }
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
                                            {items.pname}
                                          </span>
                                        </td>

                                        <td>
                                          <span
                                            style={{
                                              fontWeight: "600",
                                              marginLeft: "50px",
                                            }}
                                          >
                                            {items.pqty}
                                          </span>
                                        </td>

                                        <td>{items.pdesc}</td>

                                        <td>
                                          {/* <i
                                          className="bi bi-trash-fill"
                                          onClick={deleteAdminProduct.bind(
                                            this,
                                            items._id
                                          )}
                                          style={{
                                            cursor: "pointer",
                                            color: "red",
                                            fontSize: "1.2rem",
                                          }}
                                        ></i> */}
                                          {/* fkjkfj */}
                                          <Link
                                            to={`/update-product/${items._id}`}
                                            className="d-flex"
                                          >
                                            <i className="bi bi-pencil-square fa-2x text-primary"></i>
                                          </Link>
                                          <span
                                            onClick={deleteAdminProduct.bind(
                                              this,
                                              items._id
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
export default AdminProducts;
