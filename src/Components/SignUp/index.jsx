import styles from "./styles.module.css";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Homepage/Header";
import bgImg from "../../Images/first.png"

const SignUp = () => {
  //using useState hook
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("something went wrong");
    try {
      const url = "http://localhost:5000/customer/register";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      //   navigate("/login");
      //   console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
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
          height: "40vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Header />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">Register Page</h1>
          <div className="row text-center">
            <Link className="text-success fw-bold text-decoration-none" to="/">
              Home &gt;&gt; <span className="text-white">Register</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back !</h1>
            <span
              style={{
                textAlign: "center",
                color: "#fff",
                marginBottom: "2rem",
              }}
            >
              To Keep Connected With Us <br />
              Please Login With Your Personal Info
            </span>

            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                SIGN IN
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <h1>Create Account</h1>

            {/* for social icons registration */}
            <div className={styles.flex}>
              <div className={styles.socialIcons}>
                <div className={styles.facebook}>
                  <a href="https://www.facebook.com/">
                    <i
                      className="bi bi-facebook"
                      style={{ color: "#106DB0" }}
                    ></i>
                  </a>
                </div>
                <div className={styles.googlePlus}>
                  <a
                    href="https://www.gmail.com/"
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ color: "#D20B0B", fontWeight: "bold" }}>
                      <i
                        className="bi bi-google"
                        style={{ color: "#D20B0B" }}
                      ></i>
                      +
                    </span>
                  </a>
                </div>
                <div className={styles.twitter}>
                  <a href="https://twitter.com/">
                    <i
                      className="bi bi-twitter"
                      style={{ color: "#98DFFD" }}
                    ></i>
                  </a>
                </div>
              </div>
            </div>

            {/* text */}
            <div className={styles.text}>
              <span>Or Use Your Gmail For Registration</span>
            </div>

            <form
              action=""
              className={styles.form_container}
              onSubmit={handleSubmit}
            >
              {/* name input */}
              <div className={styles.inputIcons}>
                <i className="bi bi-person-fill icon"></i>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              {/* gmail input */}
              <div className={styles.inputIcons}>
                <i class="bi bi-envelope-fill"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              {/* pass input */}
              <div className={styles.inputIcons}>
                <i class="bi bi-lock-fill"></i>
                <input
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              {/* phone input */}
              <div className={styles.inputIcons}>
                <i class="bi bi-telephone-fill"></i>
                <input
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              {error && <div className={styles.error_msg}>{error}</div>}
              {msg && <div className={styles.success_msg}>{msg}</div>}

              <button
                type="submit"
                className={styles.green_btn}
                disabled={
                  data.name === "" &&
                  data.email === "" &&
                  data.password === "" &&
                  data.phone === ""
                }
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

