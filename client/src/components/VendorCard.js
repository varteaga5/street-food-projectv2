import React from "react";
import BtnAddVend from "../components/BtnAddVend";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const VendorCard = ({
  id,
  img,
  companyName,
  foodType,
  viewMenuHandler,
  currentUser,
  currentVendor,
}) => {
  return (
    <Card
      className={"mx-auto"}
      key={id}
      style={{ width: "18rem", display: "flex" }}
    >
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{companyName}</Card.Title>
        <Card.Text>{foodType}</Card.Text>
        <Button
          id={id}
          onClick={viewMenuHandler}
          getname={companyName}
          variant="danger"
        >
          view menu
        </Button>{" "}
        <BtnAddVend
          currentUser={currentUser}
          currentVendor={currentVendor}
        ></BtnAddVend>
      </Card.Body>
    </Card>
  );
};

export default VendorCard;
