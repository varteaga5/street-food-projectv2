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
        r.json().then((user) => onLogin(user));
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
        <Form.Control type="email" placeholder="enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-warning">password</Form.Label>
        <Form.Control type="password" placeholder="password" />
      </Form.Group>
      <Button variant="warning" className="text-light" type="submit">
        {isLoading ? "loading..." : "login"}
      </Button>
      <div>
        {errors.map((err) => (
          <div key={err}>
            <span>!</span>
            <p>{err}</p>
          </div>
        ))}
      </div>
      <div>
        {errors.map((err) => (
          <div key={err}>
            <span>!</span>
            <p>{err}</p>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default VendLoginForm;

// <form onSubmit={handleSubmit}>
//   <div>
//     <label htmlFor="email">vendor email</label>
//     <input
//       type="text"
//       id="email"
//       autoComplete="off"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor="password">Password</label>
//     <input
//       type="password"
//       id="password"
//       autoComplete="current-password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />
//   </div>
//   <div>
//     <button variant="fill" color="primary" type="submit">
//       {isLoading ? "Loading..." : "Login"}
//     </button>
//   </div>
// <div>
//   {errors.map((err) => (
//     <div key={err}>
//       <span>!</span>
//       <p>{err}</p>
//     </div>
//   ))}
// </div>
// </form>
