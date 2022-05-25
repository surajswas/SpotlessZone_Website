import React from "react";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="text-center text-lg-start bg-light text-muted">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <a href className="me-4 text-reset">
              <i className="fab fa-facebook-f" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-twitter" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-google" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-instagram" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-linkedin" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-github" />
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className="text-white py-3" style={{backgroundColor: "#A0A0A0"}}>
          <div className="container text-center text-md-start mt-5" >
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3" />
                  Spotless Zone
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Our services</h6>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Floor and carpet
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    House Painting
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Office Cleaning
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Job Recruting
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">ContactUs</h6>
                <p>
                  <i className="fas fa-home me-3" /> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  info@example.com
                </p>
                <p>
                  <i className="fas fa-phone me-3" /> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3" /> + 01 234 567 89
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">NewsLetters</h6>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Pricing
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Settings
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Orders
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#!"
                    className="text-reset"
                  >
                    Help
                  </a>
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-4 text-white"
          style={{ backgroundColor: "#707070" }}
        >
          © 2021 Copyright:Spotless Zone
          <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>

<<<<<<< HEAD
=======
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
            Our services
          </h6>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Floor and carpet</a>
          </p>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">House Painting</a>
          </p>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Office Cleaning</a>
          </p>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Job Recruting</a>
          </p>
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4" >
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
            ContactUs
            </h6>
          <p><i className="fas fa-home me-3" /> New York, NY 10012, US</p>
          <p>
            <i className="fas fa-envelope me-3" />
            info@example.com
          </p>
          <p><i className="fas fa-phone me-3" /> + 01 234 567 88</p>
          <p><i className="fas fa-print me-3" /> + 01 234 567 89</p>
      
        </div>
        {/* Grid column */}
        {/* Grid column */}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
          NewsLetters
          </h6>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Pricing</a>
          </p>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Settings</a>
          </p>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Orders</a>
          </p>
          <p>
            <a style={{textDecoration: 'none'}} href="#!" className="text-reset">Help</a>
          </p>

>>>>>>> 64f93db23337f01857a73f25a05bd66981c72792
          
   

<<<<<<< HEAD
export default Footer

=======
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </>
  );
};


export default Footer;
>>>>>>> 64f93db23337f01857a73f25a05bd66981c72792
