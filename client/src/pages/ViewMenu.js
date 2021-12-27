import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ViewMenu = ({ menuInfo, vendorName }) => {
  console.log("this is menuInfo: ", menuInfo);
  const navigate = useNavigate();

  // clicks view menu, this will mirror btnaddvend
  // send fetch to retrieve menu items
  // when creating item use current vendor

  //   style={{
  //     border: "1px solid #1a202c",
  //     padding: "8px",
  //     minWidth: "32px",
  //     maxWidth: "512px",
  //     background: "transparent",
  //     transition: "all 0.1s ease-in",
  //     textAlign: "center",
  //   }}

  //   <div
  //   key={food.id}
  // >
  //   <div>
  //     <h2>{food.foodName}</h2>
  //     <p>{food.foodDesc}</p>
  //     <p>${food.price}</p>
  //   </div>
  // </div>

  return (
    <section>
      <h3>{vendorName}'s menu</h3>
      <div>
        <Button variant="warning" onClick={() => navigate(-1)}>
          go back
        </Button>
      </div>
      {menuInfo && menuInfo.length > 0 ? (
        menuInfo.map((food) => (
          <div key={food.id}>
            <Card
              className={"mx-auto"}
              key={food.id}
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Title>
                  <h3>{food.foodName}</h3>
                </Card.Title>
                <Card.Text>{food.foodDesc}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  ${food.price}
                </Card.Subtitle>
              </Card.Body>
            </Card>
            <p></p>
          </div>
        ))
      ) : (
        <>
          <h2>no menu items found</h2>
          <Button variant="danger" onClick={() => navigate("/")}>
            browse vendors
          </Button>
        </>
      )}
    </section>
  );
};

export default ViewMenu;
