import React, { useState } from "react";

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

  const handleCancel = () => {
    setWasClicked(!wasClicked);
    setSubOrEdit(!subOrEdit);
  };
  return (
    <div>
      This is CustProfile
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
        </>
      ) : (
        <>
          <div>{firstName}</div>
          <div>{lastName}</div>
          <div>{email}</div>
          <div>password*****</div>
          <div>{favFood}</div>
        </>
      )}
      <hr />
      <button onClick={handleCancel}>{subOrEdit ? "Cancel" : "Edit"}</button>
    </div>
  );
};

export default CustProfile;
