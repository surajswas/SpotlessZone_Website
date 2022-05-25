import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateCategoryService = () => {
  const { scid } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [serviceCategoryName, setServiceCategoryName] = useState("");
  const [serviceCategoryDesc, setServiceCategoryDesc] = useState("");

  const {
    register,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = () => {
    axios
      .get(
        `http://localhost:5000/service-category/get-single-service-category/${scid}`
      )
      .then((result) => {
        setCategoryData(result.data);
        setServiceCategoryName(result.data.serviceCategoryName);
        setServiceCategoryDesc(result.data.serviceCategoryDesc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const categoryServiceData = {
    scid: scid,
    serviceCategoryName: serviceCategoryName,
    serviceCategoryDesc: serviceCategoryDesc,
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        "http://localhost:5000/service-category/update",
        categoryServiceData,
        scid
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1>Update Service Category</h1>
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
                    <form
                      method="POST"
                      onSubmit={submitUpdateHandler}
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
                            errors.setServiceCategoryName && "invalid"
                          }`}
                          placeholder="Enter category name"
                          autoComplete="nope"
                          // firstname : validation
                          {...register("setServiceCategoryName", {
                            required: "category name is required",
                            maxLength: {
                              value: 20,
                              message: "category name is too long",
                            }, // JS only: <p>error message</p> TS only support string
                          })}
                          // changing data on typing and set data to firstname variable and send to database
                          value={serviceCategoryName}
                          onChange={(e) =>
                            setServiceCategoryName(e.target.value)
                          }
                        />
                        {/* for displaying error message on validating */}
                        {errors.setCategoryName && (
                          <small className="text-danger">
                            {errors.setServiceCategoryName.message}
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
                            errors.setServiceCategoryDesc && "invalid"
                          }`}
                          id="exampleFormControlTextarea1"
                          rows="2"
                          placeholder="write something for it"
                          {...register("setServiceCategoryDesc", {
                            required: "description is required",
                          })}
                          value={serviceCategoryDesc}
                          onChange={(e) =>
                            setServiceCategoryDesc(e.target.value)
                          }
                        ></textarea>
                        {errors.setServiceCategoryDesc && (
                          <small className="text-danger">
                            {errors.setServiceCategoryDesc.message}
                          </small>
                        )}
                      </div>

                      <button type="submit" className="btn btn-info">
                        Update Service
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

export default UpdateCategoryService;
