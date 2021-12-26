import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
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
  const [errors, setErrors] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setSubOrEdit(!subOrEdit);
    setWasClicked(!wasClicked);
    // fetch("/customer/" + "id", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     favFood,
    //   }),
    // }).then((r) => {
    //   if (r.ok) {
    //     setWasClicked(!wasClicked);
    //   } else {
    //     r.json().then((err) => setErrors(err.errors));
    //   }
    // });
  };

  //   <>
  //   <div>{firstName}</div>
  //   <div>{lastName}</div>
  //   <div>{email}</div>
  //   <div>password*****</div>
  //   <div>{favFood}</div>
  // </>

  const handleCancel = () => {
    setWasClicked(!wasClicked);
    setSubOrEdit(!subOrEdit);
  };

  return (
    <div>
      <h3>
        <Badge pill bg="warning">
          my profile
        </Badge>
      </h3>
      {wasClicked ? (
        <>
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
            {subOrEdit ? "Submit" : "Edit"}
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
            <Badge>favorite food:</Badge> {favFood}
          </ListGroup.Item>
        </ListGroup>
      )}
      <hr />
      <Button variant="info" onClick={handleCancel}>
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
