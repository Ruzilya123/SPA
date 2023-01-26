import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Logout from "./pages/Logout";
import "./App.css";

function Site() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setProducts([
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
      { id: 3, name: "Product 3", price: 300 },
      { id: 4, name: "Product 4", price: 400 },
    ]);
    // get user from local storage
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email && password) {
      setUser({ email, password });
    }
    const users = JSON.parse(localStorage.getItem("users"))["users"];
    console.log(users);
    if (Array.isArray(users)) {
      setUsers(users);
    }
  }, []);

  // const handleLogin = (user) => {
  //   setUser(user);
  // };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul className="ul">
            <li className="site-item">
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="site-item">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="site-item">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="site-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="site-item">
                  <Link to="/register">Registration</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route
            path="/login"
            element={<Login
            users={users}
            setUsers={setUsers}
            user={user}
            setUser={setUser}
            />}
          ></Route>
          <Route path="/register"
          element={<Register 
            users={users}
            setUsers={setUsers}
            user={user}
            setUser={setUser}
            />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          ></Route>
          <Route
            path="/"
            element={
              <Home
                products={products}
                setCart={setCart}
                cart={cart}
                user={user}
                setProducts={setProducts}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Site;
