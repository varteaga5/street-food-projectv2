import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const VendMenuList = ({
  currentUser,
  getFoodId,
  getCurrentFoodName,
  getCurrentDesc,
  getCurrentPrice,
}) => {
  const [menuList, setMenuList] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/menus/" + currentUser.id)
      .then((r) => r.json())
      .then((menu) => setMenuList(menu));
  }, []);

  function handleDelete(menuItem) {
    fetch("/menus/" + menuItem.target.id, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(setMenuList);
  }

  const handleSearch = (e) => {
    // get to handle request
    fetch("/vendorQuery/" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setMenuList(data));
  };

  const handleEdit = (e) => {
    console.log("this is e.target.id ", e.target.id);
    getFoodId(e.target.id);
    getCurrentFoodName(e.target.getAttribute("foodname"));
    getCurrentDesc(e.target.getAttribute("fooddesc"));
    getCurrentPrice(e.target.getAttribute("foodprice"));
    navigate("/EditMenuItem");
  };

  return (
    <section>
      <h3>My Menu</h3>
      <div>this is VendMenuList</div>
      <Search />

      <div>
        <Link as={Link} to="/NewMenuItem">
          <Button>add new menu item</Button>
        </Link>
      </div>
      {menuList && menuList.length > 0 ? (
        menuList.map((food) => (
          <div key={food.id}>
            <Card className={"mx-auto"} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  <h3>{food.foodName}</h3>
                </Card.Title>
                <Card.Text>{food.foodDesc}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">
                  ${food.price}
                </Card.Subtitle>
              </Card.Body>
              <div>
                <Button
                  id={food.id}
                  foodname={food.foodName}
                  fooddesc={food.foodDesc}
                  foodprice={food.price}
                  onClick={handleEdit}
                >
                  edit
                </Button>{" "}
                <Button id={food.id} variant="danger" onClick={handleDelete}>
                  delete
                </Button>
              </div>
            </Card>
            <p></p>
          </div>
        ))
      ) : (
        <>
          <h2>no menu items found</h2>
        </>
      )}
    </section>
  );
};

export default VendMenuList;

// {menuList && menuList.length > 0 ? (
//   menuList.map((food) => (
//     <>
//     <Card
//       key={food.id}
//       style={{
//         width: "18rem"
//       }}
//     >
//       <div>
//         <h2>{food.foodName}</h2>
//         <p>{food.foodDesc}</p>
//         <p>${food.price}</p>
//       </div>
//       <div>
//         <button
//           id={food.id}
//           foodname={food.foodName}
//           fooddesc={food.foodDesc}
//           foodprice={food.price}
//           onClick={handleEdit}
//         >
//           Edit
//         </button>
//         <button id={food.id} onClick={handleDelete}>
//           Delete
//         </button>
//       </div>
//     </Card>
//     </>
//   ))
// ) : (
//   <>
//     <h2>no menu items found</h2>
//   </>
// )}
