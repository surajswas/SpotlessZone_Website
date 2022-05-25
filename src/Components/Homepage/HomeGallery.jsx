import React from "react";
import fImg from "../../Images/first.png";
import sImg from "../../Images/home-cleaning.jpg";



const HomeGallery = () => {
  return (
    <>
      <div className="container text-center mb-5">
        <h1 className="text-success">Our Gallery</h1>
        <h3>Some good moments captured while working</h3>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={fImg}
              alt=""
              className="img-fluid shadow-lg"
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 ">
                <img
                  src={sImg}
                  alt=""
                  className="img-fluid m-2 shadow-lg"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="col-md-6">
                <img
                  src={fImg}
                  alt=""
                  className="img-fluid m-2 shadow-lg"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="col-md-6">
                <img
                  src={fImg}
                  alt=""
                  className="img-fluid m-2 shadow-lg"
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div className="col-md-6">
                <img
                  src={sImg}
                  alt=""
                  className="img-fluid m-2 shadow-lg"
                  style={{ borderRadius: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeGallery;
