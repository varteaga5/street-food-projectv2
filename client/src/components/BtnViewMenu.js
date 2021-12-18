import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const BtnViewMenu = ({ currentVendor, getMenuInfo, getVendorName }) => {
  console.log("this is currentVendor", currentVendor);
  // console.log("this is getMenuInfo", getMenuInfo);
  // console.log("this is getVendorName", getVendorName);

  // currentUser={currentUser}
  // currentVendor={vendor}
  // getMenuInfo={getMenuInfo}
  // getVendorName={getVendorName}

  // pass setstate function from app to vendlist to btnviewmenu,
  // use fetch to GET menu of vendor
  // pass response to setstate function
  // pass state as props to ViewMenu
  const [errors, setErrors] = useState([]);

  // console.log("this is currentVendor.id: ", currentVendor.id);

  const clickHandler = (e) => {
    fetch("/menus/" + currentVendor.id).then((r) => {
      if (r.ok) {
        r.json().then((menu) => getMenuInfo(menu));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    getVendorName(currentVendor.companyName);
  };
  return (
    <Link as={Link} to={"/ViewMenu"}>
      <button onClick={clickHandler}>view menu</button>
    </Link>
  );
};

export default BtnViewMenu;
