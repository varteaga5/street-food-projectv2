import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Search from "../components/Search";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const FavList = ({ getMenuInfo, getVendorName }) => {
  const [vendors, setVendors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/fav_vendors")
      .then((r) => r.json())
      .then((data) => setVendors(data));
  }, []);

  function handleDelete(deleteVendor) {
    fetch("/fav_vendors/" + deleteVendor.target.id, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(setVendors);
  }

  const viewMenuHandler = (e) => {
    console.log("this is e.target.id ", e.target.id);
    let vendorName = e.target.getAttribute("getname");

    fetch("/favmenus/" + vendorName)
      .then((r) => r.json())
      .then((menu) => {
        console.log("this is menu ", menu);
        getMenuInfo(menu);
      });

    getVendorName(vendorName);
    navigate("/ViewMenu");
  };

  return (
    <section>
      <h3>
        <Badge bg="warning">My Favorite Vendors</Badge>
      </h3>
      <Search setVendors={setVendors} />
      {vendors && vendors.length > 0 ? (
        vendors.map((vendor) => (
          <Card
            className={"mx-auto"}
            key={vendor.id}
            style={{ width: "18rem", display: "flex" }}
          >
            <Card.Img variant="top" src={vendor.imgurl} />
            <Card.Body>
              <Card.Title>{vendor.companyName}</Card.Title>
              <Card.Text>{vendor.foodType}</Card.Text>
              <Button
                id={vendor.id}
                onClick={viewMenuHandler}
                getname={vendor.companyName}
                variant="danger"
              >
                view menu
              </Button>{" "}
              <Button id={vendor.id} onClick={handleDelete} variant="danger">
                remove from list
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <>
          <h2>No vendors Found</h2>
          <Button variant="warning" onClick={() => navigate("/")}>
            Browse Vendors
          </Button>
        </>
      )}
    </section>
  );
};
export default FavList;

//   <article key={vendor.id}>
//   <div>
//     <h2>{vendor.companyName}</h2>
//     <p>{vendor.foodType}</p>
//     <button
//       id={vendor.companyName}
//       onClick={viewMenuHandler}
//       getname={vendor.companyName}
//     >
//       view menu
//     </button>
//     <button id={vendor.id} onClick={handleDelete}>
//       remove from list
//     </button>
//   </div>
// </article>

//   <>
//   <VendorCard
//     id={vendor.id}
//     img={vendor.imgurl}
//     companyName={vendor.companyName}
//     foodType={vendor.foodType}
//     viewMenuHandler={viewMenuHandler}
//     currentUser={currentUser}
//     currentVendor={vendor}
//   />
//   <p></p>
// </>
