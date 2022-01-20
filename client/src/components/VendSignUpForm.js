import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ImgUploader from "./ImgUploader";

const VendSignUpForm = ({ onLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [featured_image, setFeaturedImage] = useState(null);
  const [inputErrors, setInputErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setInputErrors([]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    formData.append("companyName", companyName);
    formData.append("type", "Vendor");
    formData.append("foodType", foodType.toLowerCase());

    fetch("/vendors", {
      method: "POST",
      body: formData,
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate("/");
      } else {
        r.json().then((err) => setInputErrors(err.errors));
      }
    });
  }

  const clickHandler = (e) => {
    setToggle((prev) => !prev);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label className="text-warning">first name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label className="text-warning">last name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>{" "}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-warning">email</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-warning">password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPasswordCon">
        <Form.Label className="text-warning">password confirmation</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="confirm password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFoodType">
        <Form.Label className="text-warning">food type</Form.Label>
        <Form.Control
          required
          type="text"
          autoComplete="off"
          placeholder="what type of food do you serve?"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCoName">
        <Form.Label className="text-warning">company name</Form.Label>
        <Form.Control
          required
          type="text"
          autoComplete="off"
          placeholder="what's your company's name?"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </Form.Group>
      <div>
        <Button
          onClick={clickHandler}
          variant="warning mb-3"
          className="text-light"
        >
         {toggle ? "upload image later" : "upload image?"}
        </Button>
      </div>
      {toggle ? (
        <ImgUploader
          setFeaturedImage={setFeaturedImage}
          firstName={firstName}
          lastName={lastName}
          email={email}
          password={password}
          passwordConfirmation={passwordConfirmation}
          companyName={companyName}
          foodType={foodType}
          featured_image={featured_image}
          setInputErrors={setInputErrors}
          setIsLoading={setIsLoading}
          onLogin={onLogin}
        ></ImgUploader>
      ) : (
        ""
      )}
      {toggle || (
        <Button variant="warning" type="submit" className="text-light">
          {isLoading ? "loading..." : "sign up"}
        </Button>
      )}
      <div>
        <p></p>
        {inputErrors.map((err) => (
          <div key={err} className="alert alert-danger fade show text-center">
            {err}
          </div>
        ))}
      </div>
    </Form>
  );
};

export default VendSignUpForm;
