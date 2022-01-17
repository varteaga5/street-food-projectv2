import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const CustLoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/customerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          if (user.type === "Customer") {
            onLogin(user)
          } else {
            setErrors(["you are not registered as a customer", "please log in as a customer"])
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
        <Form.Label className="text-danger" >email</Form.Label>
        <Form.Control type="email" placeholder="enter email" value={email}
          onChange={(e) => setEmail(e.target.value)}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-danger">password</Form.Label>
        <Form.Control type="password" placeholder="password" value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="danger" type="submit">
        {isLoading ? "loading..." : "login"}
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
  );
};

export default CustLoginForm;
