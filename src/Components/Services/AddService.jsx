import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import AdminHeader from "../Admin/AdminHeader";
import AdminSidebar from "../Admin/AdminSidebar";

const SuccessMsg = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center bg-gradient">
            <p className="text-dark">
              You have successfully added new service !!! Click "OK" to
              continue..
            </p>
            <Link
              to="/view-services"
              className="btn btn-outline-success"
              style={{
                fontWeight: "bold",
                borderRadius: "15px",
                border: "2px solid green",
              }}
            >
              OK
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
const AddService = ({ adminData }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceCategoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");
  const [unSeenNoti, setUnseenNoti] = useState([]);
  const [cart, setCart] = useState([]);
  const [productQtyCart, setProductQtyCart] = useState([]);

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  useEffect(() => {
    axios
      .get("http://localhost:5000/service-category/get")
      .then((result) => {
        setCategoryData(result.data);
      })
      .catch((e) => {
        console.log("Something Went Wrong!!");
      });
    axios
      .get("http://localhost:5000/service/all-noti-unseen")
      .then((response) => {
        setUnseenNoti(response.data);
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

  const serviceAddHandler = (data, e) => {
    e.preventDefault();
    console.log("hello");
    const serviceData = new FormData();
    serviceData.append("serviceName", serviceName);
    serviceData.append("serviceDesc", serviceDesc);
    serviceData.append("servicePrice", servicePrice);
    serviceData.append("serviceCategoryName", serviceCategoryName);
    serviceData.append("image", image);

    // const serviceData = {
    //   serviceName: serviceName,
    //   serviceDesc: serviceDesc,
    //   servicePrice: servicePrice,
    //   serviceCategoryName: serviceCategoryName,
    // };

    axios
      .post("http://localhost:5000/service/add", serviceData)
      .then((result) => {
        console.log(result.data);
        setServiceName("");
        setServiceDesc("");
        setServicePrice("");
        setCategoryName("");
        setImage("");
        toast.success(<SuccessMsg />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      })
      .catch((err) => {
        console.log("Something wrong in front-end");
      });
  };

  return (
    <>
      <div className="container-fluid ps-0 py-3">
        <AdminHeader noti={unSeenNoti} productQtyCart={productQtyCart} />

        <div className="row py-4 me-4">
          <AdminSidebar adminData={adminData} />
          <div className="col-md-9">
            <div className="container">
              <h1 className="text-center fw-bold my-5">Add Service</h1>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div
                    className="card p-4 shadow-lg"
                    style={{ border: "1px solid grey", borderRadius: "20px" }}
                  >
                    <form
                      method="POST"
                      action=""
                      onSubmit={handleSubmit(serviceAddHandler)}
                      encType="multipart/form-data"
                    >
                      <label
                        htmlFor="serviceCategoryName"
                        className="fw-bold fs-4 pb-2"
                      >
                        Service Category
                      </label>
                      <div className="input-group">
                        <select
                          style={{
                            border: "1px solid green",
                            borderRadius: "5px",
                            width: "100%",
                            padding: "5px",
                          }}
                          value={serviceCategoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                          className="p-2"
                        >
                          <option value="">
                            Please Choose Service Category
                          </option>
                          {/* using loop for display added category to product added form */}
                          {categoryData.map((d) => {
                            return (
                              <option value={d.serviceCategoryName}>
                                {d.serviceCategoryName}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* input field for product name */}
                      <div className="form-group">
                        <label
                          htmlFor="serviceName"
                          className="fw-bold fs-4 pb-2 mt-3"
                        >
                          Service Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.setServiceName && "invalid"
                          }`}
                          placeholder="Enter service name"
                          autoComplete="nope"
                          // firstname : validation
                          {...register("setServiceName", {
                            required: "service name is required",
                            minLength: {
                              value: 3,
                              message: "service name is too short",
                            },
                            maxLength: {
                              value: 20,
                              message: "service name is too long",
                            },
                          })}
                          style={{
                            border: "1px solid green",
                          }}
                          // changing data on typing and set data to service name variable and send to database
                          value={serviceName}
                          onChange={(e) => setServiceName(e.target.value)}
                          id="serviceName"
                        />
                        {/* for displaying error message on validating */}
                        {errors.setServiceName && (
                          <small className="text-danger">
                            {errors.setServiceName.message}
                          </small>
                        )}
                      </div>

                      {/* input field for service image */}
                      <div className="form-group">
                        <label
                          htmlFor="file"
                          className="fw-bold fs-4 pb-2 mt-3"
                        >
                          Choose Service Image
                        </label>
                        <input
                          type="file"
                          name="image"
                          className="form-control"
                          {...register("setImage", {
                            required: "Choose service image",
                          })}
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{
                            border: "1px solid green",
                          }}
                          id="image"
                        />
                        {errors.setImage && (
                          <small className="text-danger">
                            {errors.setImage.message}
                          </small>
                        )}
                      </div>

                      {/* input field for product price*/}
                      <div className="form-group">
                        <label
                          htmlFor="servicePrice"
                          className="fw-bold fs-4 pb-2 mt-3"
                        >
                          Service Price
                        </label>
                        <input
                          //type="number"
                          type="phone"
                          className={`form-control ${
                            errors.setServicePrice && "invalid"
                          }`}
                          placeholder="Enter product price"
                          {...register("setServicePrice", {
                            required: "service price is required",
                            pattern: {
                              value: /^[0-9\b]+$/,
                              message: "Enter digits only",
                            },
                          })}
                          style={{ border: "1px solid green" }}
                          value={servicePrice}
                          onChange={(e) => setServicePrice(e.target.value)}
                          id="servicePrice"
                        />
                        {errors.setServicePrice && (
                          <small className="text-danger">
                            {errors.setServicePrice.message}
                          </small>
                        )}
                      </div>

                      {/* input field for product desc */}
                      <div className="form-group">
                        <label
                          htmlFor="serviceDesc"
                          className="fw-bold fs-4 pb-2 mt-3"
                        >
                          Description
                        </label>
                        <textarea
                          type="text"
                          className={`form-control ${
                            errors.setServiceDesc && "invalid"
                          }`}
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="write something for it"
                          {...register("setServiceDesc", {
                            required: "description is required",
                          })}
                          style={{ border: "1px solid green" }}
                          value={serviceDesc}
                          onChange={(e) => setServiceDesc(e.target.value)}
                        ></textarea>
                        {errors.setServiceDesc && (
                          <small className="text-danger">
                            {errors.setServiceDesc.message}
                          </small>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-info w-100 text-uppercase fw-bold text-white mt-4"
                        id="submitBtn"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddService;
