import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ViewMenu = ({ menuInfo, vendorName }) => {
  console.log("this is menuInfo: ", menuInfo);
  const navigate = useNavigate();


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
