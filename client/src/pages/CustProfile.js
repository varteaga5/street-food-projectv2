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
                // className="text-warning"
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

{
  /* <>
<form onSubmit={handleClick}>
  <div>
    <label>firstName</label>
    <input
      type="text"
      id="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
    />
  </div>
  <div>
    <label>lastName</label>
    <input
      type="text"
      id="lastName"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    />
  </div>
  <div>
    <label>email</label>
    <input
      type="text"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div>
    <label>password</label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <div>
    <label>Favorite Food</label>
    <input
      type="text"
      id="favFood"
      value={favFood}
      onChange={(e) => setFavFood(e.target.value)}
    />
  </div>
  <div>
    <button onClick={handleClick}>
      {subOrEdit ? "Submit" : "Edit"}
    </button>
    {errors.map((err) => (
      <div key={err}>{err}</div>
    ))}
  </div>
</form>
</> */
}

{
  /* <>
<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">first name</InputGroup.Text>
  <FormControl
    placeholder="firstName"
    aria-label="firstName"
    aria-describedby="basic-addon1"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">last name</InputGroup.Text>
  <FormControl
    placeholder="lastName"
    aria-label="lastName"
    aria-describedby="basic-addon1"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">email</InputGroup.Text>
  <FormControl
    placeholder="email"
    aria-label="email"
    aria-describedby="basic-addon1"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">password</InputGroup.Text>
  <FormControl
    placeholder="password"
    aria-label="password"
    aria-describedby="basic-addon1"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">company name</InputGroup.Text>
  <FormControl
    aria-label="favfood"
    aria-describedby="basic-addon1"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
/>
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">food type</InputGroup.Text>
  <FormControl
    aria-label="foodType"
    aria-describedby="basic-addon1"
    value={foodType}
    onChange={(e) => setFoodType(e.target.value)}
/>
</InputGroup>

<Button type="submit" onSubmit={handleClick}>
  {subOrEdit ? "submit" : "edit"}
</Button>
{errors.map((err) => (
  <div key={err}>{err}</div>
))}
</>
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

</ListGroup>
)}
<hr />
<Button variant="info" onClick={handleCancel}>
{subOrEdit ? "cancel" : "edit my info"}
</Button>
</div> */
}

{
  /* <>
<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">first name</InputGroup.Text>
  <FormControl
    placeholder="firstName"
    aria-label="firstName"
    aria-describedby="basic-addon1"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">last name</InputGroup.Text>
  <FormControl
    placeholder="lastName"
    aria-label="lastName"
    aria-describedby="basic-addon1"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">email</InputGroup.Text>
  <FormControl
    placeholder="email"
    aria-label="email"
    aria-describedby="basic-addon1"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">password</InputGroup.Text>
  <FormControl
    placeholder="password"
    aria-label="password"
    aria-describedby="basic-addon1"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</InputGroup>

<InputGroup className="mb-3">
  <InputGroup.Text id="basic-addon1">favorite food</InputGroup.Text>
  <FormControl
    placeholder="favfood"
    aria-label="favfood"
    aria-describedby="basic-addon1"
    value={favFood}
    onChange={(e) => setFavFood(e.target.value)}
  />
</InputGroup>
<Button type="submit" onSubmit={handleClick}>
  {subOrEdit ? "save changes" : "Edit"}
</Button>
{errors.map((err) => (
  <div key={err}>{err}</div>
))}
</> */
}
