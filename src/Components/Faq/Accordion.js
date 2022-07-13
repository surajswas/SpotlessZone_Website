import React, { useState } from "react";
import "./Accordion.css";
import { MDBContainer } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Header from "../Homepage/Header";
import MyAccordion from "./MyAccordion";
import faq2 from "./images/faq2.jpg";
import bgImg from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";
import { parseJwt } from "../../utils/parseJwt";

const Accordion = () => {
  const questions = [
    {
      id: 1,
      question: "How can i get a quote",
      answer:
        "Simply visit the signup flow to book a cleaning and aas you provide information about your house and schedule, your qupte will dynamically adjust. stands for Document Object Model.",
    },

    {
      id: 2,
      question:
        "Does someone have to visit my house before i can book a cleaning?",
      answer:
        "Absoultely No, we would not want pushy sales people coming to our house so we would never do that to one up.",
    },

    {
      id: 3,
      question: "What if we are not satisfy with the cleaning?",
      answer:
        "Please get in touch with us right away and we will make arrangements to rectify the situation. We have a satisfaction guarantee that we stand by.",
    },
    {
      id: 4,
      question: "How many cleaners do you send?",
      answer:
        "Only one cleaner is sent to your home. If youre on a recurring schedule we do our best to match you with the same person going forward.",
    },
  ];
  const [data, setdata] = useState(questions);

  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?.user?._id;
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
          height: "50vh",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        {user ? <UserHeader /> : <Header />}

        <div className="bread-crumb-section">
          <h1 className="text-center text-white my-4 fw-bold">FAQ</h1>
          <div className="row text-center">
            {user ? (
              <Link
                className="text-success fw-bold text-decoration-none"
                to="/user-dashboard"
              >
                Dashboard &gt;&gt; <span className="text-white">FAQ</span>{" "}
                &gt;&gt; <span className="text-white">Service</span>
              </Link>
            ) : (
              <Link
                className="text-success fw-bold text-decoration-none"
                to="/"
              >
                Home &gt;&gt; <span className="text-white">FAQ</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <MDBContainer>
        <div className="main my-5 p-4">
          <div className="row">
            <div className="heading col-md-4 mt-3">
              <h4>
                Have a <span className="text-white">Question?</span>{" "}
              </h4>
              <h4>Look here</h4>
            </div>

            <div className="faqimg col-md-6">
              <img src={faq2} className="img-fluid"></img>
            </div>
          </div>

          <div className="row">
            <div className="category col-md-4">
              <div className="linkkk">
                <ul className="linkk">
                  <li>
                    <Link to="/faq">Service</Link>
                  </li>
                  <li>
                    <Link to="/productfaq">Product</Link>
                  </li>
                  <li>
                    <Link to="/trainingfaq">Training</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="seconddiv col-md-8">
              <h6>FAQ</h6>
              <h4>
                <section className="main-div">
                  {data.map((curElem) => {
                    const { id } = curElem;
                    return (
                      <MyAccordion key={curElem.id} {...curElem}></MyAccordion>
                    );
                  })}
                </section>
              </h4>
            </div>
          </div>
        </div>
      </MDBContainer>
      <div className="container contactus mb-5">
        <h4>Still have a question?</h4>
        <p>Can't find the answer? please contact us.</p>
        <Link to="/contactus">
          <button> Contact Us</button>
        </Link>
      </div>
    </>
  );
};

export default Accordion;
