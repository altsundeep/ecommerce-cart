import React, { useContext, useEffect, useState } from "react";
import { ImMinus, ImPlus } from "react-icons/im";
import { GlobalContext } from "../Store/store";

const Cart = () => {
  const context = useContext(GlobalContext);
  const { state, dispatch } = context;
  const [price, setPrice] = useState();

  // updating total cart price
  useEffect(() => {
    const mprice = state.reduce(
      (sum, val) => sum + val.price * val.quantity,
      0
    );

    setPrice(mprice);
  }, [price, state]);

  // remove items from cart
  const removeFromKart = (id) => {
    const remove = state.filter((product) => product.id !== id);
    dispatch({ type: "REMOVE", payload: remove });
  };

  // Increase Item Quantity
  const increasePruductQuantity = (id) => {
    // eslint-disable-next-line no-return-assign
    const item = state.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: (product.quantity += 1),
          }
        : product
    );
    dispatch({ type: "INC", payload: item });
  };

  // Decrease item quantity
  const decreasePruductQuantity = (id, quantity) => {
    const item = state.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: (product.quantity -= 1),
          }
        : product
    );

    dispatch({ type: "DEC", payload: item });
    // Remove the item when its quantity becomes 0
    if (quantity <= 1) {
      const remove = state.filter((product) => product.id !== id);
      dispatch({ type: "REMOVE", payload: remove });
    }
  };

  return (
    <div className="container flex-column">
      <hr />
      {state.length
        ? state.map((product) => {
            return (
              <div
                key={product.id}
                className="container d-flex my-3 align-items-center cart"
              >
                <img className="" src={product.image} alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title text-truncate">{product.title}</h5>
                  <p className="font-weight-bold card-text">
                    <span className="">Price : </span>${product.price}
                  </p>
                  <span className="font-weight-italic">{product.category}</span>
                  <p></p>
                  <div className="p-2">
                    <button
                      onClick={() =>
                        increasePruductQuantity(product.id, product.quantity)
                      }
                      className="btn btn-outline-primary btn-sm "
                    >
                      <ImPlus />
                    </button>
                    <span className="font-weight-bold p-2">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() =>
                        decreasePruductQuantity(product.id, product.quantity)
                      }
                      className="btn btn-outline-primary  btn-sm"
                    >
                      <ImMinus />
                    </button>
                  </div>

                  <button
                    className="btn btn-danger m-4"
                    onClick={() => removeFromKart(product.id)}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            );
          })
        : "No Items in Cart"}
      <hr />

      {state.length ? (
        <div className="container">
          <div className="container col-mb p-2 price d-flex">
            <span className="font-weight-bold">Total price</span>{" "}
            <span> {!price ? "" : "$" + price.toFixed(2)}</span>
          </div>
          <hr />
          <br />
          <br />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
