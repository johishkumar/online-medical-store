// CommonProductPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CommonProductPage = ({ title, localStorageKey, products }) => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    setCart(storedCart);
  }, [localStorageKey]);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container p-4">
      <h2 className="text-center text-primary">{title}</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <img src={product.image} alt={product.name} className="card-img-top" height="200" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <button className="btn btn-success w-100" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h4 className="mt-4">Cart Total: ₹{totalAmount}</h4>
      <button className="btn btn-primary w-100" onClick={() => navigate("/form")}>Place Order</button>
    </div>
  );
};

export default CommonProductPage;