import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const Search = ({ Psearch, PsetSearch, setVendors }) => {
  const [search, setSearch] = useState("");

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

  return (
    <div>
      <InputGroup
        className="mb-3"
        type="text"
        id="searchBar"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <FormControl
          placeholder="find great food..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={handleSearch}
          variant="outline-success"
          id="button-addon2"
        >
          search
        </Button>
      </InputGroup>
      <p></p>
    </div>
  );
};

export default Search;
