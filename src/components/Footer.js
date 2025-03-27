import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
       
          <Col xs={12} md={6}>
          <img src="logo.ico" alt="FoodJoy Logo" className="navbar-logo" style={{ width: '100px',marginBottom:'50px'  }} />

            <h5>About Us</h5>
            <p>
              FoodJoy is dedicated to providing fresh and organic food products
              to enhance your health and wellbeing.
            </p>
          </Col>
          <Col xs={12} md={3}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/products">Products</a>
              </li>
              <li>
                <a href="/cart">Cart</a>
              </li>
              <li>
                <a href="/trackorder">Track Order</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={3}>
            <h5>Contact Us</h5>
            <p>
              Email:{" "}
              <a href="mailto:support@foodjoy.com">support@foodjoy.com</a>
            </p>
            <p>Phone: (123) 456-7890</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} FoodJoy. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
