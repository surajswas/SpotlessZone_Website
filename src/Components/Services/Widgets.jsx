import React from "react";

const Widgets = () => {
  return (
    <>
      <div
        className="container mb-5 bg-info p-4"
        style={{ borderRadius: "20px" }}
      >
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="card">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="icons">
                    <i class="bi bi-people-fill fa-3x"></i>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">
                    250+ <br />{" "}
                    <span className="fst-italic fw-normal">
                      Satisfied <br /> Clients
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="icons">
                    <i class="bi bi-people-fill fa-3x"></i>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">
                    39+ <br />{" "}
                    <span className="fst-italic fw-normal">
                      Winning <br /> Awards
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="icons">
                    <i class="bi bi-award-fill fa-3x"></i>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="fw-bold">
                    10+ <br />{" "}
                    <span className="fst-italic fw-normal">
                      Winning <br /> Awards
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="icons">
                    <i class="bi bi-people-fill fa-3x"></i>
                  </div>
                </div>
                <div className="col-md-6 mt-1">
                  <p className="fw-bold">
                    25+ <br />{" "}
                    <span className="fst-italic fw-normal">
                      Expert <br /> Teams
                    </span>{" "}
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

export default Widgets;
