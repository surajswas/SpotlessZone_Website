import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const TestNotification = ({ adminData }) => {
  // const { id } = useParams();
  const [unSeenNoti, setUnseenNoti] = useState([]);
  const [allNoti, setAllNoti] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/service/all-noti-unseen")
      .then((response) => {
        setUnseenNoti(response.data);
      })

      .catch(() => {
        console.log("error occur");
      });
    axios
      .get("http://localhost:5000/service/all-noti")
      .then((response) => {
        setAllNoti(response.data);
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
  }, [allNoti, unSeenNoti]);

  const handleSeen = (e, nid) => {
    console.log("object");
    e.preventDefault();
    const sd = {
      isVisible: !isVisible,
    };

    axios
      .put("http://localhost:5000/service/noti/" + nid, sd)
      .then((result) => {
        console.log(result.data);
      })
      .catch(() => {
        console.log("notification: error");
      });
  };

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
      <div className="container-fluid ps-0 py-3" id="notifications">
        <AdminHeader noti={unSeenNoti} productQtyCart={productQtyCart} />
        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />
          <div className="col-md-8">
            {unSeenNoti && unSeenNoti.length > 0 ? (
              <div className="container my-4">
                <h3>
                  You Have Got{" "}
                  <span className="fst-italic text-info me-2">
                    {unSeenNoti.length}
                  </span>
                  New Notifications
                </h3>
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <h3 className="text-center fw-bold mt-5">
                    There is no any notifications
                  </h3>
                </div>
              </div>
            )}

            <div className="container my-5" >
              <div className="row">
                {allNoti &&
                  allNoti.map((d, _id) => {
                    return (
                      <div className="col-md-3 my-3" key={d._id}>
                        <div className="card shadow-lg">
                          <p className="ps-3 text-danger fw-bold">
                            {d.userName}
                          </p>
                          <h6 className="fw-normal ps-3">
                            Notice Regarding{" "}
                            <span className="fw-bold">{d.notiTitle}</span>
                          </h6>
                          <h6 className="ps-3">{d.address}</h6>
                          {d && d.isVisible ? (
                            <button className="btn btn-primary m-3">
                              Seen
                            </button>
                          ) : (
                            <button
                              onClick={(e) => handleSeen(e, d._id)}
                              className="btn btn-dark m-3"
                              type="submit"
                            >
                              Mark As Read
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestNotification;
