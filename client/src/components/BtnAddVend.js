import React from "react";
import { useState } from "react";

const BtnAddVend = ({ currentVendor, currentUser }) => {
  const [addedVend, setAddedVend] = useState(false);
  console.log("this is currentVendor.id", currentVendor.id);

  const clickHandler = (e) => {
    fetch("/fav_vendors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: currentVendor.firstName,
        lastName: currentVendor.lastName,
        email: currentVendor.email,
        foodType: currentVendor.foodType,
        companyName: currentVendor.companyName,
        user_id: currentUser.id,
      }),
    }).then((r) => setAddedVend((prevState) => !prevState));
  };
  return (
    <button onClick={clickHandler}>
      {addedVend ? "added" : "add to favorites"}
    </button>
  );
};

export default BtnAddVend;
