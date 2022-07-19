import React, { useState } from "react";
import "./MyTrainingfaq";
import { MDBContainer } from "mdb-react-ui-kit";
import MyTrainingfaq from "./MyTrainingfaq";
import bgImg from "../../Images/first.png";
import UserHeader from "../UserDashboard/UserHeader";
import Header from "../Homepage/Header";
import faq2 from "./images/faq2.jpg";
import { Link } from "react-router-dom";
import { parseJwt } from "../../utils/parseJwt";

const Trainingfaq = () => {
  const questions = [
    {
      id: 1,
      question: "How do you create a react app?",
      answer: "DOM stands for Document Object Model. The DOM represents",
    },

    {
      id: 2,
      question: "What is the virtual DOM?",
      answer: "Install the create-reac app packae=ge using th ecommand",
    },

    {
      id: 3,
      question: "What is an event in React?",
      answer: "An event is an action that a user or system may trigger",
    },
    {
      id: 4,
      question: "What is an event in React?",
      answer: "An event is an action that a user or system may trigger",
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
                &gt;&gt; <span className="text-white">Training</span>
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
              <img src={faq2}></img>
            </div>
          </div>

          {/* 
                        <div className="faqimg col-md-6">
                            <img src={faq2} alt="" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="category col-md-4">
                            <div className="linkkk">

                                <ul className="linkk">
                                    <li><Link to='/faq'>Service</Link></li>
                                    <li><Link to='/productfaq'>Product</Link></li>
                                    <li><Link to='/trainingfaq'>Training</Link></li>




                                </ul>
                            </div>



                        </div> */}

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
                      <MyTrainingfaq
                        key={curElem.id}
                        {...curElem}
                      ></MyTrainingfaq>
                    );
                  })}
                </section>
              </h4>
            </div>
          </div>
        </div>
      </MDBContainer>
      <div className="contactus">
        <h4>Still have a question?</h4>
        <p>Can't find the answer? please contact us.</p>
      <Link to="/contactus">
        <button> Contact Us</button>
      </Link>
      </div>

    </>
  );
};

export default Trainingfaq;
