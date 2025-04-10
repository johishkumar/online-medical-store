import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DisplayPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(Array.isArray(storedOrders) ? storedOrders : []);
    } catch (error) {
      console.error("Failed to load orders from localStorage:", error);
      setOrders([]);
    }
  }, []);

  const calculateTotal = (items) =>
    items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

  const deleteOrder = (index) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updatedOrders = [...orders];
      updatedOrders.splice(index, 1);
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  };

  const editOrder = (index) => {
    const editedOrder = orders[index];
    const newName = prompt("Enter new customer name:", editedOrder.name);
    const newAge = prompt("Enter new age:", editedOrder.age);
    const newEmail = prompt("Enter new email:", editedOrder.email);
    const newPhone = prompt("Enter new phone:", editedOrder.phone);
    const newAddress = prompt("Enter new address:", editedOrder.address);

    if (newName && newAge && newEmail && newPhone && newAddress) {
      const updatedOrders = [...orders];
      updatedOrders[index] = {
        ...editedOrder,
        name: newName,
        age: newAge,
        email: newEmail,
        phone: newPhone,
        address: newAddress,
      };

      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="container mt-4 p-4 bg-light shadow rounded">
      <h2 className="text-danger text-center">Order Details</h2>

      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Ordered Items</th>
                <th>Total Price (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.name || "N/A"}</td>
                  <td>{order.age || "N/A"}</td>
                  <td>{order.email || "N/A"}</td>
                  <td>{order.phone || "N/A"}</td>
                  <td>{order.address || "N/A"}</td>
                  <td>
                    <ul className="list-unstyled">
                      {order.medicines?.length > 0 ? (
                        order.medicines.map((item, i) => (
                          <li key={i}>
                            {item.name} - ₹{item.price} × {item.quantity} = ₹
                            {item.price * item.quantity}
                          </li>
                        ))
                      ) : (
                        <li>No items ordered</li>
                      )}
                    </ul>
                  </td>
                  <td className="fw-bold">
                    ₹{calculateTotal(order.medicines || [])}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editOrder(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteOrder(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">
          No orders found. Please place an order.
        </p>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Place New Order
        </button>
      </div>
    </div>
  );
};

export default DisplayPage;
