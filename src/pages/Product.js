import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { database, ref, set, get, push } from "../components/firebase";
import productsData from "../JSON/products.json";

const Product = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [filter, setFilter] = useState({ category: "", sort: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(database, "products/");
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productArray = Object.values(data);
          setProducts(productArray);
          const foundProduct = productArray.find(
            (prod) => prod.id === parseInt(id)
          );
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, [id]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter((product) =>
      filter.category ? product.category === filter.category : true
    )
    .sort((a, b) => (filter.sort === "price" ? a.price - b.price : 0));

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-3 text-center">Food Menu</h1>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Select name="category" onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="Air Filters">Air Filters</option>
              <option value="Water Filters">Water Filters</option>
              <option value="Oil Filters">Oil Filters</option>
              <option value="Industrial Filters">Industrial Filters</option>
              <option value="Food and Beverage Filters">Food and Beverage Filters</option>
              <option value="Specialty Filters">Specialty Filters</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Select name="sort" onChange={handleFilterChange}>
              <option value="">Sort by</option>
              <option value="price">Price (Low to High)</option>
            </Form.Select>
          </Col>
        </Row>

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
                  <h5>{product.name}</h5>
                  <p className="fw-bold">Rs.{product.price}</p>
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
      </Container>
      <Footer />
    </>
  );
};

export default Product;
