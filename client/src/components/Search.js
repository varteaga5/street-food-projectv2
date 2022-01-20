import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";


const Search = ({setVendors}) => {
const [search, setSearch] = useState("")

const clickHandler = (e) => {
    e.preventDefault();
    console.log("this is e", e)
    fetch("/search/" + search.replace(/^\w/, (c) => c.toUpperCase()), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setVendors(data));
}

  return (
    <Row className="">
      <Col>  
      <Form onSubmit={clickHandler}>
        <InputGroup className="mb-2 fixed-bottom" >
          <FormControl
            type="text"
            id="searcBar"
            placeholder="find your favorite foods"
            aria-label="search"
            aria-describedby="basic-addon2"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button type="submit" variant="success" id="button-addon2" >
            search
          </Button>
        </InputGroup>
        </Form >
      </Col>
    </Row>
  );
};

export default Search;
