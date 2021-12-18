import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditMenuItem = ({
  vendorFoodId,
  currentFoodName,
  currentDesc,
  currentPrice,
}) => {
  const [foodName, setFoodName] = useState(currentFoodName);
  const [foodDesc, setFoodDesc] = useState(currentDesc);
  const [price, setPrice] = useState(currentPrice);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/menus/" + vendorFoodId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName,
        foodDesc,
        price,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        navigate("/VendMenuList");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <section>
      <div>
        <h2>edit menu item</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="foodName">food name</label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="foodDesc">food description</label>
            <textarea
              id="foodDesc"
              rows="3"
              value={foodDesc}
              onChange={(e) => setFoodDesc(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <button color="primary" type="submit">
              {isLoading ? "Loading..." : "update menu item"}
            </button>{" "}
            <button onClick={() => navigate("/VendMenuList")}>Cancel</button>
          </div>
          <div>
            {errors.map((err) => (
              <div>
                <span>!</span>
                <p key={err}>{err}</p>
              </div>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditMenuItem;
