import { useEffect, useState } from "react";
import BtnAddVend from "../components/BtnAddVend";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const VendorList = ({ currentUser, getMenuInfo, getVendorName }) => {
  const [vendors, setVendors] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getVendors = async () => {
      const res = await fetch("/vendorlist");
      const data = await res.json();
      setVendors(data);
    };
    getVendors();
  }, []);

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
    fetch("/menus/" + e.target.id)
      .then((r) => r.json())
      .then((menu) => getMenuInfo(menu));

    getVendorName(e.target.getAttribute("getname"));
    navigate("/ViewMenu");
  };

  const fetchVendors = async () => {
    const res = await fetch("/vendorlist/" + page);
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const vendorsFromServer = await fetchVendors();
    setVendors([...vendors, ...vendorsFromServer]);
    if (vendorsFromServer.length === 0 || vendorsFromServer.length < 8) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <section>
      <h3>Vendors near you</h3>
      <label>search here </label>
      <input
        type="text"
        id="searchBar"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>

      <InfiniteScroll
        dataLength={vendors.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {vendors && vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div
              key={vendor.id}
              style={{
                border: "1px solid #1a202c",
                padding: "8px",
                minWidth: "32px",
                maxWidth: "512px",
                background: "transparent",
                transition: "all 0.1s ease-in",
              }}
            >
              <div>
                <h2>{vendor.companyName}</h2>
                <p>{vendor.foodType}</p>
                <p>vendor.id: {vendor.id}</p>

                <button
                  id={vendor.id}
                  onClick={viewMenuHandler}
                  getname={vendor.companyName}
                >
                  view menu
                </button>
                <BtnAddVend
                  currentUser={currentUser}
                  currentVendor={vendor}
                ></BtnAddVend>
              </div>
            </div>
          ))
        ) : (
          <>
            <h2>No vendors Found</h2>
          </>
        )}
      </InfiniteScroll>
    </section>
  );
};

export default VendorList;
