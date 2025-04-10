import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MedicinesPage = () => {
  const [products, setProducts] = useState([
    {
      name: "Paracetamol 500mg",
      price: 50,
      image: "/images/paracetamol.jpeg",
      quantity: 1,
    },
    {
      name: "Crocin Advance",
      price: 30,
      image: "/images/Crocin Advance.jpeg",
      quantity: 1,
    },
    {
      name: "Dolo 650",
      price: 35,
      image: "/images/Dolo 650.jpeg",
      quantity: 1,
    },
    {
      name: "Cetrizine",
      price: 20,
      image: "/images/Cetrizine.jpeg",
      quantity: 1,
    },
    {
      name: "Disprin",
      price: 25,
      image: "/images/Disprin.jpeg",
      quantity: 1,
    },
    {
      name: "Combiflam",
      price: 40,
      image: "/images/Combiflam.jpeg",
      quantity: 1,
    },
    {
      name: "Calpol 650",
      price: 32,
      image: "/images/Calpol 650.jpeg",
      quantity: 1,
    },
    {
      name: "Avil 25",
      price: 22,
      image: "/images/Avil 25.jpeg",
      quantity: 1,
    },
    {
      name: "Metrogyl 400",
      price: 28,
      image: "/images/Metrogyl 400.jpeg",
      quantity: 1,
    },
    {
      name: "Allegra 120",
      price: 190,
      image: "/images/Allegra 120.jpeg",
      quantity: 1,
    },
    {
      name: "Pan D",
      price: 110,
      image: "/images/Pan D.jpeg",
      quantity: 1,
    },
    {
      name: "Pantop D",
      price: 105,
      image: "/images/Pantop D.jpeg",
      quantity: 1,
    },
    {
      name: "Zincovit",
      price: 95,
      image: "/images/Zincovit.jpeg",
      quantity: 1,
    },
    {
      name: "Supradyn",
      price: 110,
      image: "/images/Supradyn.jpeg",
      quantity: 1,
    },
    {
      name: "Revital H",
      price: 120,
      image: "/images/Revital H.jpeg",
      quantity: 1,
    },
    {
      name: "Neurobion Forte",
      price: 95,
      image: "/images/Neurobion Forte.jpeg",
      quantity: 1,
    },
    {
      name: "Limcee Vitamin C",
      price: 45,
      image: "/images/Limcee Vitamin C.jpeg",
      quantity: 1,
    },
    {
      name: "Omez",
      price: 80,
      image: "/images/Omez.jpeg",
      quantity: 1,
    },
    {
      name: "Azee 500",
      price: 120,
      image: "/images/Azee 500.jpeg",
      quantity: 1,
    },
    {
      name: "Azithral 500",
      price: 130,
      image: "/images/Azithral 500.jpeg",
      quantity: 1,
    },
    {
      name: "Ecosprin 150",
      price: 60,
      image: "/images/Ecosprin 150.jpeg",
      quantity: 1,
    },
    {
      name: "Ascoril Cough Syrup",
      price: 85,
      image: "/images/Ascoril Cough Syrup.jpeg",
      quantity: 1,
    },
    {
      name: "Digene Antacid",
      price: 55,
      image: "/images/Digene Antacid.jpeg",
      quantity: 1,
    },
    {
      name: "ORS Powder",
      price: 20,
      image: "/images/ORS Powder.jpeg",
      quantity: 1,
    },
    {
      name: "Benadryl Cough Syrup",
      price: 70,
      image: "/images/Benadryl Cough Syrup.jpeg",
      quantity: 1,
    },
    {
      name: "Himalaya Liv 52",
      price: 130,
      image: "/images/Himalaya Liv 52.jpeg",
      quantity: 1,
    },
    {
      name: "Zandu Balm",
      price: 50,
      image: "/images/Zandu Balm.jpeg",
      quantity: 1,
    },
    {
      name: "Moov Pain Relief",
      price: 90,
      image: "/images/Moov Pain Relief.jpeg",
      quantity: 1,
    },
    {
      name: "Volini Spray",
      price: 130,
      image: "/images/Volini Spray.jpeg",
      quantity: 1,
    },
    {
      name: "Amrutanjan Balm",
      price: 35,
      image: "/images/Amrutanjan Balm.jpeg",
      quantity: 1,
    }
  ]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.name === product.name);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product }];
    }
    updateLocalStorage(updatedCart);
  };

  const handleQuantityChange = (index, amount) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += amount;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    updateLocalStorage(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateLocalStorage(updatedCart);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success text-center">Medicines</h2>
      <div className="row">
        {products.map((product, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className="card shadow">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-5">
          <h4>Your Cart</h4>
          <ul className="list-group">
            {cart.map((item, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name} - ₹{item.price} × {item.quantity}
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleQuantityChange(i, -1)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleQuantityChange(i, 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(i)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/form">
            <button className="btn btn-success mt-3">Order Now</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MedicinesPage;
