import React from "react";
import { Link } from "react-router-dom";

const BtnViewMenu = ({ currentVendor, getMenuInfo, getVendorName }) => { 

  const clickHandler = (e) => {
    fetch("/menus/" + currentVendor.id).then((r) => {
      if (r.ok) {
        r.json().then((menu) => getMenuInfo(menu));
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
