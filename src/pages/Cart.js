import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { database, ref, get, remove, set } from "../components/firebase";
import { storage } from "../components/firebase";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [isProceedClicked, setIsProceedClicked] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartRef = ref(database, "cart/");
      const snapshot = await get(cartRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const itemsArray = Object.values(data);
        setCartItems(itemsArray);
        calculateTotalPrice(itemsArray);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const discountedPrice =
        item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
      return acc + discountedPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = async (id) => {
    const itemRef = ref(database, `cart/${id}`);
    try {
      await remove(itemRef);
  
      // Wait for Firebase confirmation, then update local state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  
      // Recalculate the total price after deletion
      calculateTotalPrice(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  

  const handlePaymentSlipChange = (e) => {
    setPaymentSlip(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentSlip) {
      setSubmissionStatus("Please select a payment slip to upload.");
      return;
    }

    const fileRef = storageRef(storage, `paymentSlips/${paymentSlip.name}`);
    const uploadTask = uploadBytesResumable(fileRef, paymentSlip);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Upload failed:", error);
        setSubmissionStatus("Failed to upload payment slip.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const paymentRef = ref(database, "payments/");
        await set(paymentRef, {
          paymentSlipURL: downloadURL,
          totalAmount: totalPrice,
          cartItems,
          timestamp: new Date().toISOString(),
        });

        setSubmissionStatus("Payment slip uploaded successfully.");
        setPaymentSlip(null);
      }
    );
  };

  const handleProceed = () => {
    setIsProceedClicked(true);
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h2>Your Cart</h2>
        <Row>
          {cartItems.map((item) => (
            <Col xs={12} sm={6} md={4} key={item.id}>
              <Card className="mb-4">
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  className="img-fluid"
                  style={{ height: "200px", width: "200px" }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> Rs.{item.price} <br />
                    <strong>Quantity:</strong> {item.quantity}
                    <br />
                    {item.discount > 0 && (
                      <>
                        <strong>Discount:</strong> {item.discount}% <br />
                        <strong>Discounted Price:</strong> Rs.
                        {(item.price * (1 - item.discount / 100)).toFixed(
                          2
                        )}{" "}
                        <br />
                      </>
                    )}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <h4>Total Price: Rs.{totalPrice.toFixed(2)}</h4>

        <Button variant="primary" onClick={handleProceed} className="mt-3 mb-4">
          Proceed
        </Button>

        {isProceedClicked && (
          <>
            <h3>Upload Payment Slip</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="paymentSlip">
                <Form.Label>Upload Payment Slip</Form.Label>
                <Form.Control
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handlePaymentSlipChange}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mt-3 mb-4">
                Submit
              </Button>
            </Form>
            {submissionStatus && (
              <Alert
                variant={
                  submissionStatus.includes("successfully")
                    ? "success"
                    : "danger"
                }
                className="mt-3"
              >
                {submissionStatus}
              </Alert>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Cart;
