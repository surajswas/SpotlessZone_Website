import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [the, setProductview] = useState([]);

  //render as soonn as user  hit the page like don't need to click
  useEffect(() => {
    axios
      .get("http://localhost:5000/get/product")
      .then((pum) => {
        // console.log(pum.data)
        setProductview(pum.data);
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <Link to="/addProduct" className="btn btn-primary">
            ADD PRODUCT
          </Link>
          {the.map((prod) => {
            return (
              <div className="col-md-3">
                <img
                  src={`http://localhost:5000/${prod.pic}`}
                  alt=""
                  style={{
                    objectFit: "contain",
                    height: "10ch",
                    width: "10ch",
                  }}
                />
                <h3>{prod.pnname}</h3>
                <p>Price : {prod.pprice}</p>
                <p>Quantity : {prod.pquantity}</p>
                <div className="pdesc">{prod.pdesc}</div>

                <>
                  <Link
                    className="btn btn-sm  btn-primary"
                    to={"/update-product/" + prod._id}
                  >
                    Update
                  </Link>
                </>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;
