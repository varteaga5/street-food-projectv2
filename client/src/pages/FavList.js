import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavList = ({ getMenuInfo, getVendorName }) => {
  const [vendors, setVendors] = useState("");
  const [search, setSearch] = useState("");
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

  const handleSearch = (e) => {
    // get to handle request
    fetch("/vendorQuery/" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setVendors(data));
  };

  const viewMenuHandler = (e) => {
    console.log("this is e.target.id ", e.target.id);
    fetch("/favmenus/" + e.target.id)
      .then((r) => r.json())
      .then((menu) => getMenuInfo(menu));

    getVendorName(e.target.getAttribute("getname"));
    navigate("/ViewMenu");
  };

  return (
    <section>
      <h3>My Favorite Vendors</h3>
      <label>search here</label>
      <input
        type="text"
        id="searchBar"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>
      {vendors && vendors.length > 0 ? (
        vendors.map(
          (vendor) => (
            console.log("this is vendor", vendor),
            (
              <article key={vendor.id}>
                <div>
                  <h2>{vendor.companyName}</h2>
                  <p>{vendor.foodType}</p>
                  <button
                    id={vendor.companyName}
                    onClick={viewMenuHandler}
                    getname={vendor.companyName}
                  >
                    view menu
                  </button>
                  <button id={vendor.id} onClick={handleDelete}>
                    remove from list
                  </button>
                </div>
              </article>
            )
          )
        )
      ) : (
        <>
          <h2>No vendors Found</h2>
          <button onClick={() => navigate("/")}>Browse Vendors</button>
        </>
      )}
    </section>
  );
};
export default FavList;
