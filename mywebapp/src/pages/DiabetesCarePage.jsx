import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import this

const diabetesItems = [
  { name: "Glucometer", price: 800, image: "images/Glucometer.jpeg" },
  { name: "Sugar Test Strips", price: 450, image: "images/Sugar Test Strips.jpeg" },
  { name: "Lancets", price: 120, image: "images/Lancets.jpeg" },
  { name: "Diabetic Socks", price: 250, image: "images/Diabetic Socks.jpeg" },
  { name: "Foot Cream", price: 150, image: "images/Foot Cream.jpeg" },
  { name: "Insulin Pen", price: 600, image: "images/Insulin Pen.jpeg" },
  { name: "Diabetic Supplements", price: 300, image: "images/Diabetic Supplements.jpeg" },
  { name: "Low Sugar Snacks", price: 200, image: "images/Low Sugar Snacks.jpeg" },
  { name: "Sugar-Free Tablets", price: 100, image: "images/Sugar-Free Tablets.jpeg" },
  { name: "Diabetic Shoes", price: 1000, image: "images/Diabetic Shoes.jpeg" },
];

const DiabetesCarePage = () => {
  const [items, setItems] = useState(
    diabetesItems.map((item) => ({ ...item, qty: 0, added: false }))
  );

  const navigate = useNavigate(); // 👈 hook to navigate

  const handleQtyChange = (index, delta) => {
    const updated = [...items];
    updated[index].qty = Math.max(0, updated[index].qty + delta);
    setItems(updated);
  };

  const toggleCart = (index) => {
    const updated = [...items];
    updated[index].added = !updated[index].added;
    if (!updated[index].added) updated[index].qty = 0;
    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated[index].qty = 0;
    updated[index].added = false;
    setItems(updated);
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleOrder = () => {
    const selectedItems = items.filter(item => item.added && item.qty > 0);
    navigate("/form", {
      state: {
        selectedItems,
        totalPrice,
      },
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#00796B", marginBottom: 20 }}>Diabetes Care Products</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 20,
      }}>
        {items.map((item, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            borderRadius: 10,
            padding: 15,
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <h4 style={{ margin: "10px 0", color: "#333" }}>{item.name}</h4>
            <p style={{ marginBottom: 8 }}>₹{item.price}</p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <button onClick={() => handleQtyChange(index, -1)} style={{ marginRight: 5 }}>-</button>
              <span style={{ padding: "0 10px" }}>{item.qty}</span>
              <button onClick={() => handleQtyChange(index, 1)}>+</button>
            </div>
            <button
              onClick={() => toggleCart(index)}
              style={{
                backgroundColor: item.added ? "#dc3545" : "#28a745",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: 5,
                cursor: "pointer",
                marginBottom: 8
              }}
            >
              {item.added ? "Remove" : "Add to Cart"}
            </button>
            {item.added && (
              <div>
                <button
                  onClick={() => removeItem(index)}
                  style={{ color: "#d9534f", border: "none", background: "none", cursor: "pointer" }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ₹{totalPrice}</h3>
        {totalItems > 0 && (
          <button
            onClick={handleOrder}
            style={{
              marginTop: 10,
              backgroundColor: "#007B8A",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer"
            }}>
            Order Now
          </button>
        )}
      </div>
    </div>
  );
};

export default DiabetesCarePage;
