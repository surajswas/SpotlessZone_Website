import axios from "axios";
import React from "react";
import UserSideBar from "./UserSideBar";
import { toast } from "react-toastify";
import bgImg from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";
import { Link } from "react-router-dom";

export const UpdateAddressToast = () => {
  return (
    <>
      <p className="fw-bold text-success">
        You have successfully update the delivery data <br /> Click "Ok" to
        continue...
      </p>
      <Link
        to="/profile-creation"
        className="btn btn-success"
        style={{
          fontWeight: "bold",
          borderRadius: "15px",
          border: "2px solid green",
        }}
      >
        OK
      </Link>
    </>
  );
};

const EditAddress = () => {
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

  const [fullname, setfname] = React.useState("");
  const [address, setaddress] = React.useState("");
  const [region, setregion] = React.useState("");
  const [area, setarea] = React.useState("");
  const [city, setcity] = React.useState("");
  const [phone, setphone] = React.useState("");




  const getProfile = () => {
    axios
      .get("http://localhost:5000/show-own-delivery-address/" + id)
      .then((data) => {
        setfname(data.data.fullname);
        setphone(data.data.phone);
        setcity(data.data.address_detail.city);
        setarea(data.data.address_detail.area);
        setaddress(data.data.address_detail.address);
        setregion(data.data.address_detail.region);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getProfile();
  }, []);

  const updateForm = async (e) => {
    e.preventDefault();
    const fd = {
        fullname: fullname, 
        phone: phone, 
        city: city,
        area: area, 
        region: region, 
        address: address,
    }
    try {
      const update = await axios.put(
        "http://localhost:5000/update-own-delivery-addrss/" + id,
        fd
      );
      if (update) {
        toast.success(<UpdateAddressToast />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: false,
        });
      }
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
            <h4>Edit Delivery Address</h4>
            <div className="card p-5 mt-4">
              <form>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50 me-4">
                      <label htmlFor="fname" className="fw-bold h6">
                        Full Name
                      </label>
                      <input
                        value={fullname}
                        onChange={(e) => setfname(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="w-50 me-4">
                      <label htmlFor="region" className="fw-bold h6">
                        Region
                      </label>
                      <input
                        value={region}
                        onChange={(e) => setregion(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50 me-4">
                      <label htmlFor="phone" className="fw-bold h6">
                        Phone Number
                      </label>
                      <input
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="w-50 me-4">
                      <label htmlFor="city" className="fw-bold h6">
                        City
                      </label>
                      <input
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="w-50 me-4">
                      <label htmlFor="area" className="fw-bold h6">
                        Area
                      </label>
                      <input
                        value={area}
                        onChange={(e) => setarea(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="w-50 me-4">
                      <label htmlFor="address" className="fw-bold h6">
                        Address
                      </label>
                      <input
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
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
                    className="btn btn-info w-25 text-white text-uppercase fw-bold px-5 ms-auto float-end"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
