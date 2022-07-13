import React, { useEffect, useState } from "react";
import axios from "axios";
// import KhaltiCheckout from "khalti-checkout-web";
import bgImg from "../../Images/first.png";
import { Link, useNavigate } from "react-router-dom";
import Items from "./Items";
import UserHeader from "../UserDashboard/UserHeader";

// use reducer
const ProductCart = () => {
  const [pdata, setProductData] = useState([]);
  const [totalprice, setTotalPrice] = useState("");
  const [productQtyCart, setProductQtyCart] = useState([]);

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
  const user = token?.user?._id;

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-products-cart/" + user)
      .then((result) => {
        // console.log(result.data[0].productQuantity)
        setProductData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // for total price
    setTotalPrice(
      pdata
        .reduce(
          (acc, curr) =>
            acc + Number(curr.productQuantity * curr.productId?.pprice),
          0
        )
        .toFixed(2)
    );
  }, [pdata, totalprice]);

  useEffect(() => {
    calculation();
  });

  const calculation = () => {
    setProductQtyCart(
      pdata.map((x) => x.productQuantity).reduce((x, y) => x + y, 0)
    );
  };
  const navigate = useNavigate();

  const proceed = () => {
    navigate("/checkout", { state: pdata });
  };

  // khalti payment integration
  // let config = {
  //   publicKey: "test_public_key_881f535efbb040ee885f85e52aff77aa",
  //  stt productIdentity: "12345",
  //   productName: "foods",
  //   productUrl: "http://localhost:3000",
  //   eventHandler: {
  //     onSuccess(payload) {
  //       axios
  //         .post("http://localhost:5000/order", {
  //           products: pdata,
  //           total: totalprice,
  //           user: user,
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //         });
  //       console.log(payload);
  //     },
  //     onError(error) {
  //       console.log(error);
  //     },
  //     onClose() {
  //       console.log("widget is closing");
  //     },
  //   },
  //   paymentPreference: [
  //     "KHALTI",
  //     "EBANKING",
  //     "MOBILE_BANKING",
  //     "CONNECT_IPS",
  //     "SCT",
  //   ],
  // };
  // let checkout = new KhaltiCheckout(config);

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
        <UserHeader />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">Cart</h1>
          <div className="row text-center">
            <Link
              className="text-success fw-bold text-decoration-none"
              to="/user-dashboard"
            >
              Dashboard &gt;&gt; <span className="text-white">Cart</span>
            </Link>
          </div>
        </div>
      </div>
      {/* implementing conditions for products in cart */}
      {pdata.length === 0 ? (
        <div className="check_cart container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-12 my-5">
              <h3 className="m-5 text-danger text-center">
                There is no any products in your cart !!!
              </h3>
              <Link
                to="/display-all-products"
                className="btn btn-info me-auto ms-auto d-block w-50 text-white text-uppercase fw-bold"
              >
                Continue Shopping
              </Link>
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
                    {productQtyCart}
                  </span>{" "}
                  Items To Your Cart.
                </h4>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 mb-5">
                <div className="row justify-content-center">
                  <div className="col-md-8 col-12">
                    <div className="card my-5">
                      <div className="card-body">
                        <table className="table table-responsive">
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
                              ? pdata.map((item) => {
                                  return (
                                    <Items
                                      key={item._id}
                                      cartId={item._id}
                                      productId={item.productId}
                                      // userId={item.userId}
                                      productQuantity={item.productQuantity}
                                      // {...item}
                                    />
                                  );
                                })
                              : "Loading..."}
                          </tbody>
                        </table>
                        <div className="total_amount">
                          <h3 className="float-right px-5 font-weight-bold">
                            Total Amount:{" "}
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
                    </div>
                    <div className="flex-btns" style={{ textAlign: "end" }}>
                      <button onClick={proceed} className="btn btn-warning ">
                        Proceed to checkout
                      </button>
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
        </>
      )}
    </>
  );
};
export default ProductCart;
