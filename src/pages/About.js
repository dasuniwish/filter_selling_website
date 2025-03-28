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
          <Col md={4} className="mb-4">
            <Card className="hover-card bg-light-blue">
              <Card.Body>
                <h5>Company Details</h5>
                <p>
                  <strong>Company Name:</strong> FilterHub
                  <br />
                  <strong>Website:</strong> www.filterhub.com
                  <br />
                  <strong>Industry:</strong> E-commerce / Retail
                  <br />
                  <strong>Location:</strong> Matara, Sri Lanka
                  <br />
                  <strong>Contact Email:</strong>{" "}
                  <a href="mailto:support@filterhub.com">
                    support@filterhub.com
                  </a>
                  <br />
                  <strong>Phone Number:</strong> (123) 456-7890
                  <br />
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="hover-card bg-light-blue">
              <Card.Body>
                <h5>Mission</h5>
                <p>
                  At FilterHub, our mission is to simplify the shopping
                  experience for filters by providing an extensive selection of
                  high-quality products. We empower consumers with an intuitive
                  platform, exceptional customer service, and a commitment to
                  sustainability, ensuring they find the perfect solutions for
                  their air, water, and industrial filtration needs.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="hover-card bg-light-blue">
              <Card.Body>
                <h5>Vision</h5>
                <p>
                  To become the leading online destination for high-quality
                  filters, empowering consumers to find the perfect solutions
                  for their needs through an innovative and user-friendly
                  platform.
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
