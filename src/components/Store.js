import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Store/store";
import PropagateLoader from "react-spinners/PropagateLoader";
import Modal from "react-bootstrap/Modal";
import { FaCheck } from "react-icons/fa";

const Store = () => {
  const [showProducts, setShowProducts] = useState([]);
  const { state, dispatch } = useContext(GlobalContext);
  const [addedToCart, setAddedToCart] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color] = useState("#007bff");
  const [smShow, setSmShow] = useState(true);

  const url = "https://fakestoreapi.com/products";
  // fetching products
  useEffect(() => {
    const fetchdata = async () => {
      const responce = await fetch(url);
      const products = await responce.json();
      setLoading(false);
      setShowProducts(products);
    };
    return fetchdata();
  }, [state]);

  // update products

  // adding products to cart
  const addToCart = (id) => {
    const itemInCart = state.find((product) => product.id === id);
    if (itemInCart) {
      state.map(
        (product) => ({
          ...product,
          quantity: (product.quantity += 1),
        }),

        setAddedToCart(true),
        setSmShow(true),
        setTimeout(() => {
          setSmShow(false);
        }, 1000)
      );
    } else {
      const updatedProducts = showProducts
        .map((product) => ({ ...product, quantity: 1 }))
        .find((product) => product.id === id);
      dispatch({ type: "ADD_TO_CART", payload: updatedProducts });
      setAddedToCart(true);
      setSmShow(true);
      setTimeout(() => {
        setSmShow(false);
      }, 1000);
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <PropagateLoader color={color} loading={loading} size={15} />
      </div>
      {addedToCart ? (
        <Modal
          size="lg"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title
              className="d-flex m-auto"
              id="example-modal-sizes-title-lg"
            >
              <FaCheck />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-primary font-weight-italic d-flex m-auto">
            <h5>Item Added to Cart!</h5>
          </Modal.Body>
        </Modal>
      ) : (
        ""
      )}

      <div className="container d-flex flex-wrap">
        {showProducts.map((product) => {
          return (
            <div key={product.id} className="product card">
              <img className="" src={product.image} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title text-truncate">{product.title}</h5>
                <p className="card-text">{product.price}</p>
                <p className="card-text text-truncate">{product.description}</p>
                <span>{product.category}</span>
                <p></p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product.id)}
              >
                Add To Cart
              </button>
              <Link to="/cart">Go to Cart</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
