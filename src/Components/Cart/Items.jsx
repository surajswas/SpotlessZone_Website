import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SuccessMsg = () => {
  return (
    <>
      <p className="fw-bold text-success fst-italic">
        You have deleted product from cart successfully!
      </p>
    </>
  );
};

const Items = ({ cartId, productId, productQuantity }) => {
  // console.log("pid: "+productId._id)
  // console.log(productQuantity)

  const [changeQty, setChangeQty] = useState(productQuantity);

  //   using redux
  // const initialState = {
  //   productQuantity: productQuantity,
  // };

  // reducer
  // const reducer = (action, state) => {
  //   switch (action.type) {
  //     case "INCREMENT":
  //       return {
  //         ...state,
  //         productQuantity: state.productQuantity + 1,
  //       };
  //     case "DECREMENT":
  //       return {
  //         ...state,
  //         productQuantity: state.productQuantity - 1,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  // const [state, dispatch] = useReducer(reducer, initialState);
  //   console.log(productId);

  const deleteproductCart = (e, pid) => {
    e.preventDefault();
    axios
      .delete("http://localhost:5000/delete-product-cart/" + pid)
      .then(() => {
        toast.success(<SuccessMsg />, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
        });
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const updateQty = (pid) => {
    const qtyData = {
      productQuantity: productQuantity + 1,
    };
    // console.log("qty data is"+qtyData)
    axios
      .put(`http://localhost:5000/update-product-qty/` + pid, qtyData)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for increase qty
  const increaseQuantity = (e, pid) => {
    e.preventDefault();
    // console.log("product id is" + pid);

    if (changeQty < 10) {
      setChangeQty((prevCount) => prevCount + 1);
    }
    updateQty(pid);
  };

  const decreaseQuantity = (e, pid) => {
    e.preventDefault();
    if (productQuantity > 1) {
      setChangeQty((prevCount) => prevCount - 1);
    }
    updateDecreaseQty(pid);
  };

  const updateDecreaseQty = (pid) => {
    const qtyData = {
      productQuantity: changeQty - 1,
    };
    // console.log("qty data is"+qtyData)
    axios
      .put(`http://localhost:5000/update-product-qty/` + pid, qtyData)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <tr>
        <td>
          <img
            src={"http://localhost:5000/" + productId?.pic}
            alt=""
            className="img-fluid"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "5px",
            }}
          />
        </td>
        <td>{productId?.pname}</td>
        <td className="d-flex">
          <span
            // onClick={() => dispatch({ type: "DECREMENT" })}
            onClick={(e) => decreaseQuantity(e, productId?._id)}
            style={{
              display: "inline-block",
              textAlign: "center",
              verticalAlign: "middle",
              border: "1px solid grey",
              backgroundColor: "lightgrey",
              padding: "0px 4px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              cursor: "pointer",
            }}
          >
            <i className=" bi bi-dash"></i>
          </span>
          <input
            type="phone"
            value={changeQty || productQuantity}
            style={{
              maxWidth: "50px",
              textAlign: "center",
              display: "inline-block",
              fontWeight: "bold",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "1px solid grey",
              borderBottom: "1px solid grey",
            }}
          />
          <span
            onClick={(e) => increaseQuantity(e, productId?._id)}
            // onClick={() => dispatch({ type: "INCREMENT" })}
            style={{
              display: "inline-block",
              textAlign: "center",
              verticalAlign: "middle",
              border: "1px solid grey",
              backgroundColor: "lightgrey",
              padding: "0px 4px",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              cursor: "pointer",
            }}
          >
            <i className="bi bi-plus"></i>
          </span>
        </td>
        <td>
          <span
            style={{
              fontWeight: "600",
              marginLeft: "50px",
            }}
          >
            {productId?.pprice}
          </span>
        </td>
        <td>
          <span
            style={{
              fontWeight: "600",
              marginLeft: "30px",
            }}
          >
            {(changeQty || productQuantity) * productId?.pprice}
          </span>
        </td>

        <td>
          <i
            className="bi bi-trash-fill"
            onClick={(e) => deleteproductCart(e, cartId)}
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: "1.2rem",
            }}
          ></i>
        </td>
      </tr>
    </>
  );
};

export default Items;
