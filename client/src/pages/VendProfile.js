import React from "react";
import { useState } from "react";

const VendProfile = ({ currentUser }) => {
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);
  const [foodType, setFoodType] = useState(currentUser.foodType);
  const [companyName, setCompanyName] = useState(currentUser.companyName);
  const [wasClicked, setWasClicked] = useState(false);
  const [subOrEdit, setSubOrEdit] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    setSubOrEdit(!subOrEdit);
    setWasClicked(!wasClicked);
    fetch("/updatevendor/" + currentUser.id, {
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
      }),
    }).then((r) => {
      if (r.ok) {
        setWasClicked(!wasClicked);
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  const handleCancel = () => {
    setWasClicked(!wasClicked);
    setSubOrEdit(!subOrEdit);
  };
  return (
    <div>
      <h2>My Profile</h2>
      {wasClicked ? (
        <>
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
              <label>Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label>Food Type</label>
              <input
                type="text"
                id="foodType"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
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
        </>
      ) : (
        <>
          <div>first name: {firstName}</div>
          <div>last name: {lastName}</div>
          <div>email: {email}</div>
          <div>password: *****</div>
          <div>company name: {companyName}</div>
          <div>food type: {foodType}</div>
        </>
      )}
      <hr />
      <button onClick={handleCancel}>
        {subOrEdit ? "Cancel" : "Edit Profile"}
      </button>
    </div>
  );
};

export default VendProfile;
