import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const BtnAddVend = ({ currentVendor, currentUser }) => {
  const [addedVend, setAddedVend] = useState(false);

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
        imgurl: currentVendor.imgurl,
      }),
    }).then((r) => setAddedVend((prevState) => !prevState));
  };
  return (
    <Button variant="danger" onClick={clickHandler}>
      {addedVend ? "added" : "add to favorites"}
    </Button>
  );
};

export default BtnAddVend;
