import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import Rating from "../components/Rating";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const CartPage = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, current) => acc + Number(current.price) * current.qty,
        0
      )
    );
  }, [cart]);

  console.log(cart);

  return (
    <div className="cartPage home">
      <div className="productContainer">
        <ListGroup>
          {cart?.map((product) => (
            <ListGroup.Item>
              <Row>
                <Col md={2}>
                  <Image
                    className="cartItemImage"
                    src={product?.image}
                    alt={product?.name}
                  />
                </Col>
                <Col md={2}>
                  <span>{product?.name}</span>
                </Col>
                <Col md={2}>
                  <span>₹ {product?.price}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={product?.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: Number(e.target.value),
                        },
                      })
                    }
                    as="select"
                  >
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <div className="title">SubTotal : {cart?.length} items</div>
        <div>Total : ₹ {total}</div>
        <Button disabled={cart?.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
