import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddService = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceCategoryName, setCategoryName] = useState("");
  const [image, setImage] = useState("");

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
  }, []);

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
      })
      .catch((err) => {
        console.log("Something wrong in front-end");
      });
  };
  <script></script>;

  return (
    <>
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
                    defaultValue=""
                    {...register("setCategoryName", {
                      required: "* Please choose one",
                    })}
                    value={serviceCategoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value="">Please Choose Service Category</option>

                    {/* using loop for display added category to product added form */}
                    {categoryData.map((multipleCategories) => {
                      return (
                        <option value={multipleCategories.serviceCategoryName}>
                          {multipleCategories.serviceCategoryName}
                        </option>
                      );
                    })}
                  </select>
                  {errors.setCategoryName && (
                    <small className="text-danger">
                      {errors.setCategoryName.message}
                    </small>
                  )}
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
                  <label htmlFor="file" className="fw-bold fs-4 pb-2 mt-3">
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
                    type="number"
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
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddService;
