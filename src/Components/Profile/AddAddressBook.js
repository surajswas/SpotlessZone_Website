import axios from "axios";
import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import First from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";
import UserSideBar from "./UserSideBar";
import { parseJwt } from "../../utils/parseJwt";


const SuccessMsg = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center bg-gradient">
            <p className="text-dark">
              You have successfully added address for delivery !!! Click "OK" to
              continue..
            </p>
            <Link
              to="/address-book"
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
const AddAddressBook = () => {



  

  // get user form the token
  const token_data = localStorage.getItem("token")
  const token = parseJwt(token_data)
  const user = token?.user?._id
  

  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");


  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  const addressAddHandler = (data, e) => {
    e.preventDefault();

    const addressData = {
      fullname: fullname,
      phone: phone,
      address_detail: {
        address: address,
        region: state,
        city: city,
        area: area,
      },
      userId: user
    };

    axios
      .post("http://localhost:5000/delivery-address", addressData)
      .then((result) => {
        console.log(result.data);
        setFullName("");
        setPhone("");
        setAddress("");
        setState("");
        setCity("");
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
      <div
        className="container-fluid homeImg py-3"
        style={{
          paddingTop: 70,
          backgroundColor: "#ebebeb",
          background: `url(${First})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <UserHeader />

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">
            Delivery Address
          </h1>
          <div className="row text-center">
            <Link
              className="text-success fw-bold text-decoration-none"
              to="/user-dashboard"
            >
              Dashboard &gt;&gt;{" "}
              <span className="text-white ">Delivery Address</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-light py-4">
        <div className="container col-md-11">
          <div className="row my-3">
            <UserSideBar />
            <div className="col-md-9 ">
              <div className="card p-4 shadow-lg">
                <div className="px-4 bg-white py-3">
                  <form
                    method="POST"
                    action=""
                    onSubmit={handleSubmit(addressAddHandler)}
                  >
                    <div className="bg-white">
                      <p className="text text-start text-dark text-uppercase fw-bold">
                        Delivery Information
                      </p>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-group p-1">
                            <label
                              htmlFor="fullName"
                              className="fw-bold mb-2"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              className={`form-control ${
                                errors.setFullName && "invalid"
                              }`}
                              placeholder="Enter Full Name"
                              autoComplete="nope"
                              // firstname : validation
                              {...register("setFullName", {
                                required: "full name is required",
                                minLength: {
                                  value: 3,
                                  message: "full name is too short",
                                },
                                maxLength: {
                                  value: 20,
                                  message: "full name is too long",
                                },
                              })}
                              style={{
                                border: "1px solid green",
                              }}
                              // changing data on typing and set data to service name variable and send to database
                              value={fullname}
                              onChange={(e) => setFullName(e.target.value)}
                              id="fullName"
                            />
                            {/* for displaying error message on validating */}
                            {errors.setFullName && (
                              <small className="text-danger">
                                {errors.setFullName.message}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="p-1">
                            <label htmlFor="state" className="fw-bold mb-2">
                              Region
                            </label>
                            <div className="input-group">
                              <select
                                style={{
                                  border: "1px solid green",
                                  borderRadius: "5px",
                                  width: "100%",
                                  padding: "5px",
                                }}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="p-2"
                              >
                                <option value="">Please Choose Region</option>
                                {/* using loop for display added category to product added form */}
                                <option value="Bagmati Province">Bagmati Province</option>
                                <option value="Gandaki Province">Gandaki Province</option>
                                <option value="Karnali Province">Karnali Province</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-group p-1">
                            <label
                              htmlFor="phone"
                              className="fw-bold mb-2"
                            >
                              Phone Number
                            </label>
                            <input
                              //type="number"
                              type="phone"
                              className={`form-control ${
                                errors.setPhone && "invalid"
                              }`}
                              placeholder="Enter Phone Number"
                              {...register("setPhone", {
                                required: "phone number is required",
                                pattern: {
                                  value: /^[0-9\b]+$/,
                                  message: "Enter digits only",
                                },
                              })}
                              style={{ border: "1px solid green" }}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              id="phone"
                            />
                            {errors.setPhone && (
                              <small className="text-danger">
                                {errors.setPhone.message}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="p-1">
                            <label htmlFor="city" className="fw-bold mb-2">
                              City
                            </label>
                            <div className="input-group">
                            <select
                                style={{
                                  border: "1px solid green",
                                  borderRadius: "5px",
                                  width: "100%",
                                  padding: "5px",
                                }}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="p-2"
                              >
                                 <option value="">Please Choose City</option>
                                {/* using loop for display added category to product added form */}
                                <option value="Kathmandu">Kathmandu</option>
                                <option value="Bhaktapur">Bhaktapur</option>
                                <option value="Lalitpur">Lalitpur</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="p-1">
                            <label htmlFor="area" className="fw-bold mb-2">
                              Area
                            </label>
                            <div className="input-group">
                            <select
                                style={{
                                  border: "1px solid green",
                                  borderRadius: "5px",
                                  width: "100%",
                                  padding: "5px",
                                }}
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="p-2"
                              >
                                <option value="">Please Choose Area</option>
                                {/* using loop for display added category to product added form */}
                                <option value="Chabahil Chowk">Chabahil Chowk</option>
                                <option value="Chuchepati">Chuchepati</option>
                                <option value="Gopi Krishna Hall">Gopi Krishna Hall</option>
                                <option value="Kalopul">Kalopul</option>
                                <option value="Mitrapark">Mitrapark</option>


                              </select>
                            </div>
                            
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group p-1">
                            <label htmlFor="address" className="fw-bold mb-2">
                              Address
                            </label>
                            <div className="input-group">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.setFullName && "invalid"
                              }`}
                              placeholder="Enter address"
                              autoComplete="nope"
                              // firstname : validation
                              {...register("setAddress", {
                                required: "address is required",
                                minLength: {
                                  value: 3,
                                  message: "address is too short",
                                },
                                maxLength: {
                                  value: 20,
                                  message: "address is too long",
                                },
                              })}
                              style={{
                                border: "1px solid green",
                              }}
                              // changing data on typing and set data to service name variable and send to database
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              id="address"
                            />
                            {errors.setAddress && (
                              <small className="text-danger">
                                {errors.setAddress.message}
                              </small>
                            )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-5 justify-content-end">
                    <button className="btn btn-secondary w-25 text-uppercase">Cancel</button>
                    <button type="submit" className="btn  w-25 text-uppercase" style={{backgroundColor: "#FFA500", color: "#ffffff"}} >Save</button>
                    </div>
                    
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

export default AddAddressBook;
