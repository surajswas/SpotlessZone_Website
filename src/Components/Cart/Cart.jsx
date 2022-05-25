import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png";

// use reducer

const ProductCart = () => {
  const [pdata, setProductData] = useState([]);
  const [totalprice, setTotalPrice] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-products-cart")
      .then((result) => {
        //console.log(result.data);
        setProductData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // for total price
    setTotalPrice(
      pdata.reduce(
        (acc, curr) =>
          acc + Number(curr.productId.pqty * curr.productId.pprice),
        0
      )
    );
  });

  function deleteproductCart(pid) {
    axios

      .delete("http://localhost:5000/deleteitem/" + pid)

      .then((e) => {
        setMessage("Item delete successfully!");
      })

      .catch((e) => {
        console.log(e);
      });
  }

  const headers = [
    { key: "pic", label: "Product Image" },
    { key: "pname", label: "Product Name" },
    { key: "pqty", label: "Quantity" },
    { key: "pprice", label: "Price Per Qty" },
    { key: "tprice", label: "Total Price" },
    { key: "action", label: "Action" },
  ];

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
          <h1 className="text-center text-white my-4 fw-bold">Cart</h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt; <span className="text-white">Cart</span>
            </Link>
          </div>
        </div>
      </div>
      {/* implementing conditions for products in cart */}
      {pdata.length === 0 ? (
        <div className="check_cart container">
          <div className="row">
            <div className="col-md-10 col-12">
              <Link to="/display-all-products" className="btn btn-info">
                Add Product
              </Link>
              <h3 className="m-5">There is no any products in your cart !!!</h3>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h4 className="m-5">
                  You Have Added{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "30px",
                      color: "green",
                    }}
                  >
                    {pdata.length}
                  </span>{" "}
                  Items To Your Cart.
                </h4>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-12">
                    <h1> {message}</h1>
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
                            {pdata && pdata.length > 0
                              ? pdata.map((items) => {
                                  return (
                                    <tr>
                                      <td>
                                        <img
                                          src={
                                            "http://localhost:5000/" +
                                            items.productId.pic
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
                                      <td>{items.productId.pname}</td>
                                      <td className="d-flex">
                                        <span
                                          //   onClick={decreaseQuantity}
                                          style={{
                                            display: "inline-block",
                                            textAlign: "center",
                                            verticalAlign: "middle",
                                            border: "1px solid grey",
                                            backgroundColor: "lightgrey",
                                            padding: "0px 4px",
                                            borderTopLeftRadius: "5px",
                                            borderBottomLeftRadius: "5px",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <i className=" bi bi-dash"></i>
                                        </span>
                                        <input
                                          type="phone"
                                          value={items.productId.pqty}
                                          style={{
                                            maxWidth: "50px",
                                            textAlign: "center",
                                            display: "inline-block",
                                            fontWeight: "bold",
                                            borderRight: "none",
                                            borderLeft: "none",
                                            borderTop: "1px solid grey",
                                            borderBottom: "1px solid grey",
                                          }}
                                        />
                                        <span
                                          //   onClick={increaseQuantity}
                                          style={{
                                            display: "inline-block",
                                            textAlign: "center",
                                            verticalAlign: "middle",
                                            border: "1px solid grey",
                                            backgroundColor: "lightgrey",
                                            padding: "0px 4px",
                                            borderTopRightRadius: "5px",
                                            borderBottomRightRadius: "5px",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <i className="bi bi-plus"></i>
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          style={{
                                            fontWeight: "600",
                                            marginLeft: "50px",
                                          }}
                                        >
                                          {items.productId.pprice}
                                        </span>
                                      </td>
                                      <td>
                                        <span
                                          style={{
                                            fontWeight: "600",
                                            marginLeft: "30px",
                                          }}
                                        >
                                          {items.productId.pqty *
                                            items.productId.pprice}
                                        </span>
                                      </td>

                                      <td>
                                        <i
                                          className="bi bi-trash-fill"
                                          onClick={deleteproductCart.bind(
                                            this,
                                            items._id
                                          )}
                                          style={{
                                            cursor: "pointer",
                                            color: "red",
                                            fontSize: "1.2rem",
                                          }}
                                        ></i>
                                      </td>
                                    </tr>
                                  );
                                })
                              : "Loading..."}
                          </tbody>
                        </table>
                        <div className="total_amount">
                          <h3 className="float-right px-5 font-weight-bold">
                            Total Amount:{" "}
                            {/* {data.map((productdataCart) => {
                      return ( */}
                            <span
                              className="px-3"
                              style={{
                                fontStyle: "italic",
                                fontWeight: "500",
                                color: "green",
                              }}
                            >
                              {totalprice}
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="flex-btns" style={{ textAlign: "end" }}>
                        <Link to="/cart" className="btn btn-warning">
                          Proceed To Checkout
                        </Link>
                        <Link
                          to="/display-all-products"
                          className="btn btn-info m-3"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProductCart;
