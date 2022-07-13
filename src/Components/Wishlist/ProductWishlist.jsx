import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseJwt } from "../../utils/parseJwt";
import bgImg from "../../Images/first.png";
// import { toast } from "react-toastify";
import UserHeader from "../UserDashboard/UserHeader";
import UserSideBar from "../Profile/UserSideBar";


const ProductWishlist = () => {
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user._id;

  const [pdata, setProductData] = useState([]);

 useEffect(()=>{
  axios
  .get("http://localhost:5000/get-wishlists/" + user)
  .then((result) => {
    console.log(result.data)
    setProductData(result.data);

  })
  .catch((err) => {
    console.log(err);
  });
 })

 const addCart = (e, pid) => {
  e.preventDefault();
  // console.log(pid)
  axios
    .post("http://localhost:5000/add-to-cart", {
      pid: pid,
      userId: user,
      /////// need to work on,
      productQuantity: pdata[0]?.product?.pqty,
    })

    .then((result) => {
      console.log(result.data);
        window.location = "/cart";
        // setMsg("You have added product to cart");
      
    })
    .catch((e) => {
      console.log(e);
    });
};


const deleteWisilist = (id) => {
  // delete-wishlists
  axios.delete("http://localhost:5000/delete-wishlists/" + id).then((res) => {
    console.log(res.data);
    window.location = "/user-dashboard";
  });
};
  

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
          height: "30vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <UserHeader />
      </div>

      <div className="container-fluid" style={{ backgroundColor: "#d9d9d9" }}>
        <div className="row">
          <UserSideBar />
          <div className="col-md-8 ">
          {pdata.length > 0 ? (
          <>
            <h4 className="fw-normal mt-5 mb-4">Wishlist</h4>
          <table class="table table-responsive table-striped table-responsive-md">
            <tbody style={{ justifyContent: "center" }}>
              {pdata
                ? pdata.map((items) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={
                              "http://localhost:5000/" + items.product.pic
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
                        <td>{items.product.pname}</td>

                        <td>
                          <span
                            style={{
                              fontWeight: "600",
                              marginLeft: "50px",
                            }}
                          >
                            {items.product.pprice}
                          </span>
                        </td>
                        <td>
                          <i
                            onClick={(e) => addCart(e, items.product._id)}
                            className="bi bi-cart text-success"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </td>
                        <td>
                          <i
                            onClick={deleteWisilist.bind(this, items._id)}
                            className="bi bi-trash text-danger"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
      
      </>
          ):(
            <div>
              <h1 className="text-danger mt-5">There is no Any Product Added to Your Wishlist</h1>
            </div>
          )
        
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductWishlist;
