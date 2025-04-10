import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const covidItemsData = [
  { name: "COVID-19 Antigen Test Kit", price: 250, image: "images/COVID-19 Antigen Test Kit.jpeg" },
  { name: "N95 Mask", price: 50, image: "images/N95 Mask.jpeg" },
  { name: "Hand Sanitizer", price: 80, image: "images/Hand Sanitizer.png" },
  { name: "Digital Thermometer", price: 150, image: "images/Digital Thermometer.jpeg" },
  { name: "Pulse Oximeter", price: 500, image: "images/Pulse Oximeter.jpeg" },
  { name: "Disposable Gloves", price: 100, image: "images/Disposable Gloves.jpeg" },
  { name: "Face Shield", price: 120, image: "images/Face Shield.jpeg" },
  { name: "Disinfectant Spray", price: 130, image: "images/Disinfectant Spray.jpeg" },
  { name: "Vitamin C Tablets", price: 90, image: "images/Vitamin C Tablets.jpeg" },
  { name: "Steam Vaporizer", price: 400, image: "images/Steam Vaporizer.jpeg" },
];

const CovidCarePage = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState(
    covidItemsData.map((item) => ({ ...item, qty: 0, added: false }))
  );

  const handleQtyChange = (index, delta) => {
    const updated = [...items];
    updated[index].qty = Math.max(0, updated[index].qty + delta);
    setItems(updated);
  };

  const toggleCart = (index) => {
    const updated = [...items];
    updated[index].added = !updated[index].added;
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

  const handleOrderNow = () => {
    const selectedItems = items
      .filter((item) => item.added && item.qty > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.qty,
        image: item.image,
      }));

    localStorage.setItem("covidCart", JSON.stringify(selectedItems));
    navigate("/form");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#00796B", marginBottom: "20px" }}>COVID Care Products</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}>
        {items.map((item, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            <img src={item.image} alt={item.name} style={{
              width: "100%",
              height: "150px",
              objectFit: "cover"
            }} />
            <h4 style={{ margin: "10px 0", color: "#333" }}>{item.name}</h4>
            <p style={{ marginBottom: "8px" }}>₹{item.price}</p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <button onClick={() => handleQtyChange(index, -1)} style={{ marginRight: "5px" }}>-</button>
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
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              {item.added ? "Remove from Cart" : "Add to Cart"}
            </button>

            <div>
              <button
                onClick={() => removeItem(index)}
                style={{ color: "#d9534f", border: "none", background: "none", cursor: "pointer" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ₹{totalPrice}</h3>
        {totalItems > 0 && (
          <button onClick={handleOrderNow} style={{
            marginTop: "10px",
            backgroundColor: "#007B8A",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
            Order Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CovidCarePage;
