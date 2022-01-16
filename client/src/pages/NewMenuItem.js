import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewMenuItem = ({ currentUser }) => {
  const [foodName, setFoodName] = useState("");
  const [foodDesc, setFoodDesc] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName: currentUser.companyName,
        foodName,
        foodDesc,
        price,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        navigate("/VendMenuList");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <h2>add new menu item</h2>
      <Form onSubmit={handleSubmit} className="h-25 d-inline-block">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>food name</Form.Label>
          <Form.Control
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="enter a food name"
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>food description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="enter a description"
            value={foodDesc}
            onChange={(e) => setFoodDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="enter a price"
          />
        </Form.Group>
        <Button type="submit">
          {isLoading ? "loading..." : "add menu item"}
        </Button>{" "}
        <Button variant="danger" onClick={() => navigate("/VendMenuList")}>
          cancel
        </Button>
        <p></p>
        <div>
          {errors.map((err) => (
            <div
              key={err}
              class="alert alert-danger fade show text-center"
            >{err}</div>
          ))}
        </div>
      </Form>
    </div>
  );
};

export default NewMenuItem;
