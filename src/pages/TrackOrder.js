import React, { useState, useEffect } from "react";
import { database, ref, set, get } from "../components/firebase";
import ordersData from "../JSON/orders.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TrackOrder.css";

const TrackOrderStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const uploadOrders = async () => {
      const ordersRef = ref(database, "orders/");
      ordersData.forEach((order) => {
        set(ref(database, `orders/${order.id}`), order);
      });
    };
    uploadOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = ref(database, "orders/");
        const snapshot = await get(ordersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setOrders(Object.entries(data));
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const checkOrderStatus = () => {
    const foundOrder = orders.find(([id]) => id === orderId);
    if (foundOrder) {
      setOrderStatus(foundOrder[1].status);
    } else {
      setOrderStatus("Order not found");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <div className="order-status-container">
        <div style={{ textAlign: "left", flex: 1 }}>
          <h1>Track Order Status</h1>
          <input
            type="text"
            value={orderId}
            onChange={handleInputChange}
            placeholder="Enter Order ID"
            style={{ padding: "10px", marginRight: "10px" }}
          />
          <button onClick={checkOrderStatus} style={{ padding: "10px" }}>
            Check Status
          </button>
          {orderStatus && (
            <p style={{ color: "red", fontSize: "30px" }}>{orderStatus}</p>
          )}
        </div>
        <img
          src="Images/Man.jpg"
          alt="Delivery"
          className="order-status-image"
        />
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrderStatus;
