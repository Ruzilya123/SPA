import React from "react";

function Cart({ cart, setCart }) {
  

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((p) => p.id !== product.id));
  };

  const isProductInCart = (product) => {
    return cart.some((p) => p.id === product.id);
  };

  const changeQuantity = (product, change_quantity) => {
    const newCart = cart.map((p) => {
      if (p.id === product.id) {
        return {
           ...p, 
           quantity: p.quantity + change_quantity
          };
      }
      return p;
    });
    setCart(newCart);
  };

  return (
    <div className="cart">
      <h1 className="cart__title">Cart</h1>
        <p style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          {cart.map((product) => (
            <table border="1">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Change Quantity</th>
                  <th>Remove from cart</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price * product.quantity}</td>
                  <td>
                    <button onClick={() => changeQuantity(product, 1)}>+</button>
                    <button onClick={() => changeQuantity(product, -1)}>-</button>
                  </td>
                  <td>
                    {
                      isProductInCart(product) ? (
                        <button onClick={() => handleRemoveFromCart(product)}>
                          Remove from cart
                        </button>
                      ) : (
                        null )
                    }
                  </td>
                </tr>
              </tbody>
            </table>          
          ))}
        </p>
    </div>
  );
}

export default Cart;