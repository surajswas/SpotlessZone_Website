import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseJwt } from "../../utils/parseJwt";
import bgImg from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";
import UserSideBar from "../Profile/UserSideBar";

const ReviewPage = () => {
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user._id;
  console.log(user);

  const [productData, setProductData] = useState({});
  // const [revData, setReview] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/get/product")
      .then((result) => {
        // console.log(result.data[0].reviewandrating[0].user);
        setProductData(result.data);
        // const reviewdata = result.data;
        // reviewdata.map((x, idx)=> {
        //     const ownReview = x?.reviewandrating;
        // console.log(ownReview)
        // ownReview.filter((f)=> f.user === user)
        // .map((m, idx)=>{
        // console.log(m)
        // setReview(m)
        // })
        // })
      })
      .catch((e) => {
        console.log("Something Went Wrong!!");
      });
  }, []);

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
            {productData?.length > 0 ? (
              <>
                <h4 className="fw-normal mt-5 mb-4">Product Reviews</h4>
                <table class="table table-responsive table-striped table-responsive-md">
                  <thead>
                    <tr>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Rating</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody style={{ justifyContent: "center" }}>
                    {productData
                      ? productData.map((val, _id) => {

                          return (
                            <>
                            <tr key={val._id}>
                              <td>
                                <img
                                  src={"http://localhost:5000/" + val?.pic}
                                  alt=""
                                  className="img-fluid"
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                    borderRadius: "5px",
                                  }}
                                />
                              </td>
                              <td>{val?.pname}</td>

                              <td>
                              {val?.reviewandrating
                                ?.filter((x) => x.user === user)
                                .map((y, _id) => {
                                  return (
                                    <>
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-md-2">
                                        
                                      <span
                                        style={{
                                          fontWeight: "600",
                                          marginLeft: "50px",
                                        }}
                                      >
                                        <span>{y?.rating}</span>
                                      </span>
                                    
                                        </div>
                                      </div>
                                    </div>
                                    </>
                                    
                                  );
                                })}
                                </td>


                                <td>
                  {val?.reviewandrating
                                ?.filter((x) => x.user === user)
                                .map((y, _id) => {
                                  return (
                                    <>
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-md-12">
                                        
                                      <span
                                        style={{
                                          fontWeight: "600",
                                          marginLeft: "50px",
                                        }}
                                      >
                                        <span>{y?.review}</span>
                                      </span>
                                   
                                        </div>
                                      </div>
                                    </div>
                                    </>
                                    
                                  );
                                })}

</td>
                            </tr>
                            </>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </>
            ) : (
              <div>
                <h1 className="text-danger mt-5">
                  There is no Any Product Added to Your Wishlist
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
