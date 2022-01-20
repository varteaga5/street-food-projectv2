import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ImgUploader = (props) => {
  const [featured_image, setFeatured_image] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setInputErrors([]);
    props.setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", props.firstName);
    formData.append("lastName", props.lastName);
    formData.append("email", props.email);
    formData.append("password", props.password);
    formData.append("password_confirmation", props.passwordConfirmation);
    formData.append("companyName", props.companyName);
    formData.append("type", "Vendor");
    formData.append("foodType", props.foodType);
    formData.append("featured_image", featured_image);

    fetch("/vendors", {
      method: "POST",
      body: formData,
    }).then((r) => {
      props.setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => props.onLogin(user));
      } else {
        r.json().then((err) => props.setInputErrors(err.errors));
      }
    });
  };

  // in the onchange
  // use a toggle
  // set the toggle to true
  // if the toggle is not true
  // the submit button blurred out

  return (
    <>
      <div>
        <Form.Group className="mb-3" controlId="formBasicFile">
          <Form.Label className="text-warning">profile picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/.jpg, .jpeg, .png, .gif"
            multiple={false}
            onChange={(e) => setFeatured_image(e.target.files[0])}
          />
        </Form.Group>
        {featured_image === null ? (
          <>
            <div className="alert alert-warning fade show text-center">
              please upload an image!
            </div>
          </>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="warning"
            className="text-light"
          >
            sign up
          </Button>
        )}
      </div>
    </>
  );
};

export default ImgUploader;
