import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import First from "../../Images/first.png";
import KhaltiCheckout from "khalti-checkout-web";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import UserHeader from "../UserDashboard/UserHeader";

const Checkout = () => {
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const [pdata, setProductData] = useState();
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user._id;
  const [totalprice, setTotalPrice] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("")
  const [points, setPoints] = useState(0);
  const location = useLocation();
  const [productQtyCart, setProductQtyCart] = useState([]);

  const [addressDetails, setBillingAddress] = useState([]);


  // khalti payment integration
  let config = {
    publicKey: "test_public_key_881f535efbb040ee885f85e52aff77aa",
    productIdentity: "12345",
    productName: "foods",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess(payload) {
        axios
          .post("http://localhost:5000/order", {
            products: pdata,
            total: totalprice,
            user: user,
            points: points,
            fullname,
            phone,
            address_detail: {
              address: address,
              region: region,
              city: city,
              area: area,
            },
          })
          .then((res) => {
            console.log(res.data);
          });
        console.log(payload);
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);

  //   const headers = [
  //     { key: "pic", label: "Product Image" },
  //     { key: "pname", label: "Product Name" },
  //     { key: "pqty", label: "Quantity" },
  //     { key: "pprice", label: "Price Per Qty" },
  //     { key: "tprice", label: "Total Price" },
  //     { key: "action", label: "Action" },
  //   ];

  // const items = result.data
  // items.map((val, ind)=>{
  //     const total = val.productId.pprice*val.productQuantity
  //     setTotalPrice(totalprice+total)
  // })

  // console.log(city);
  useEffect(() => {
    axios
      .get("http://localhost:5000/get-products-cart/" + user)
      .then((result) => {
        setProductData(result.data);
        // const items = result.data
        // items.map((val, ind)=>{
        //     const total = val.productId.pprice*val.productQuantity
        //     setTotalPrice(totalprice+total)
        // })
      })
      .catch((err) => {
        console.log(err);
      });
    setTotalPrice(
      location.state
        .reduce(
          (acc, curr) =>
            acc + Number(curr.productQuantity * curr.productId.pprice),
          0
        )
        .toFixed(2)
    );
    billingAddress();
  }, []);

  const billingAddress = () => {
    axios
      .get("http://localhost:5000/show-own-delivery-address/" + user)
      .then((response) => {
        setBillingAddress(response.data)
        setFullName(response.data?.fullname)
        setPhone(response.data?.phone)
        setAddress(response.data?.address_detail?.address)
        setRegion(response.data?.address_detail?.region)
        setCity(response.data?.address_detail?.city)
        setArea(response.data?.address_detail?.area)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(addressDetails)
  //   console.log(city);
  const discount = () => {
    const wallet = token?.user.points;
    if (points > wallet) {
      toast.error("Insufficient Points!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      var discountPrice = points / 10;
      const tprice = totalprice - discountPrice;
      setTotalPrice(tprice);
    }
  };

  useEffect(() => {
    calculation();
  });

  const calculation = () => {
    setProductQtyCart(
      location.state.map((x) => x.productQuantity).reduce((x, y) => x + y, 0)
    );
  };

  return (
    <>
      <div
        className="container-fluid homeImg py-3"
        style={{
          paddingTop: 70,
          backgroundColor: "#ebebeb",
          background: `url(${First})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <UserHeader />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">Checkout Page</h1>
          <div className="row text-center">
            <Link
              className="text-success fw-bold text-decoration-none"
              to="/user-dashboard"
            >
              Dashboard &gt;&gt;{" "}
              <span className="text-white">Checkout Page</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light py-4">
        <div className="container col-md-11">
          <div className="row my-3">
            <div className="col-md-9">
              <div className="px-4 bg-white py-3">
                <form>
                  <div className="bg-white">
                    <p className="text text-start text-dark">
                      Delivery Information
                    </p>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="p-1">
                          <label htmlFor="" className="mb-2">
                            Full Name
                          </label>
                          <input
                            value={fullname}
                            type="text"
                            className="form-control"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-1">
                          <label htmlFor="region" className="mb-2">
                            Region
                          </label>
                          <input
                            value={region}
                            type="text"
                            className="form-control"
                            style={{ borderRadius: "0px" }}
                          />
                          {/* <select
                            onChange={(e) => setState(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                            style={{ borderRadius: "0px" }}
                          >
                            <option selected="">
                              Please select your state
                            </option>
                            <option value="Bagmati">Bagmati</option>
                            <option value="Lumbini">Lumbini</option>
                            <option value="Karnali">Karnali</option>
                          </select> */}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="p-1">
                          <label htmlFor="" className="mb-2">
                            Phone no
                          </label>
                          <input
                          value = {phone}
                            type="text"
                            className="form-control"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-1">
                          <label htmlFor="" className="mb-2">
                            City
                          </label>
                         <input value = {city}
                            type="text"
                            className="form-control"
                            style={{ borderRadius: "0px" }}
                          />
                          {/* <select
                            className="form-select"
                            aria-label="Default select example"
                            style={{ borderRadius: "0px" }}
                          >
                            <option selected="">Please select your City</option>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Lalitpur">Lalitpur</option>
                            <option value="Bhaktapur">Bhaktapur</option>
                          </select> */}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="p-1">
                          <label htmlFor="" className="mb-2">
                            Area
                          </label>
                          <input value = {area}
                            type="text"
                            className="form-control"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-1">
                          <label htmlFor="" className="mb-2">
                            Address
                          </label>
                         <input value = {address}
                            type="text"
                            className="form-control"
                            style={{ borderRadius: "0px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-3 bg-white py-3 px-4">
              <p className="text text-dark fs-5 border-bottom border-2 mb-3">
                Order Summary
              </p>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text text-secondary mb-0">
                  Subtotal ({productQtyCart})
                </p>
                <p className="text text-dark fw-bold mb-0">Rs. {totalprice}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="text text-secondary mb-0">Shipping Fee</p>
                <p className="text text-dark fw-bold mb-0">Rs. 0</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  onChange={(e) => setPoints(e.target.value)}
                  type="text"
                  className="form-control me-2"
                  style={{ borderRadius: "0px" }}
                />
                <button
                  onClick={discount}
                  className="btn btn-primary px-3"
                  style={{ borderRadius: "0px" }}
                >
                  Apply
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="text text-secondary mb-0">Total:</p>
                <div>
                  <p className="text text-dark fw-bold text-end mb-0">
                    Rs. {totalprice}
                  </p>
                  <small className="d-block text-secondary text-end">
                    VAT Included
                  </small>
                </div>
              </div>
              <button
                onClick={() =>
                  checkout.show({ amount: 1000, mobile: 9861905670 })
                }
                className="btn btn-warning w-100"
                style={{ borderRadius: "0px" }}
              >
                Processed to Pay
              </button>
              {/* <button onClick={checkout.show({ amount: 1000, mobile: 9861905670})} className="btn btn-secondary w-100" style={{ borderRadius: '0px' }}>Processed to Pay</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
