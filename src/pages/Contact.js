import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { database, ref, push } from "../components/firebase"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    push(ref(database, "messages"), formData)
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); 
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="mt-4">
          <Col xs={12} md={6} className="mb-4">
            <Card className="custom-card">
              <Card.Body>
                <h1 className="text-center">Contact Us</h1>
                <div>
                  <p>
                    <FaPhone /> Call us: (123) 456-7890
                  </p>
                  <p>
                    <FaEnvelope /> Email:{" "}
                    <a href="mailto:support@foodjoy.com">support@foodjoy.com</a>
                  </p>
                </div>
                <div className="text-center">
                  <h5>Our Location</h5>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345091464!2d144.95565131531598!3d-37.81720997975123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11c8d5%3A0xb1f84de57a6ef0c3!2sFoodJoy!5e0!3m2!1sen!2sau!4v1648009018468!5m2!1sen!2sau"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName" className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formMessage" className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder="Write your message here"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
