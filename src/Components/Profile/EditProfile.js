import axios from "axios";
import React from "react";
import UserSideBar from "./UserSideBar";
import { toast } from "react-toastify";
import bgImg from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";

export const UpdateProfileToast = () => {
  return (
    <>
      <p className="fw-bold text-success">
        You have successfully update the profile data
      </p>
    </>
  );
};

export const UpdateProfileImage = () => {
  return (
    <>
      <p className="text-dark">
        You have successfully updated your profile image
      </p>
    </>
  );
};

const EditProfile = () => {
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const id = token?.user._id;
  
  const [name, setname] = React.useState("");
  const [email, setmail] = React.useState("");
  const [bio, setbio] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [image, setPic] = React.useState("");
  const getProfile = () => {
    axios
      .get("http://localhost:5000/getprofile/" + id)
      .then((data) => {
        setname(data.data.name);
        setmail(data.data.email);
        setphone(data.data.phone);
        setPic(data.data.pic);
        setbio(data.data.bio);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getProfile();
  }, []);

  const update = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("bio", bio);
    fd.append("image", image);
    try {
      const update = await axios.put(
        "http://localhost:5000/profileupdate/" + id,
        fd
      );
      localStorage.setItem("token", update.data.token);
      if (update) {
        toast.success(<UpdateProfileImage />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // full info update
  const updateForm = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    fd.append("name", name);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("bio", bio);
    fd.append("image", image);
    try {
      const update = await axios.put(
        "http://localhost:5000/profileupdate/" + id,
        fd
      );
      // .then(() => {
      //   toast.success(<UpdateProfileToast />, {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 2000,
      //   });
      //   setPic("");
      // });
      localStorage.setItem("token", update.data.token);
      if (update) {
        toast.success(<UpdateProfileToast />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        window.location.href = "/edit-profile";
      }
      console.log(update.data);
    } catch (error) {
      console.log(error);
    }
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

      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#d9d9d9" }}
      >
        <div className="row">
          <UserSideBar />
          <div className="col-md-9">
            <h4>Edit Profile</h4>
            <div className="card p-5 mt-4">
              <form method="post">
                <div className="ps-5 py-1 mt-4">
                  <div className="position-relative mt-4">
                    <div className="d-flex justify-content-start align-items-center">
                      <div className="me-5">
                        {image ? (
                          <img
                            src={`http://localhost:5000/${image}`}
                            alt=""
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        ) : (
                          <img
                            src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-20.jpg"
                            alt=""
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <div
                          className="position-absolute"
                          style={{ bottom: "0px", left: "8%" }}
                        >
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            type="button"
                            className="btn btn-link text-decoration-none"
                          >
                            <i className="fa fa-pencil fs-6 text-white bg-danger rounded-circle p-2"></i>
                          </button>
                        </div>
                      </div>

                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Profile Pic Update
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <img
                                className="d-flex p-3 mx-auto"
                                width="200px"
                                src={`http://localhost:5000/${image}`}
                                alt=""
                              />
                              <form>
                                <input
                                  name="image"
                                  onChange={(e) => setPic(e.target.files[0])}
                                  type="file"
                                  className="form-control"
                                ></input>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                onClick={update}
                                type="submit"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="tex text-dark h3 mb-1">{name}</p>
                        <p className="text text-secondary">{email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <form>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="w-50 me-4">
                        <label htmlFor="firstnae" className="fw-bold h6">
                          Username
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setname(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="w-50 me-4">
                        <label htmlFor="emailaddress" className="fw-bold h6">
                          Email Address
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setmail(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="w-50 ms-4">
                        <label htmlFor="phonenumber" className="fw-bold h6">
                          Phone Number
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setphone(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="w-75 me-4">
                        <label htmlFor="bio" className="fw-bold h6">
                          Bio
                        </label>
                        <input
                        value={bio}
                          onChange={(e) => setbio(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <button
                      onClick={updateForm}
                      type="submit"
                      className="btn btn-info w-50 text-white text-uppercase fw-bold px-5"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default EditProfile;
