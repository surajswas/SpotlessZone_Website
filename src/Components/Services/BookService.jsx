import React, { useState } from "react";
import axios from "axios";
import "./BookService.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { WarnToast } from "../../utils/WarnToast";
// import SeekBar from "react-seekbar-component";
import "react-seekbar-component/dist/index.css";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

// for success toast message
export const SuccessServiceBookedToast = () => {
  return (
    <>
      <p className="fw-bold text-success fst-italic">
        You have Booked the service successfully
      </p>
    </>
  );
};

const BookService = ({ serviceData, userData, sp }) => {
  const [sdata, setSData] = useState("");
  const [address, setAddress] = useState("");

  const [isShown, setIsShown] = useState(false);

  const [area, setArea] = useState(1);

  // const initialValue = 0
  // var totalprice = pdata.reduce(
  //   (previousValue, currentValue) => previousValue + currentValue.productid.pprice,
  //   initialValue
  // );

  // updated price
  const [servicePrice, setSinglePrice] = useState(sp);

  const roomHandle = (e) => {
    e.preventDefault();
    // setArea(Math.max(0, area - 0))
    if (area < 1) {
      return;
    }
  };

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm({ shouldUseNativeValidation: false });

  // for updating total cost
  let totalCost;
  totalCost = serviceData.servicePrice * area;

  const bookService = (data, e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/service/book-service", {
        serviceDetails: serviceData,
        address: address,
        totalServiceCost: totalCost,
        userId: userData._id,
        userName: userData.name,
      })
      // console.log(data[0].userId)
      .then((result) => {
        // console.log(result.data);
        setSData(result.serviceData);
        setAddress("");
        toast.success(<SuccessServiceBookedToast />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch(() => {
        toast.error(<WarnToast />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <div className="card my-5 shadow-lg p-2" style={{backgroundColor: "#25C6AA"}}>
        <h1 className="text-center fw-bold text-white my-3">Book Service</h1>
        <form onSubmit={handleSubmit(bookService)}>
          <div className="form-group">
            <label htmlFor="serviceName" className="text-white my-2 fw-bold">
              Service Name
            </label>
            <input
              type="text"
              placeholder="Service Name"
              className="form-control fw-normal fst-italic my-2"
              style={{ border: "1px solid green" }}
              autoComplete="off"
              value={serviceData.serviceName}
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="serviceCategoryName"
              className="text-white my-2 fw-bold"
            >
              Service Category Name
            </label>
            <input
              type="text"
              placeholder="Service Category Name"
              className="form-control fw-normal fst-italic my-2"
              style={{ border: "1px solid green" }}
              autoComplete="off"
              value={serviceData.serviceCategoryName}
            />
          </div>

          {isShown ? (
            <>
              {/* for tile cleaning only */}
              {serviceData &&
                (serviceData.serviceName === "Tile Cleaning" ||
                  serviceData.serviceName === "Floor and Carpet") && (
                  <>
                    <div className="form-group">
                      <label htmlFor="" className="text-white fw-bold">
                        Total Area to be cleaned in square feet
                      </label>

                      <div className="my-2">
                        {" "}
                        {/* <SeekBar
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Tooltip on top"
                          getNumber={setArea}
                          width="100%"
                          backgroundColor="gray"
                          fillColor="red"
                          fillSecondaryColor="blue"
                          headColor="white"
                          headShadow="white"
                          headShadowSize={6}
                          progress={area}
                          onChange={(e) => setArea(e.target.value)}
                          value={area}
                        /> */}
                        <RangeSlider
                          min={1}
                          max={100}
                          size="lg"
                          tooltip="auto" //use on, off when to display : auto: for display on hover only
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

              {/* for house painting only */}

              {serviceData && serviceData.serviceName === "House Painting" && (
                <>
                  <div className="form-group">
                    <label htmlFor="" className="text-white fw-bold">
                      Number of Rooms
                    </label>
                    <div className="my-2">
                      <input
                        className="w-100 p-1"
                        style={{
                          border: "1px solid green",
                          borderRadius: "5px",
                        }}
                        type="number"
                        placeholder="Enter Number of Rooms"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        onClick={roomHandle}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* for solar panel cleaning only */}

              {serviceData && serviceData.serviceName === "Solar P Cleaning" && (
                <>
                  <div className="form-group">
                    <label htmlFor="" className="text-white fw-bold">
                      Number of Solar Panels
                    </label>
                    <div className="my-2">
                      <input
                        className="w-100 p-1"
                        style={{
                          border: "1px solid green",
                          borderRadius: "5px",
                        }}
                        type="number"
                        placeholder="Enter Number of Rooms"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        onClick={roomHandle}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* for all kinds of service total price */}
              <div className="form-group">
                <label
                  htmlFor="servicePrice"
                  className="fw-bold text-white p-1"
                >
                  Total Service Cost
                </label>
                <input
                  type="text"
                  placeholder="Service Cost"
                  value={servicePrice || totalCost}
                  className="w-100 p-1"
                  style={{ border: "1px solid green", borderRadius: "5px" }}
                  // onMouseLeave={()=> setIsShown(false)}
                />
              </div>
              {/* <button
                onClick={(e) => handleCalculate}
                type="submit"
                className="btn bg-white w-100 mt-3"
                onMouseEnter={styleHandle}
                onMouseLeave={backToNormal}
              >
                Calculate
              </button> */}
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="servicePrice" className="text-white my-2 fw-bold">
                Service Price
              </label>
              <input
                type="number"
                placeholder="Service Price"
                className="form-control fw-normal fst-italic my-2"
                style={{ border: "1px solid green" }}
                autoComplete="off"
                onMouseEnter={() => setIsShown(true)}
                value={servicePrice || serviceData.servicePrice}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="address" className="text-white my-2 fw-bold">
              Address
            </label>
            <textarea
              type="text"
              className={`form-control ${errors.setAddress && "invalid"}`}
              id="exampleFormControlTextarea1"
              rows="2"
              placeholder="Enter Your Address"
              {...register("setAddress", {
                required: "***Address is Required***",
              })}
              style={{ border: "1px solid green", fontStyle: "italic" }}
              value={address}
              onChange={handleChange}
            ></textarea>
            {errors.setAddress && (
              <small className="text-white fw-bold">
                {errors.setAddress.message}
              </small>
            )}
          </div>

          {userData ? (
            <input
              type="submit"
              id="submitBtn"
              className="bookBtn btn w-100 my-2 fw-bold text-uppercase bg-white "
              value="Book Now"
            />
          ) : (
            <input
              type="submit"
              className="disabledBtn btn w-100 my-2 fw-bold text-uppercase bg-white"
              // style={{ cursor: "pointer" }}
              value="Book Now"
              disabled
            />
          )}
        </form>
      </div>
    </>
  );
};

export default BookService;
