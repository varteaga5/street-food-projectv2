import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Badge from "react-bootstrap/Badge";
import VendorCard from "../components/VendorCard";

const VendorList = ({ currentUser, getMenuInfo, getVendorName }) => {
  const [vendors, setVendors] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const getVendors = async () => {
      const res = await fetch("/vendorlist");
      const data = await res.json();

      setVendors(data);
    };
    getVendors();
  }, []);

  const viewMenuHandler = (e) => {
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
      <h3>
        <Badge pill bg="warning">
          browse vendors near you
        </Badge>
      </h3>
      <InfiniteScroll
        dataLength={vendors.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b></b>
          </p>
        }
      >
        {vendors && vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div id={vendor.id}>
              <VendorCard
                id={vendor.id}
                img={vendor.imgurl}
                companyName={vendor.companyName}
                foodType={vendor.foodType}
                viewMenuHandler={viewMenuHandler}
                currentUser={currentUser}
                currentVendor={vendor}
              />
              <p></p>
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
