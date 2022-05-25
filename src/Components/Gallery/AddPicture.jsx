import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddPicture = () => {
  const [image, setImage] = useState("");

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  const pictureAddHandler = (data, e) => {
    e.preventDefault();
    const serviceData = new FormData();
    serviceData.append("image", image);

    axios
      .post("http://localhost:5000/picture/add", serviceData)
      .then((result) => {
        console.log(result.data);
        setImage("");
        window.location = "/gallery"
      })
      .catch((err) => {
        console.log("Something wrong in front-end");
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center fw-bold my-5">Add Picture For Gallery</h1>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="card p-4 shadow-lg"
              style={{ border: "1px solid grey", borderRadius: "20px" }}
            >
              <form
                method="POST"
                action=""
                onSubmit={handleSubmit(pictureAddHandler)}
                encType="multipart/form-data"
              >
                {/* input field for service image */}
                <div className="form-group">
                  <label htmlFor="file" className="fw-bold fs-4 pb-2 mt-3">
                    Choose Gallery Image
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
export default AddPicture;
