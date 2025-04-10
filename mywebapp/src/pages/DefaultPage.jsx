import React from "react";
import { Link } from "react-router-dom";

const DefaultPage = () => {
  const services = [
    {
      name: "Medicines",
      path: "/order",
      image: "/images/medicen.png",
    },
    {
      name: "Lab Tests",
      path: "/labtest",
      image: "/images/labtest.jpeg",
    },
    {
      name: "Health Products",
      path: "/health",
      image: "/images/health.jpeg",
    },
    {
      name: "Diabetes Care",
      path: "/diabetes",
      image: "/images/diabetes.jpeg",
    },
    {
      name: "COVID Essentials",
      path: "/covid",
      image: "/images/covid.jpeg",}
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#E0F7FA",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#00796B", fontSize: "2.5rem", fontWeight: "bold" }}>
          Welcome to Online Medical Store
        </h1>
        <p style={{ color: "#555", fontSize: "1.2rem", marginTop: "10px" }}>
          Your trusted destination for genuine medicines and healthcare essentials.
        </p>
        <Link
          to="/order"
          style={{
            marginTop: "20px",
            display: "inline-block",
            padding: "10px 25px",
            backgroundColor: "#20C997",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Order Now
        </Link>
      </section>

      {/* Services Section */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#00796B", marginBottom: "30px" }}>Our Services</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {services.map((item, i) => (
            <Link
              to={item.path}
              key={i}
              style={{
                backgroundColor: "#F1F8E9",
                padding: "20px",
                width: "180px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "#33691E",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              />
              <h4>{item.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section
        style={{
          backgroundColor: "#FFF3E0",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#EF6C00" }}>Exciting Offers</h2>
        <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>
          💊 Get up to <strong>20% OFF</strong> on your first medicine order!
        </p>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#00796B" }}>Why Choose Us?</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li>✔ 100% Genuine Medicines</li>
          <li>✔ Fast & Safe Delivery</li>
          <li>✔ Trusted by Thousands</li>
          <li>✔ Expert Customer Support</li>
        </ul>
      </section>

      {/* Mini Footer */}
      <footer
        style={{
          backgroundColor: "gray",
          padding: "20px",
          textAlign: "center",
          fontSize: "0.9rem",
          color:"white"
        }}
      >
        © 2025 Online Medical Store. All rights reserved.
      </footer>
    </div>
  );
};

export default DefaultPage;
