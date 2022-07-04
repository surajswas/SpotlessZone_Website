import axios from "axios";
import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";
import bgImg from "../../Images/first.png";

const UserDashboard = ({userData}) => {
  // console.log(userData._id)
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
  // const userId = token?.user._id
  const user = token?.user?._id;
  // console.log(userData?.pic)


  const [points, setPoints] = useState(user.points);
  const [rewarded, setRewarded] = useState({ rewarded: false, reward: 0 });
  // get user form the token

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location = "/";
  };

  // Find rewards
  useEffect(() => {
    axios.put(`http://localhost:5000/reward-user/${user}`).then(function (res) {
      console.log(res.data.rewarded);
      setPoints(res.data.points);
      setRewarded({ rewarded: res.data.rewarded, reward: res.data.reward });
    });
  }, [rewarded, userData]);



  

  return (
    <>
      <div className="container" id="message"></div>
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
      <div className="bg-light container-fluid p-0">
        <div className="container col-md-8 py-4 mb-4">
          <p className="text text-center text-secondary fs-3 fw-bold">
            Customer Dashboard
          </p>

          {rewarded.rewarded ? (
            <>
              <div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <strong>Congratulations!</strong> You have earned{" "}
                <span className="fw-bold fs-5 text-secondary mt-1">
                  {rewarded.reward}
                </span>{" "}
                points.
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="d-flex justify-content-between align-items-center border p-3 rounded bg-white mb-3">
            <div className="desc">
              <p className="text text-primary fs-5">{token?.user?.name}</p>
              <small className="d-block text-secondary mb-3">
                Enjoy your free membership for lifetime access in our website.
              </small>
              {/* <div className="d-flex justify-content-start align-items-center">
                <i
                  className="fa fa-check-circle me-2"
                  style={{ cursor: "pointer" }}
                ></i>
                <p className="text text-secondary mb-0">Earn Points</p>
              </div> */}
              <div className="d-flex justify-content-start align-items-center">
                <i
                  className="fa fa-check-circle me-2 text-success"
                  style={{ cursor: "pointer" }}
                ></i>
                <p className="text text-secondary mb-0">Earn Points</p>
              </div>
              <div className="d-flex justify-content-start align-items-center">
                <i
                  className="fa fa-check-circle me-2 text-success"
                  style={{ cursor: "pointer" }}
                ></i>
                <p className="text text-secondary mb-0">
                  Reedem points to get discount
                </p>
              </div>
              <div>
                <p className="text-secondary">
                  Your have earned{" "}
                  <span className="fw-bold fs-5 text-warning mt-1">
                    {points}
                  </span>{" "}
                  points so far.{" "}
                  <span className="fw-bold text-primary">Keep Earning!</span>
                </p>
              </div>
            </div>
            <div className="">
              <div>
                {userData && userData.pic ? (
                  <img
                    src={`http://localhost:5000/${userData.pic}`}
                    alt=""
                    width="100px"
                    height = "100px"
                    // className="img-fluid"

                    style={{ borderRadius: "100%" }}
                  />
                ) : (
                  <img
                    src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-20.jpg"
                    alt=""
                    width="100px"
                    height = "100px"
                    // height={`200`}
                    style={{ borderRadius: "100%" }}
                  />
                )}
              </div>
              <div className="d-flex">
                <a href="/profile-creation" className="text-decoration-none">
                  View Profile
                </a>
                /
                <p
                  className="text-decoration-none text-danger fw-bold text-uppercase "
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded border p-3">
            <p className="text text-start text-secondary fs-5 fw-bold mb-0">
              Your Activity
            </p>
            <hr className="mt-0 mb-3" />
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="p-2 bg-light rounded border">
                  <div className="d-flex justify-content-between align-items-center mx-3">
                    <div className="">
                      <p className="text text-secondary mb-0">
                        You have assigned create model task.
                      </p>
                      <span class="badge bg-danger">On Track</span>
                    </div>
                    <div>
                      <button className="btn btn-primary px-4">
                        View Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="p-2 bg-light rounded border">
                  <div className="d-flex justify-content-between align-items-center mx-3">
                    <div className="">
                      <p className="text text-secondary mb-0">
                        You have assigned create model task.
                      </p>
                      <span class="badge bg-success">Completed</span>
                    </div>
                    <div>
                      <button className="btn btn-primary px-4 disabled">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="p-2 bg-light rounded border">
                  <div className="d-flex justify-content-between align-items-center mx-3">
                    <div className="">
                      <p className="text text-secondary mb-0">
                        You have assigned create model task.
                      </p>
                      <span class="badge bg-success">Completed</span>
                    </div>
                    <div>
                      <button className="btn btn-primary px-4 disabled">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="p-2 bg-light rounded border">
                  <div className="d-flex justify-content-between align-items-center mx-3">
                    <div className="">
                      <p className="text text-secondary mb-0">
                        You have assigned create model task.
                      </p>
                      <span class="badge bg-success">Completed</span>
                    </div>
                    <div>
                      <button className="btn btn-primary px-4 disabled">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* checkout section */}
        {/* <div className="container col-md-8 mb-4"></div> */}
        {/* checkout section */}
        
      </div>
    </>
  );
};

export default UserDashboard;
