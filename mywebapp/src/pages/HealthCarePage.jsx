import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HealthProductPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});

  const products = [
    {
      id: 1,
      name: "Liveasy Diabetic Protein",
      price: 120,
      image: "images/Liveasy Diabetic Protein.jpeg",
    },
    {
      id: 2,
      name: "Multivitamin Capsules",
      price: 180,
      image: "images/Multivitamin Capsules.jpeg",
    },
    {
      id: 3,
      name: "Vitamin C Tablets",
      price: 110,
      image: "images/Vitamin C Tablets.jpeg",
    },
    {
      id: 4,
      name: "Apple Cider Vinegar",
      price: 210,
      image: "images/Apple Cider Vinegar.jpeg",
    },
    {
      id: 5,
      name: "Omega-3 Fish Oil",
      price: 250,
      image: "images/Omega-3 Fish Oil.jpeg",
    },
    {
      id: 6,
      name: "Biotin Hair Gummies",
      price: 275,
      image: "images/Biotin Hair Gummies.jpeg",
    },
    {
      id: 7,
      name: "Probiotic Capsules",
      price: 230,
      image: "images/Probiotic Capsules.jpeg",
    },
    {
      id: 8,
      name: "Electrolyte Powder",
      price: 65,
      image: "images/Electrolyte Powder.jpeg",
    },
    {
      id: 9,
      name: "Pain Relief Balm",
      price: 85,
      image: "images/Pain Relief Balm.jpeg",
    },
    {
      id: 10,
      name: "Ashwagandha Tablets",
      price: 195,
      image: "images/Ashwagandha Tablets.jpeg",
    },
    {
      id: 11,
      name: "Neem Capsules",
      price: 99,
      image: "images/Neem Capsules.jpeg",
    },
    {
      id: 12,
      name: "Ayurvedic Syrup",
      price: 115,
      image: "images/Ayurvedic Syrup.jpeg",
    },
    {
      id: 13,
      name: "Protein Powder",
      price: 320,
      image: "images/Protein Powder.jpeg",
    },
    {
      id: 14,
      name: "Zinc Tablets",
      price: 75,
      image: "images/Zinc Tablets.jpeg",
    },
    {
      id: 15,
      name: "Immunity Booster",
      price: 205,
      image: "images/Immunity Booster.jpeg",
    },
    {
      id: 16,
      name: "Calcium Tablets",
      price: 150,
      image: "images/Calcium Tablets.jpeg",
    },
    {
      id: 17,
      name: "Eye Health Capsules",
      price: 195,
      image: "images/Eye Health Capsules.jpeg",
    },
    {
      id: 18,
      name: "Muscle Gain Powder",
      price: 390,
      image: "images/Muscle Gain Powder.jpeg",
    },
    {
      id: 19,
      name: "Liver Detox Tablets",
      price: 160,
      image: "images/Liver Detox Tablets.jpeg",
    },
    {
      id: 20,
      name: "Green Tea Extract",
      price: 145,
      image: "images/Green Tea Extract.jpeg",
    },
  ];

  const handleAddToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] ? prev[productId] + 1 : 1,
    }));
  };

  const handleRemove = (productId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(cartItems).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p.id === parseInt(id));
    return sum + product.price * qty;
  }, 0);

  const handleOrderNow = () => {
    const selectedProducts = Object.entries(cartItems).map(([id, qty]) => {
      const product = products.find((p) => p.id === parseInt(id));
      return { ...product, quantity: qty };
    });

    navigate("/form", {
      state: {
        selectedItems: selectedProducts,
        totalAmount: totalPrice,
      },
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2E8B57" }}>
        Healthcare Products
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {products.map((product) => {
          const inCart = !!cartItems[product.id];
          return (
            <div
              key={product.id}
              style={{
                width: "220px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: inCart ? "#f1f8e9" : "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "contain", borderRadius: "8px", marginBottom: "10px" }}
              />
              <h4 style={{ color: "#333" }}>{product.name}</h4>
              <p style={{ color: "#666" }}>₹{product.price}</p>

              {/* Quantity Controls */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                <button
                  onClick={() => handleRemove(product.id)}
                  disabled={!cartItems[product.id]}
                  style={{
                    padding: "4px 10px",
                    fontSize: "18px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: "16px", minWidth: "20px" }}>{cartItems[product.id] || 0}</span>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  style={{
                    padding: "4px 10px",
                    fontSize: "18px",
                    backgroundColor: "#ccc",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: inCart ? "#dc3545" : "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                {inCart ? "Added" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <h3 style={{ color: "#007B8A" }}>Cart Summary</h3>
        <p>No. of Items: {totalItems}</p>
        <p>Total Price: ₹{totalPrice}</p>
        {totalItems > 0 && (
          <button
            onClick={handleOrderNow}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007B8A",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Order Now
          </button>
        )}
      </div>
    </div>
  );
};

export default HealthProductPage;
