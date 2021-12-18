import React from "react";
import { useNavigate } from "react-router-dom";

const ViewMenu = ({ menuInfo, vendorName }) => {
  console.log("this is menuInfo: ", menuInfo);
  const navigate = useNavigate();

  // clicks view menu, this will mirror btnaddvend
  // send fetch to retrieve menu items
  // when creating item use current vendor

  return (
    <section>
      <h3>{vendorName}'s menu</h3>
      <div>this is ViewMenu</div>
      {menuInfo && menuInfo.length > 0 ? (
        menuInfo.map((food) => (
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
          </div>
        ))
      ) : (
        <>
          <h2>no menu items found</h2>
          <button onClick={() => navigate("/")}>browse vendors</button>
        </>
      )}
    </section>
  );
};

export default ViewMenu;
