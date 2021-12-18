import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

  //   create button comp

  // dont create btn comp
  // in update page:
  // useeffect pre pops data with current_user.menus.id

  return (
    <section>
      <h3>My Menu</h3>
      <div>this is VendMenuList</div>
      <label>search here </label>
      <input
        type="text"
        id="searchBar"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>SEARCH</button>

      <div>
        <Link as={Link} to="/NewMenuItem">
          <button>Add New Menu Item</button>
        </Link>
      </div>
      {menuList && menuList.length > 0 ? (
        menuList.map((food) => (
          <div
            key={food.id}
            style={{
              border: "1px solid #1a202c",
              padding: "8px",
              minWidth: "32px",
              maxWidth: "512px",
              background: "transparent",
              transition: "all 0.1s ease-in",
              textAlign: "center",
            }}
          >
            <div>
              <h2>{food.foodName}</h2>
              <p>{food.foodDesc}</p>
              <p>${food.price}</p>
            </div>
            <div>
              <button
                id={food.id}
                foodname={food.foodName}
                fooddesc={food.foodDesc}
                foodprice={food.price}
                onClick={handleEdit}
              >
                Edit
              </button>
              <button id={food.id} onClick={handleDelete}>
                Delete
              </button>
            </div>
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
