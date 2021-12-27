import React, { useState } from "react";
// used to go to home page on login
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CustLoginForm = ({ onLogin }) => {
  // formfield was formerly a div
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/customerlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
    navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="text-danger">email</Form.Label>
        <Form.Control type="email" placeholder="enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-danger">password</Form.Label>
        <Form.Control type="password" placeholder="password" />
      </Form.Group>
      <Button variant="danger" type="submit">
        {isLoading ? "loading..." : "login"}
      </Button>
      <div>
        {errors.map((err) => (
          <div key={err}>
            <span>!</span>
            <p>{err}</p>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default CustLoginForm;

// <form onSubmit={handleSubmit}>
//   <div>
//     <label htmlFor="email">email</label>
//     <input
//       type="text"
//       id="username"
//       autoComplete="off"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor="password">password</label>
//     <input
//       type="password"
//       id="password"
//       autoComplete="current-password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />
//   </div>
//   <div>
//     <button variant="fill" color="primary" type="submit">
//       {isLoading ? "Loading..." : "Login"}
//     </button>
//   </div>
//   <div>
//     {errors.map((err) => (
//       <div key={err}>
//         <span>!</span>
//         <p>{err}</p>
//       </div>
//     ))}
//   </div>
// </form>

// css for err div
// const Wrapper = styled.div`
//   color: white;
//   background-color: red;
//   border-radius: 6px;
//   display: flex;
//   padding: 8px;
//   align-items: center;
//   gap: 8px;
//   margin: 8px 0;
// `;

// const Alert = styled.span`
//   background-color: white;
//   height: 30px;
//   width: 30px;
//   border-radius: 50%;
//   font-weight: bold;
//   display: grid;
//   place-content: center;
// `;

// const Message = styled.p`
//   margin: 0;
// `;
