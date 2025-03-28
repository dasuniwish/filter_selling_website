import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { database, ref, get, push, set } from "../components/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsRef = ref(database, "products/");
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productArray = Object.values(data);
          const foundProduct = productArray.find(
            (prod) => prod.id === parseInt(id)
          );
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      try {
        const cartRef = ref(database, "cart/");
        const newCartItemRef = push(cartRef);
        await set(newCartItemRef, {
          id: product.id,
          name: product.name,
          price: product.price,
          discount: product.discount || 0,
          image: product.image,
          quantity: 1,
        });

        console.log(`${product.name} has been added to the cart.`);
        navigate("/cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        {product ? (
          <Row className="justify-content-center">
            <Col xs={12} sm={6} md={4}>
              <Card className="mb-4">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                  style={{ height: "300px", width: "300px" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Category:</strong> {product.category} <br />
                    <strong>Price:</strong> Rs.{product.price} <br />
                    {product.discount > 0 && (
                      <>
                        <strong>Discount:</strong> {product.discount}% <br />
                        <strong>Discounted Price:</strong> Rs.
                        {(product.price * (1 - product.discount / 100)).toFixed(
                          2
                        )}{" "}
                        <br />
                      </>
                    )}
                    <strong>Description:</strong> {product.description} <br />
                    <strong>Specifications:</strong>
                    <ul>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      )}
                    </ul>
                  </Card.Text>
                  <Button
                    as={Link}
                    to="/products"
                    variant="success"
                    className="me-2"
                  >
                    Back to Products
                  </Button>
                  <Button variant="success" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <p>Product not found.</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetails;
