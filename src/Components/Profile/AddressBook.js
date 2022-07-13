import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseJwt } from "../../utils/parseJwt";
import bgImg from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";
import UserSideBar from "../Profile/UserSideBar";

const AddressBook = () => {
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user._id;

  const [addressData, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/show-own-delivery-address/${user}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((e) => [console.log(e)]);
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
          

          {addressData ? (
            <div className="container col-md-9 py-4 ">
              <div className="bg-white p-2">
                <div className="mx-3">
                  <p className="text fs-5 p-2 fw-bold">Address Book</p>
                  <div className="card my-5 ">
                    <div className="card-body">
                      <table class="table table-responsive">
                        <thead>
                          <tr className="bg-light">
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Region</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody style={{ justifyContent: "center" }}>
                         
                              <tr>
                                <td>{addressData?.fullname}</td>
                                <td>{addressData?.address_detail?.address}</td>
                                <td>
                                  {addressData?.address_detail?.region}

                                  <br />
                                  {addressData?.address_detail?.city}

                                  <br />
                                  {addressData?.address_detail?.area}
                                </td>

                                <td>{addressData?.phone}</td>
                                <td>
                                  <button
                                    className="btn btn-link text-decoration-none"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                  >
                                    EDIT
                                  </button>
                                </td>
                              </tr>
                           
                        </tbody>
                      </table>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Update Address Book
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <div className="px-4 bg-white py-3">
                              <form>
                                <div className="bg-white">
                                  <div className="row mb-3">
                                    <div className="col-md-6">
                                      <div className="p-1">
                                        <label htmlFor="" className="mb-2">
                                          First Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          style={{ borderRadius: "0px" }}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="p-1">
                                        <label htmlFor="" className="mb-2">
                                          State
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          style={{ borderRadius: "0px" }}
                                        >
                                          <option selected="">
                                            Please select your state
                                          </option>
                                          <option value="Bagmati">
                                            Bagmati
                                          </option>
                                          <option value="Lumbini">
                                            Lumbini
                                          </option>
                                          <option value="Karnali">
                                            Karnali
                                          </option>
                                        </select>
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
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          style={{ borderRadius: "0px" }}
                                        >
                                          <option selected="">
                                            Please select your City
                                          </option>
                                          <option value="Kathmandu">
                                            Kathmandu
                                          </option>
                                          <option value="Lalitpur">
                                            Lalitpur
                                          </option>
                                          <option value="Bhaktapur">
                                            Bhaktapur
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-md-6">
                                      <div className="p-1">
                                        <label htmlFor="" className="mb-2">
                                          Area
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          style={{ borderRadius: "0px" }}
                                        >
                                          <option selected="">Area</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="p-1">
                                        <label htmlFor="" className="mb-2">
                                          Address
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          style={{ borderRadius: "0px" }}
                                        >
                                          <option selected="">Address</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Update Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ):(
            <div>
                <h1>Address is not found</h1>
              </div>
          )
        }
        </div>
      </div>
    </>
  );
};

export default AddressBook;
