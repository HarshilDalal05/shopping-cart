import React from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  FormControl,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import { Link } from "react-router-dom";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="navbarBrand" href="/">
            Shopping-Cart
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              className="m-auto"
              placeholder="Enter the name to search"
              onChange={(e) =>
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            />
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <NavDropdown
              title={
                <>
                  <Badge bg="success">
                    <Cart color="white" /> {cart?.length}
                  </Badge>
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>
                {cart?.length > 0 ? (
                  <>
                    {cart?.map((product) => (
                      <span className="cartItem" key={product?.id}>
                        <img
                          className="cartItemImage"
                          src={product?.image}
                          alt={product?.name}
                        />
                        <div className="cartItemDetail">
                          <span className="cartItemName">{product?.name}</span>
                          <span className="cartItemPrice">
                            ₹ {product?.price.split(".")[0]}
                          </span>
                        </div>
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
                      </span>
                    ))}
                  </>
                ) : (
                  <>
                    <Alert variant="warning">Cart is Empty !!</Alert>
                  </>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/cart">
                  <Button className="goToCartBtn">Go To Cart</Button>
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
