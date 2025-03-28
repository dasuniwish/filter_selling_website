import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { database, ref, set, get } from "../components/firebase";
import productsData from "../JSON/products.json";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const uploadProducts = async () => {
      const productsRef = ref(database, "products/");
      productsData.forEach((product) => {
        set(ref(database, `products/${product.id}`), product);
      });
    };

    uploadProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(database, "products/");
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProducts(Object.values(data));
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (category ? product.category === category : true));

  const discountedProducts = products.filter((product) => product.discount > 0);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const currentDiscountedProducts = discountedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-3 text-center">Welcome to Our FilterHub</h1>

        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={4}>
            <Form.Select value={category} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="Air Filters">Air Filters</option>
              <option value="Water Filters">Water Filters</option>
              <option value="Oil Filters">Oil Filters</option>
              <option value="Industrial Filters">Industrial Filters</option>
              <option value="Food and Beverage Filters">Food and Beverage Filters</option>
              <option value="Specialty Filters">Specialty Filters</option>
            </Form.Select>
          </Col>
        </Row>

        <h2 className="mb-3">Featured Products</h2>
        <Row>
          {currentProducts.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
                <Card.Body className="text-center">
                  <Card.Title>{product.name}</Card.Title>
                  <p className="fw-bold">Rs.{product.price} </p>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    variant="primary"
                  >
                    More Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastProduct >= filteredProducts.length}
          >
            Next
          </Button>
        </div>

        <div className="mt-4 text-center">
          <h3>Special Discounts</h3>
          <p>Check out our amazing discounts on selected items!</p>
        </div>
        <Row>
          {currentDiscountedProducts.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
                <Card.Body className="text-center">
                  <Card.Title>{product.name}</Card.Title>
                  <p className="fw-bold">
                    Rs.
                    {product.price -
                      (product.price * product.discount) / 100}{" "}
                    <span className="text-muted">Rs.{product.price}</span> (
                    {product.discount}% off)
                  </p>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    variant="primary"
                  >
                    More Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mb-4 mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={indexOfLastProduct >= discountedProducts.length}
          >
            Next
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
