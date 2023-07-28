import React from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, sort, byRating },
    productDispatch,
  } = CartState();

  console.log({ byStock, byFastDelivery, sort, byRating });
  return (
    <div className="filters">
      <span className="title">Filter products</span>
      <Form.Check
        inline
        label="Ascending"
        name="group1"
        type="radio"
        id="inline-1"
        onChange={() =>
          productDispatch({
            type: "SORT_BY_PRICE",
            payload: "lowToHigh",
          })
        }
        checked={sort === "lowToHigh" ? true : false}
      />
      <Form.Check
        inline
        label="Descending"
        name="group1"
        type="radio"
        id="inline-2"
        onChange={() =>
          productDispatch({
            type: "SORT_BY_PRICE",
            payload: "highTolow",
          })
        }
        checked={sort === "highTolow" ? true : false}
      />
      <Form.Check
        inline
        label="Include Out of Stock"
        name="group1"
        type="checkbox"
        id="inline-3"
        onChange={() =>
          productDispatch({
            type: "FILTER_BY_STOCK",
          })
        }
        checked={byStock}
      />
      <Form.Check
        inline
        label="Fast Delivery Only"
        name="group1"
        type="checkbox"
        id="inline-4"
        onChange={() =>
          productDispatch({
            type: "FILTER_BY_DELIVERY",
          })
        }
        checked={byFastDelivery}
      />
      <label>Rating:</label>
      <Rating
        rating={byRating}
        onClick={(i) =>
          productDispatch({
            type: "FILTER_BY_RATING",
            payload: i + 1,
          })
        }
      />
      <Button
        variant="light"
        onChange={() =>
          productDispatch({
            type: "CLEAR_FILTER",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
