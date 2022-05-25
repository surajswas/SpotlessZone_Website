import React from "react";
const ResidentialServiceItem = ({ rData }) => {
  return (
    <>
      <div
        className="card bg-light"
        style={{ borderTopLeftRadius: "5rem", borderTopRightRadius: "1.5rem" }}
      >
        <h6
          className="text-center fw-bold pt-4"
          style={{ fontSize: "1.5rem", paddingLeft: "70px" }}
        >
          {rData.serviceName}
        </h6>
        <img
          src={`http://localhost:5000/${rData.image}`}
          alt="image"
          className="img-fluid rounded-circle me-5"
          style={{
            width: "150px",
            height: "150px",
            position: "relative",
            right: "40px",
            bottom: "40px",
          }}
        />
        <p className="ps-3">{rData.serviceDesc}</p>
        <a
          href="/all-services"
          className="ms-auto p-3 text-info text-decoration-none fw-bold fst-italic"
        >
          <small>Read More &gt;&gt;</small>
        </a>
      </div>
    </>
  );
};

export default ResidentialServiceItem;
