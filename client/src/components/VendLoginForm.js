import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const VendLoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/vendorlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          if (user.type === "Vendor") {
            onLogin(user)
          } else {
            setErrors(["you are not registered as a vendor", "please log in as a vendor"])
          }
          });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-warning">email</Form.Label>
        <Form.Control
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-warning">password</Form.Label>
        <Form.Control
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="warning" className="text-light" type="submit">
        {isLoading ? "loading..." : "login"}
      </Button>

      <p></p>
      <div>
        {errors.map((err) => (
          <div key={err} className="alert alert-danger fade show text-center">
            {err}
          </div>
        ))}
      </div>
    </Form>
  );
};

export default VendLoginForm;
