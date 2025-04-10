import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const initialTests = [
  { name: "Blood Sugar Test", price: 120, image: "images/Blood Sugar Test.jpeg" },
  { name: "Complete Blood Count", price: 250, image: "images/Complete Blood Count.jpeg" },
  { name: "Lipid Profile", price: 400, image: "images/Lipid Profile.png" },
  { name: "Thyroid Test", price: 300, image: "images/Thyroid Test.jpeg" },
  { name: "Liver Function Test", price: 450, image: "images/Liver Function Test.jpeg" },
  { name: "Kidney Function Test", price: 350, image: "images/Kidney Function Test.jpeg" },
  { name: "Vitamin D Test", price: 500, image: "images/Vitamin D Test.jpeg" },
  { name: "Hemoglobin Test", price: 150, image: "images/Hemoglobin Test.jpeg" },
  { name: "Urine Test", price: 100, image: "images/Urine Test.jpeg" },
  { name: "ECG", price: 600, image: "images/ECG.jpeg" },
];

const LabTestPage = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const loaded = initialTests.map((item) => ({ ...item, qty: 0, added: false }));
    setTests(loaded);

    // Load cart from localStorage if available
    const storedCart = JSON.parse(localStorage.getItem("labCart")) || [];
    const updatedTests = loaded.map((item) => {
      const match = storedCart.find((t) => t.name === item.name);
      return match ? { ...item, qty: match.qty, added: true } : item;
    });
    setTests(updatedTests);
  }, []);

  const updateCartStorage = (updated) => {
    const cart = updated.filter((item) => item.added);
    localStorage.setItem("labCart", JSON.stringify(cart));
  };

  const handleQtyChange = (index, delta) => {
    const updated = [...tests];
    updated[index].qty = Math.max(1, updated[index].qty + delta);
    setTests(updated);
    updateCartStorage(updated);
  };

  const toggleCart = (index) => {
    const updated = [...tests];
    updated[index].added = !updated[index].added;
    updated[index].qty = updated[index].added ? 1 : 0;
    setTests(updated);
    updateCartStorage(updated);
  };

  const removeItem = (index) => {
    const updated = [...tests];
    updated[index].qty = 0;
    updated[index].added = false;
    setTests(updated);
    updateCartStorage(updated);
  };

  const totalItems = tests.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = tests.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#00796B", marginBottom: "20px" }}>Lab Tests</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {tests.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h4 style={{ margin: "10px 0", color: "#333" }}>{item.name}</h4>
            <p style={{ marginBottom: "8px" }}>₹{item.price}</p>

            {item.added && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                <button onClick={() => handleQtyChange(index, -1)} style={{ marginRight: "5px" }}>
                  -
                </button>
                <span style={{ padding: "0 10px" }}>{item.qty}</span>
                <button onClick={() => handleQtyChange(index, 1)}>+</button>
              </div>
            )}

            <button
              onClick={() => toggleCart(index)}
              style={{
                backgroundColor: item.added ? "#dc3545" : "#28a745",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              {item.added ? "Remove from Cart" : "Add to Cart"}
            </button>

            {item.added && (
              <div>
                <button
                  onClick={() => removeItem(index)}
                  style={{
                    color: "#d9534f",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ₹{totalPrice}</h3>
        {totalItems > 0 && (
          <Link to="/form">
            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#007B8A",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Order Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LabTestPage;
