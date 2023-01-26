import React from "react";
import "./Home.css";

function Home({ products, user, cart, setCart }) {
  const handleAddToCart = (product) => {
    const newProduct = { ...product, quantity: 1 };
    setCart([...cart, newProduct]);
  };

  const isProductInCart = (product) => {
    return cart.some((p) => p.id === product.id);
  };
  let list;

  (user ? 
    list = products.map((product) => (
    <li key={product.id}>
      <p>{product.name}</p>
      <p>{product.price}$</p>
      {isProductInCart(product) ? (
        <p>Added to cart</p>
      ) : (
        <button
          className="home__button"
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      )}
    </li>
  ))
  :
  list = products.map((product) => (
    <li key={product.id}>
      <p>{product.name}</p>
      <p>{product.price}$</p>
    </li>
  ))
  )
  
  return (
    <div className="home">
      <h1 className="home__title">Products</h1>
      <ul>{list}</ul>
    </div>
  );
}

export default Home;
