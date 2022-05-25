import React from "react";
import Second from "../../Images/second.png";
const ChooseUs = () => {
  return (
    <>
      <div className="container-fluid my-5 py-5">
        <div className="container col-md-10">
          <div className="text-center">
            <p className="text text-dark h1 fs-1">Why choose Us</p>
            <hr className="container col-md-2 text-success " />
          </div>
          <div className="text-center">
            <p className="text-muted fs-4">
              SpotlessZone operates in Kathmandu and provides a variety of
              cleaning services. Choose us because of our reputation for
              excellence.
            </p>
          </div>
          <div className="text-justify">
            <div className="d-flex justify-content-center py-5">
              <div className="">
                <div className="mb-4">
                  <i
                    className="fa fa-diamond fs-1 d-flex justify-content-end "
                    style={{ color: "#3ED0B7" }}
                  ></i>
                  <p className="h1 fs-3 mb-4 d-flex justify-content-end ">
                    SPARKLING CLEAN
                  </p>
                  <p className="text-end">
                    We keep your home sparkling clean and germ free. Our
                    disinfecting process kills 99% of common bacteria and
                    viruses.
                  </p>
                </div>
                <div className="mb-4">
                  <i
                    className="fa fa-umbrella fs-1 d-flex justify-content-end "
                    style={{ color: "#3ED0B7" }}
                  ></i>
                  <p className="h1 fs-3 mb-4 d-flex justify-content-end ">
                    INSURED AND BONDED
                  </p>
                  <p className="text-end">
                    Our cleaners are insured and bonded so no need to worry
                    about your apartment, office or garden.
                  </p>
                </div>
              </div>
              <div className="mx-5">
                <div
                  className="bg-white border border-4 border-secondary"
                  style={{
                    width: "375px",
                    height: "375px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={Second}
                    alt=""
                    className="m-2"
                    style={{
                      width: "350px",
                      height: "350px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <i
                    className="fa fa-home fs-1 d-flex justify-content-start "
                    style={{ color: "#3ED0B7" }}
                  ></i>
                  <p className="h1 fs-3 mb-4 d-flex justify-content-start ">
                    LEADING TECHNOLOGIES
                  </p>
                  <p className="text-start">
                    We use safe hospital-grade disinfectants, HEPA filtrations
                    and microfiber cleaning cloths to reduce cross
                    contamination.
                  </p>
                </div>
                <div className="mb-4">
                  <i
                    className="fa fa-user-secret fs-1 d-flex justify-content-start "
                    style={{ color: "#3ED0B7" }}
                  ></i>
                  <p className="h1 fs-3 mb-4 d-flex justify-content-start ">
                    RELIABLE CREWS
                  </p>
                  <p className="text-start">
                    Our reliable and stable crews understand your specific house
                    and office clearning service needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseUs;
