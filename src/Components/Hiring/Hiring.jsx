import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import bgImage from "../../Images/job-image.jpg";
import bgImg from "../../Images/first.png";
import Header from "../Homepage/Header";
import { Link } from "react-router-dom";

const Hiring = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setPhone] = useState("");
  const [resume, setImage] = useState("");

  const {
    register,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobForm = new FormData();
    jobForm.append("fullName", fullName);
    jobForm.append("email", email);
    jobForm.append("contact", contact);
    jobForm.append("file", resume);

    axios
      .post("http://localhost:5000/job-form/submit", jobForm)
      .then((result) => {
        console.log(result.data);
        setFullName("");
        setEmail("");
        setPhone("");
        setImage("");
      })
      .catch((err) => {
        console.log(err);
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
          height: "40vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Header />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">Job Form</h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt; <span className="text-white">Job Form</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="container-fluid my-5"
        style={{
          backgroundRepeat: "no-repeat",
          background: `url(${bgImage})`,
          //   filter: "blur(.5px)",
          backgroundPosition: "center",
          minHeight: "70vh",
          backgroundSize: "cover",
          //   position: "relative",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="row  justify-content-center">
              <h1 className="text-center py-5" style={{ color: "#1F8977" }}>
                Find A Job &amp; Grow Your Career With Us
              </h1>
              <div className="col-md-6">
                <div
                  className="card mb-3"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <form
                    method="POST"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="align-items-center"
                  >
                    {/* input field for full name */}
                    <div className="form-group px-5 py-4">
                      <label htmlFor="fullName" style={{ fontWeight: "bold" }}>
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.setFullName && "invalid"
                        }`}
                        placeholder="Enter first name"
                        autoComplete="nope"
                        {...register("setFullName", {
                          required: "full name is required",
                          minLength: {
                            value: 3,
                            message: "full name is too short",
                          },
                          maxLength: {
                            value: 30,
                            message: "full name is too long",
                          },
                        })}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      {/* for displaying error message on validating */}
                      {errors.setFullName && (
                        <small className="text-danger">
                          {errors.setFullName.message}
                        </small>
                      )}
                    </div>

                    {/* input field for customer email */}
                    <div className="form-group px-5">
                      <label htmlFor="email" style={{ fontWeight: "bold" }}>
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.setEmail && "invalid"
                        }`}
                        placeholder="Your email address"
                        autoComplete="nope"
                        {...register("setEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <small className="text-muted fst-italic">
                        We'll send you relevant Jobs in your Email
                      </small>
                      {errors.setEmail && (
                        <small className="text-danger">
                          {errors.setEmail.message}
                        </small>
                      )}
                    </div>

                    {/* input field for customer contact number */}
                    <div className="form-group px-5 py-3">
                      <label htmlFor="contact" style={{ fontWeight: "bold" }}>
                        Contact Number<span className="text-danger">*</span>
                      </label>
                      <input
                        type="phone"
                        className={`form-control ${
                          errors.setPhone && "invalid"
                        }`}
                        placeholder="Your phone number"
                        autoComplete="nope"
                        {...register("setPhone", {
                          required: "phone is required",
                          maxLength: {
                            value: 10,
                            message:
                              "Phone number should not exceed more that 10 digits",
                          },
                          minLength: {
                            value: 10,
                            message:
                              "Phone number should not less than 10 digits",
                          },
                          pattern: {
                            value:
                              /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                            message: "Enter digits only",
                          },
                        })}
                        value={contact}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <small className="text-muted fst-italic">
                        Recruiter will call you on this number
                      </small>

                      {errors.setPhone && (
                        <small className="text-danger">
                          {errors.setPhone.message}
                        </small>
                      )}
                    </div>

                    {/* input field for customer profile pic */}
                    <div className="form-group px-5">
                      <label htmlFor="file" style={{ fontWeight: "bold" }}>
                        Resume
                      </label>
                      <input
                        type="file"
                        name="file"
                        placeholder="DOC, DOCx, PDF, RTF | Max: 2 MB"
                        className="form-control"
                        {...register("setImage", {
                          required: "Choose your profile pic",
                        })}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      {errors.setImage && (
                        <small className="text-danger">
                          {errors.setImage.message}
                        </small>
                      )}
                    </div>

                    <p className="text-center fst-italic py-3 text-white">
                      <span>
                        Recruiters give first preference to candidates who have
                        a resume
                      </span>
                    </p>

                    <p className="text-white fst-italic text-center">
                      <small>
                        By Clicking Submit, You Agree To The{" "}
                        <span className="text-success fw-bold">
                          Terms And Conditions{" "}
                          <span className="text-white">&amp; </span>Privacy
                          Policy
                        </span>{" "}
                        Of SpotlessZone.com
                      </small>
                    </p>

                    <button
                      type="submit"
                      className="btn w-75 my-4 rounded-5"
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        backgroundColor: "#3ED0B7",
                        color: "#fff",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Submit Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hiring;
