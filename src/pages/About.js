import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <h1 className="text-center mb-4">About Us</h1>
        <Row>
          <Col md={12} className="mb-4">
            <Card className="hover-card bg-light-blue">
              <Card.Body>
                <h5>Company Details</h5>
                <p>
                  FoodJoy is a leading provider of fresh and organic food
                  products, committed to enhancing the health and wellbeing of
                  our customers. Our goal is to make healthy eating accessible
                  and enjoyable for everyone.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="hover-card bg-light-blue">
              <Card.Body>
                <h5>Mission</h5>
                <p>
                  Our mission is to provide high-quality, organic food products
                  that nourish the body and mind, while promoting sustainable
                  farming practices that benefit our community and the
                  environment.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="hover-card bg-light-blue">
              <Card.Body>
                <h5>Vision</h5>
                <p>
                  Our vision is to create a healthier world where organic food
                  is the norm, fostering a community that values sustainability,
                  health, and wellness.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default About;
