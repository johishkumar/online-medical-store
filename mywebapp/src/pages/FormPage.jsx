import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    address: "",
  });

  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.selectedItems) {
      setCart(location.state.selectedItems);
      return;
    }

    const medicineCart = JSON.parse(localStorage.getItem("cart")) || [];
    const labCart = JSON.parse(localStorage.getItem("labCart")) || [];
    const healthCart = JSON.parse(localStorage.getItem("healthCart")) || [];
    const diabetesCart = JSON.parse(localStorage.getItem("diabetesCart")) || [];
    const covidCart = JSON.parse(localStorage.getItem("covidCart")) || [];

    const combinedCart = [
      ...medicineCart,
      ...labCart,
      ...healthCart,
      ...diabetesCart,
      ...covidCart,
    ].map((item) => {
      const quantity = parseInt(item.quantity || item.qty || 1);
      const price = parseFloat(item.price || 0);
      return {
        ...item,
        quantity: isNaN(quantity) ? 1 : quantity,
        price: isNaN(price) ? 0 : price,
      };
    });

    setCart(combinedCart);
  }, [location.state]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);

    if (!location.state?.selectedItems) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || formData.age < 18 || formData.age > 100)
      newErrors.age = "Age must be between 18 and 100";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Cart is empty",
        text: "Please add items to your cart before placing the order.",
      });
      return;
    }

    if (!validateForm()) return;

    Swal.fire({
      title: "Confirm Order",
      html: `<strong>Total Amount: ₹${totalAmount}</strong><br/>Do you want to place the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, place it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const newOrder = {
          ...formData,
          medicines: cart,
          totalAmount,
          date: new Date().toLocaleString(),
        };

        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...storedOrders, newOrder]));

        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been saved successfully.",
        }).then(() => {
          // Redirect to display page
          navigate("/display");
        });

        localStorage.removeItem("cart");
        localStorage.removeItem("labCart");
        localStorage.removeItem("healthCart");
        localStorage.removeItem("diabetesCart");
        localStorage.removeItem("covidCart");

        setCart([]);
        setOrderPlaced(true);
        setFormData({ name: "", age: "", email: "", phone: "", address: "" });
        setErrors({});
      }
    });
  };

  return (
    <div className="container mt-4 p-4 bg-light shadow rounded">
      <h2 className="text-center text-primary">📝 Place Your Order</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            rows="3"
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <h4 className="mt-4">🛒 Selected Items</h4>
        {cart.length > 0 ? (
          <ul className="list-group mb-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.name} - ₹{item.price} × {item.quantity} = ₹
                  {item.price * item.quantity}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No items in your cart.</p>
        )}

        {cart.length > 0 && (
          <>
            <h5 className="mt-3">💰 Total Amount: ₹{totalAmount}</h5>
            <button type="submit" className="btn btn-success w-100 mt-3">
              Confirm & Place Order
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default FormPage;
