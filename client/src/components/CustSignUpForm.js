import React, { useState } from "react";
// used to go to home page on login
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CustSignUpForm = ({ onLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [favFood, setFavFood] = useState("");
  const [inputErrors, setInputErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setInputErrors([]);
    setIsLoading(true);
    fetch("/customersignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
        favFood,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setInputErrors(err.errors));
      }
    });
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-danger">first name</Form.Label>
        <Form.Control
          // className="text-danger"
          type="firstName"
          placeholder="enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-danger">last name</Form.Label>
        <Form.Control
          type="lastName"
          placeholder="enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>{" "}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-danger">email</Form.Label>
        <Form.Control
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-danger">password</Form.Label>
        <Form.Control
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-danger">password confirmation</Form.Label>
        <Form.Control
          type="passwordcon"
          placeholder="confirm password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-danger">my favorite food</Form.Label>
        <Form.Control
          type="favfood"
          placeholder="what's your favorite food?"
          value={favFood}
          onChange={(e) => setFavFood(e.target.value)}
        />
      </Form.Group>
      <Button variant="danger" type="submit">
        {isLoading ? "loading..." : "sign up"}
      </Button>
      <div>
        {inputErrors.map((err) => (
          <div key={err}>
            <span>!</span>
            <p>{err}</p>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default CustSignUpForm;

// <form onSubmit={handleSubmit}>
//   <div>
//     <label htmlFor="firstName">firstName</label>
//     <input
//       type="text"
//       id="firstName"
//       autoComplete="off"
//       value={firstName}
//       onChange={(e) => setFirstName(e.target.value)}
//       autoFocus
//     />
//   </div>
//   <div>
//     <label htmlFor="lastName">lastName</label>
//     <input
//       type="text"
//       id="lastName"
//       autoComplete="off"
//       value={lastName}
//       onChange={(e) => setLastName(e.target.value)}
//       autoFocus
//     />
//   </div>
//   <div>
//     <label htmlFor="email">email</label>
//     <input
//       type="text"
//       id="email"
//       autoComplete="off"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       autoFocus
//     />
//   </div>
//   <div>
//     <label htmlFor="password">Password</label>
//     <input
//       type="password"
//       id="password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       autoComplete="current-password"
//     />
//   </div>
//   <div>
//     <label htmlFor="password">Password Confirmation</label>
//     <input
//       type="password"
//       id="password_confirmation"
//       value={passwordConfirmation}
//       onChange={(e) => setPasswordConfirmation(e.target.value)}
//       autoComplete="current-password"
//     />
//   </div>
//   <div>
//     <label htmlFor="favFood">My favorite food is...</label>
//     <textarea
//       rows="3"
//       id="favFood"
//       value={favFood}
//       onChange={(e) => setFavFood(e.target.value)}
//     />
//   </div>
//   <div>
//     <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
//   </div>
//   <div>
//     {inputErrors.map((err) => (
//       <div key={err}>
//         <span>!</span>
//         <p>{err}</p>
//       </div>
//     ))}
//   </div>
// </form>
