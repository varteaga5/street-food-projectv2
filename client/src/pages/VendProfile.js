import React from "react";
import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const VendProfile = ({ currentUser }) => {
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [foodType, setFoodType] = useState(currentUser.foodType);
  const [companyName, setCompanyName] = useState(currentUser.companyName);
  const [imgurl, setImgurl] = useState("");

  const [wasClicked, setWasClicked] = useState(false);
  const [subOrEdit, setSubOrEdit] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = (e) => {
    e.preventDefault();
    setSubOrEdit(!subOrEdit);
    setWasClicked(!wasClicked);
    setIsLoading(true);
    fetch("/vendors/" + currentUser.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        companyName,
        foodType,
        imgurl,
      }),
    }).then((r) => {
      if (r.ok) {
        setIsLoading(false);
        setWasClicked(!wasClicked);
      } else {
        r.json().then((err) => setInputErrors(err.errors));
      }
    });
  };

  const handleCancel = () => {
    setWasClicked(!wasClicked);
    setSubOrEdit(!subOrEdit);
  };

  const fileSelectHandler = (e) => {
    setImgurl(e.target.files[0]);
  };

  return (
    <div>
      <h3>
        <Badge pill bg="warning">
          my profile
        </Badge>
      </h3>
      {wasClicked ? (
        <Form onSubmit={handleClick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-warning">first name</Form.Label>
            <Form.Control
              type="firstName"
              placeholder="enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-warning">last name</Form.Label>
            <Form.Control
              type="lastName"
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
            <Form.Label className="text-warning">food type</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="what type of food do you serve?"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-warning">company name</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              placeholder="what's your company's name?"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text-warning">profile picture</Form.Label>
            <Form.Control type="file" onChange={fileSelectHandler} />
          </Form.Group>
          <Button type="submit" className="text-light">
            {isLoading ? "loading..." : "save changes"}
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
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <Badge>first name:</Badge> {firstName}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge>last name:</Badge> {lastName}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge>email:</Badge> {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge>password:</Badge> *****
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge>company name:</Badge> {companyName}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge>food type:</Badge> {foodType}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge>profile pic:</Badge>
            <img
              src={imgurl}
              variant="top"
              className="img-thumbnail"
              alt="your profile pic"
              style={{ maxWidth: "24rem" }}
            />
          </ListGroup.Item>
        </ListGroup>
      )}
      <hr />
      <Button className="text-light" variant="info" onClick={handleCancel}>
        {subOrEdit ? "cancel" : "edit my info"}
      </Button>
    </div>
  );
};

export default VendProfile;