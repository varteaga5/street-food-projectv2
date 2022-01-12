import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const CustProfile = ({ currentUser }) => {
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [favFood, setFavFood] = useState(currentUser.favFood);
  const [wasClicked, setWasClicked] = useState(false);
  const [subOrEdit, setSubOrEdit] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setSubOrEdit(!subOrEdit);
    setWasClicked(!wasClicked);
    fetch("/customers/" + "id", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        favFood,
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

  return (
    <div>
      <h3>
        <Badge pill bg="danger">
          my profile
        </Badge>
      </h3>
      {wasClicked ? (
        <Form onSubmit={handleClick}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <InputGroup.Text className="text-danger" id="basic-addon1">
              first name:{"  "}
              <Form.Control
                type="firstName"
                placeholder="enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </InputGroup.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <InputGroup.Text className="text-danger" id="basic-addon1">
              last name:{"  "}
              <Form.Control
                type="lastName"
                placeholder="enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputGroup.Text>
          </Form.Group>{" "}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <InputGroup.Text className="text-danger" id="basic-addon1">
              email:{"  "}
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <InputGroup.Text className="text-danger" id="basic-addon1">
              password:{"  "}
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <InputGroup.Text className="text-danger" id="basic-addon1">
              favorite food:{"  "}
              <Form.Control
                type="text"
                autoComplete="off"
                placeholder="what is your favorite food?"
                value={favFood}
                onChange={(e) => setFavFood(e.target.value)}
              />
            </InputGroup.Text>
          </Form.Group>
          <Button type="submit" variant="success" className="text-light">
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
            <Badge bg="danger">first name:</Badge> {firstName}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg="danger">last name:</Badge> {lastName}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg="danger">email:</Badge> {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg="danger">password:</Badge> *****
          </ListGroup.Item>
          <ListGroup.Item>
            <Badge bg="danger">favorite food:</Badge> {favFood}
          </ListGroup.Item>
        </ListGroup>
      )}
      <hr />
      <Button className="text-light" variant="secondary" onClick={handleCancel}>
        {subOrEdit ? "cancel" : "edit my info"}
      </Button>
    </div>
  );
};

export default CustProfile;
