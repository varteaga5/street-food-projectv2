import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const VendSignUpForm = ({ onLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [companyName, setCompanyName] = useState("");
  // const [foodType, setFoodType] = useState("Vendor");
  const [featured_image, setFeaturedImage] = useState(null);
  const [inputErrors, setInputErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setInputErrors([]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);
    formData.append("companyName", companyName);
    formData.append("type", "Vendor");
    formData.append("featured_image", featured_image);

    fetch("/vendors", {
      method: "POST",
      body: formData,
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

  const fileSelectHandler = (e) => {
    setFeaturedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className="text-warning">first name</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className="text-warning">last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>{" "}
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
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-warning">password confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="confirm password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className="text-warning">food type</Form.Label>
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="what type of food do you serve?"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className="text-warning">company name</Form.Label>
        <Form.Control
          type="text"
          autoComplete="off"
          placeholder="what's your company's name?"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFile">
        <Form.Label className="text-warning">profile picture</Form.Label>
        <Form.Control
          type="file"
          name="file_upload"
          accept="image/.jpg, .jpeg, .png, .gif"
          multiple={false}
          onChange={fileSelectHandler}
        />
      </Form.Group>
      <Button variant="warning" type="submit" className="text-light">
        {isLoading ? "loading..." : "sign up"}
      </Button>
      <div>
        <p></p>
        {inputErrors.map((err) => (
          <div key={err} class="alert alert-danger fade show text-center">
            {err}
          </div>
        ))}
      </div>
    </Form>
  );
};

export default VendSignUpForm;

// function handleSubmit(e) {
//   e.preventDefault();
//   const formData = new FormData();
//   setInputErrors([]);
//   setIsLoading(true);
//   fetch("/vendors", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       firstName,
//       lastName,
//       email,
//       password,
//       password_confirmation: passwordConfirmation,
//       foodType,
//       companyName,
//       type: "Vendor",
//       image,
//     }),
//   }).then((r) => {
//     setIsLoading(false);
//     if (r.ok) {
//       r.json().then((user) => onLogin(user));
//     } else {
//       r.json().then((err) => setInputErrors(err.errors));
//     }
//   });
//   navigate("/");
// }
