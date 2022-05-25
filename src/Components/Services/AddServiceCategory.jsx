import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddServiceCategory = () => {
  const [serviceCategoryName, setCategoryName] = useState("");
  const [serviceCategoryDesc, setCategoryDesc] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  const submitAddHandler = (data, e) => {
    e.preventDefault();

    const serviceCategoryData = {
      serviceCategoryName: serviceCategoryName,
      serviceCategoryDesc: serviceCategoryDesc,
    };

    axios
      .post("http://localhost:5000/service-category/add", serviceCategoryData)
      .then((result) => {
        console.log(result.data);
      })
      .catch((e) => {
        console.log("something is wrong");
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1>Add Category For Services</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    {/* customer form */}

                    <form
                      method="POST"
                      action=""
                      onSubmit={handleSubmit(submitAddHandler)}
                      encType="multipart/form-data"
                    >
                      {/* input field for category name */}
                      <div className="form-group">
                        <label htmlFor="serviceCategoryName">
                          Category Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errors.setCategoryName && "invalid"
                          }`}
                          placeholder="Enter category name"
                          autoComplete="nope"
                          // firstname : validation
                          {...register("setCategoryName", {
                            required: "category name is required",
                            maxLength: {
                              value: 20,
                              message: "category name is too long",
                            }, // JS only: <p>error message</p> TS only support string
                          })}
                          // changing data on typing and set data to firstname variable and send to database
                          value={serviceCategoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                        {/* for displaying error message on validating */}
                        {errors.setCategoryName && (
                          <small className="text-danger">
                            {errors.setCategoryName.message}
                          </small>
                        )}
                      </div>

                      {/* input field for category image
                      <div className="form-group">
                        <label htmlFor="file">Choose Category Image</label>
                        <input
                          type="file"
                          name="image"
                          className="form-control"
                          {...register("setImage", {
                            required: "Choose category image",
                          })}
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        {errors.setImage && (
                          <small className="text-danger">
                            {errors.setImage.message}
                          </small>
                        )}
                      </div> */}

                      {/* input field for category desc */}
                      <div className="form-group">
                        <label htmlFor="serviceCategoryDesc">Description</label>
                        <textarea
                          type="text"
                          className={`form-control ${
                            errors.setCategoryDesc && "invalid"
                          }`}
                          id="exampleFormControlTextarea1"
                          rows="2"
                          placeholder="write something for it"
                          {...register("setCategoryDesc", {
                            required: "description is required",
                          })}
                          value={serviceCategoryDesc}
                          onChange={(e) => setCategoryDesc(e.target.value)}
                        ></textarea>
                        {errors.setCategoryDesc && (
                          <small className="text-danger">
                            {errors.setCategoryDesc.message}
                          </small>
                        )}
                      </div>

                      <button type="submit" className="btn btn-info">
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
export default AddServiceCategory;
